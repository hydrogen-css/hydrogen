// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../../../data/css-property-data').ParsedQuery} ParsedQuery
 * @typedef {import('../../../../../../data/css-property-data').ParsedModifiers} ParsedModifiers
 */

// Data imports
const { get_interaction_state_data } = require('../../../../../../data/interaction-state-data');

// Local functions
const { parse_options } = require('../02-parse-query-options');

// Helper functions
const { log_message } = require('../../../../../console-logging/log-message');

// Vendor imports

// Script ==========================================================================================

/**
 * Takes the media string of a query and parses it for modifiers by breaking it apart at : characters.
 *
 * @param {ParsedConfig} settings The user's settings
 * @param {string} property_string The relevant Hydrogen property
 * @param {string} attribute_string The full attribute used in the markup
 * @param {string} query_string The full query containing this prefix
 * @param {string} prefix_string The prefix string passed from the parser
 * @param {string} file The file this attribute was found in
 * @returns {ParsedModifiers} An object containing parsed modifiers
 */
function parse_prefix(
  settings,
  property_string,
  attribute_string,
  query_string,
  prefix_string,
  file
) {
  try {
    // Break the initial input up by ":" characters
    let modifier_array = prefix_string.split(':');
    // Grab the state data
    let state_data = get_interaction_state_data();
    // Create an empty array for tracking individual modifiers
    let parsed_modifier_array = [];
    // Not entirely sure what this is doing or how it works... Original note was that it found ":" characters that didn't exist inside of square brackets, but I can't remember why that was necessary
    for (let i = 0, j = 0; i < modifier_array.length; i++) {
      parsed_modifier_array[j] =
        (parsed_modifier_array[j] ? parsed_modifier_array[j] + ':' : '') + modifier_array[i];
      if (
        parsed_modifier_array[j].indexOf('[') == -1 ||
        parsed_modifier_array[j].indexOf(']') != -1
      ) {
        j++;
      }
    }
    // Create initial values for each modifier class
    let parsed_media = false;
    let parsed_theme = 'default'; // Default to start, replaced if a theme is found
    let parsed_mode = 'default'; // Default to start, replaced if a mode is found
    let parsed_state = false;
    let parsed_selectors = false;
    let parsed_children = false;
    let parsed_child_states = [];
    let parsed_id = false;
    let parsed_class = false;
    // Check to make sure the modifier list wasn't empty
    if (parsed_modifier_array.length > 0) {
      // Loop through the modifiers that were found
      parsed_modifier_array.forEach((modifier) => {
        // Check for matching media queries
        let media_check = false;
        settings.media.queries.forEach((query) => {
          if (query.key === modifier) {
            media_check = true;
            parsed_media = modifier;
          }
        });
        // The modifier wasn't a media value, so check for modes
        if (media_check === false) {
          let mode_check = false;
          if (modifier === 'dark') {
            mode_check = true;
            parsed_mode = modifier;
          }
          if (modifier === 'all') {
            mode_check = true;
            parsed_mode = modifier;
          }
          // The modifier wasn't a mode value, so check for states
          if (mode_check === false) {
            let state_check = false;
            state_data.forEach(function (state) {
              if (state === modifier) {
                state_check = true;
                parsed_state = modifier;
              }
            });
            // The modifier wasn't a state value, so check for themes
            if (state_check === false) {
              let theme_check = false;
              Object.keys(settings.themes).forEach(function (theme_key) {
                if (theme_key === modifier) {
                  theme_check = true;
                  parsed_theme = modifier;
                }
              });
              // The modifier wasn't a theme value, so check for selectors or children
              if (theme_check === false) {
                // Check for the selector modifier
                if (modifier.startsWith('selectors[') === true) {
                  // Strip the selectors[ and final ]
                  let selectors = modifier.slice(0, -1);
                  selectors = selectors.substring(10);
                  // Parse the list for values
                  parsed_selectors = parse_options(
                    settings,
                    attribute_string,
                    query_string,
                    file,
                    selectors,
                    ','
                  );
                } else if (modifier.startsWith('children[') === true) {
                  // Check to see if the property is flex-grid first, because the children modifier isn't available on that property
                  if (property_string === 'flex-grid') {
                    log_message({
                      type: 'warning',
                      settings: settings,
                      message:
                        "The flex-grid property doesn't support the use of the :children[] modifier, so this modifier has been ignored.",
                      step: 'Parsing query children modifiers',
                      attribute: attribute_string,
                      query: query_string,
                      files: [file],
                    });
                  } else {
                    // Strip the children[ and final ]
                    let children = modifier.slice(0, -1);
                    children = children.substring(9);
                    // Parse the list for values
                    let child_array = parse_options(
                      settings,
                      attribute_string,
                      query_string,
                      file,
                      children,
                      ','
                    );
                    // 2.0.2: Parse nested elements for the hover interaction state - this is required for hover only because hover uses the (hover:hover) media query in the media object for proper implementation.
                    let state_query = new RegExp('hover(?!-)', 'g');
                    if (children.match(state_query)) {
                      parsed_child_states = parsed_child_states.concat('hover');
                    }
                    // 2.0.4: Children that include pseudo elements are broken if the nested :not() statement is included, so we have to see if pseudo strings exist in the children options and pass that to the selector assembly.
                    let pseudo_list = [
                      ':first-line',
                      ':first-letter',
                      ':before',
                      ':after',
                      ':marker',
                      ':selection',
                    ];
                    if (child_array.length > 0) {
                      parsed_children = [];
                      child_array.forEach((child) => {
                        let pseudo_state = false;
                        pseudo_list.forEach((pseudo) => {
                          if (child.includes(pseudo)) {
                            pseudo_state = true;
                          }
                        });
                        if (pseudo_state == true) {
                          parsed_children = parsed_children.concat({
                            child: child,
                            pseudo: true,
                          });
                        } else {
                          parsed_children = parsed_children.concat({
                            child: child,
                            pseudo: false,
                          });
                        }
                      });
                    }
                  }
                } else if (modifier.startsWith('id[') === true) {
                  // Log deprecation warning
                  log_message({
                    type: 'warning',
                    settings: settings,
                    message:
                      'The :id[] and class modifiers have been deprecated in favor of the more flexible :selectors[] modifier. Please migrate when possible.',
                    step: 'Parsing query ID modifiers',
                    attribute: attribute_string,
                    query: query_string,
                    files: [file],
                  });
                  // The user is trying to target an element that contains both this Hydrogen attribute AND a specific ID
                  let ids = modifier.match(/\[([^\]]*)/);
                  // Check to see if the ID group was empty, and if it was, throw an error, otherwise, pass the parsed IDs
                  if (ids[1].trim() === '') {
                    log_message({
                      type: 'warning',
                      settings: settings,
                      message:
                        'This query is using an empty :id[] modifier, so this modifier has been ignored.',
                      step: 'Parsing query ID modifiers',
                      attribute: attribute_string,
                      query: query_string,
                      files: [file],
                    });
                  } else {
                    parsed_id = [];
                    // Split the ID array by commas
                    let id_array = ids[1].split(',');
                    // Assemble the ID selector
                    id_array.forEach(function (item) {
                      parsed_id.push(item.trim());
                    });
                  }
                } else if (modifier.startsWith('class[') === true) {
                  // Log deprecation warning
                  log_message({
                    type: 'warning',
                    settings: settings,
                    message:
                      'The :id[] and class modifiers have been deprecated in favor of the more flexible :selectors[] modifier. Please migrate when possible.',
                    step: 'Parsing query class modifiers',
                    attribute: attribute_string,
                    query: query_string,
                    files: [file],
                  });
                  // The user is trying to target an element that contains both this Hydrogen attribute AND a specific class
                  let classes = modifier.match(/\[([^\]]*)/);
                  // Check to see if the class group was empty, and if it was, throw an error, otherwise, pass the parsed classes
                  if (classes[1].trim() === '') {
                    log_message({
                      type: 'warning',
                      settings: settings,
                      message:
                        'This query is using an empty :class[] modifier, so this modifier has been ignored.',
                      step: 'Parsing query class modifiers',
                      attribute: attribute_string,
                      query: query_string,
                      files: [file],
                    });
                  } else {
                    parsed_class = [];
                    // Split the class array by commas
                    let class_array = classes[1].split(',');
                    // Assemble the class selector
                    class_array.forEach(function (item) {
                      parsed_class.push(item.trim());
                    });
                  }
                }
              }
            }
          }
        }
      });
      // Return the parsed modifier object
      /** @type {ParsedModifiers} */
      let modifiers = {
        media: parsed_media,
        theme: parsed_theme,
        mode: parsed_mode,
        state: parsed_state,
        selectors: parsed_selectors,
        children: parsed_children,
        child_states: parsed_child_states,
        id: parsed_id,
        class: parsed_class,
      };
      if (!modifiers.media) {
        throw new Error('This query is missing a media prefix.');
      } else {
        return modifiers;
      }
    } else {
      throw new Error('This query is missing a prefix. Prefixes require at least a media value.');
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing query prefix',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_prefix,
};
