function settings_test_data() {
  return {
    info: {
      code: 'https://github.com/hydrogen-design-system/hydrogen',
      docs: 'https://beta.hydrogen.design',
      feedback: 'https://forms.office.com/r/vz80dsUabZ',
      roadmap: 'https://github.com/orgs/hydrogen-design-system/projects/1',
      settings: 'https://beta.hydrogen.design/en/docs/setup/configuration/',
    },
    input: {
      raw: ['markup'],
      parsed: {
        array: ['/home/substrae/code/hydrogen/tests/test-defaults/markup'],
        string: '/home/substrae/code/hydrogen/tests/test-defaults/markup,',
        glob: '/home/substrae/code/hydrogen/tests/test-defaults/markup/**/*,',
      },
    },
    output: {
      raw: 'styles',
      parsed: {
        array: ['/home/substrae/code/hydrogen/tests/test-defaults/styles'],
        string: '/home/substrae/code/hydrogen/tests/test-defaults/styles',
        glob: '/home/substrae/code/hydrogen/tests/test-defaults/styles/**/*',
      },
    },
    modes: {
      dark: {
        automatic: true,
        method: 'toggle',
      },
    },
    processing: {
      include_reset_css: true,
      browser_prefix_css: true,
      minify_css: true,
      export_variable_file: true,
    },
    logging: {
      generate_logs: true,
      show_timers: true,
      verbose_console_output: true,
      errors: {
        count: 0,
      },
      warnings: {
        count: 0,
      },
      time: '2022-11-16-14h-36m-34s',
      directory:
        '/home/substrae/code/hydrogen/tests/test-defaults/styles/hydrogen-logs/2022-11-16-14h-36m-34s',
      clean: false,
    },
    media: {
      base_key: 'base',
      queries: [
        {
          key: 'base',
          query: 'base',
        },
        {
          key: 'print',
          query: 'print',
        },
        {
          key: 'p-tablet',
          query: 'screen and (min-width: 48em)',
        },
        {
          key: 'l-tablet',
          query: 'screen and (min-width: 73em)',
        },
        {
          key: 'laptop',
          query: 'screen and (min-width: 80em)',
        },
        {
          key: 'desktop',
          query: 'screen and (min-width: 100em)',
        },
      ],
    },
    themes: {
      default: {
        key: 'default',
        typography: [
          {
            query_key: 'base',
            size: '100%',
            line_height: '1.4',
            type_scale: '1.25',
            query: 'base',
            caption: {
              size: 'calc((1 / 1.25 ) * 1rem)',
              line_height: 'var(--h2-base-line-height)',
            },
            copy: {
              size: '1rem',
              line_height: 'var(--h2-base-line-height)',
            },
            h6: {
              size: 'calc((1 * 1.25 ) * 1rem)',
              line_height: 1.1199999999999999,
            },
            h5: {
              size: 'calc(var(--h2-font-size-h6) * 1.25 )',
              line_height: 1.7919999999999998,
            },
            h4: {
              size: 'calc(var(--h2-font-size-h5) * 1.25 )',
              line_height: 1.4336,
            },
            h3: {
              size: 'calc(var(--h2-font-size-h4) * 1.25 )',
              line_height: 1.14688,
            },
            h2: {
              size: 'calc(var(--h2-font-size-h3) * 1.25 )',
              line_height: 1.3762559999999997,
            },
            h1: {
              size: 'calc(var(--h2-font-size-h2) * 1.25 )',
              line_height: 1.1010048,
            },
            display: {
              size: 'calc(var(--h2-font-size-h1) * 1.25 )',
              line_height: 1.1744051199999999,
            },
          },
          {
            query_key: 'desktop',
            size: '112.5%',
            line_height: '1.4',
            type_scale: '1.25',
            query: 'screen and (min-width: 100em)',
            caption: {
              size: 'calc((1 / 1.25 ) * 1rem)',
              line_height: 'var(--h2-base-line-height)',
            },
            copy: {
              size: '1rem',
              line_height: 'var(--h2-base-line-height)',
            },
            h6: {
              size: 'calc((1 * 1.25 ) * 1rem)',
              line_height: 1.1199999999999999,
            },
            h5: {
              size: 'calc(var(--h2-font-size-h6) * 1.25 )',
              line_height: 1.7919999999999998,
            },
            h4: {
              size: 'calc(var(--h2-font-size-h5) * 1.25 )',
              line_height: 1.4336,
            },
            h3: {
              size: 'calc(var(--h2-font-size-h4) * 1.25 )',
              line_height: 1.14688,
            },
            h2: {
              size: 'calc(var(--h2-font-size-h3) * 1.25 )',
              line_height: 1.3762559999999997,
            },
            h1: {
              size: 'calc(var(--h2-font-size-h2) * 1.25 )',
              line_height: 1.1010048,
            },
            display: {
              size: 'calc(var(--h2-font-size-h1) * 1.25 )',
              line_height: 1.1744051199999999,
            },
          },
        ],
        colors: [
          {
            key: 'white',
            default: {
              color: 'rgba(255, 255, 255, 1)',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-light',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-lighter',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-lightest',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-dark',
                    value: '191, 191, 191',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-darker',
                    value: '128, 128, 128',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-darkest',
                    value: '64, 64, 64',
                  },
                },
              ],
            },
            dark: {
              color: '#212130',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-light',
                    value: '87, 87, 101',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-lighter',
                    value: '143, 143, 152',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-lightest',
                    value: '199, 199, 204',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-dark',
                    value: '24, 24, 37',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-darker',
                    value: '16, 16, 25',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-darkest',
                    value: '8, 8, 12',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-white',
              value: '33, 33, 48',
            },
          },
          {
            key: 'black',
            default: {
              color: '#212130',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-light',
                    value: '87, 87, 101',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-lighter',
                    value: '143, 143, 152',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-lightest',
                    value: '199, 199, 204',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-dark',
                    value: '24, 24, 37',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-darker',
                    value: '16, 16, 25',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-darkest',
                    value: '8, 8, 12',
                  },
                },
              ],
            },
            dark: {
              color: 'rgba(255, 255, 255, 1)',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-light',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-lighter',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-lightest',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-dark',
                    value: '191, 191, 191',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-darker',
                    value: '128, 128, 128',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-darkest',
                    value: '64, 64, 64',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-black',
              value: '255, 255, 255',
            },
          },
          {
            key: 'primary',
            default: {
              color: '#9D5CFF',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-light',
                    value: '179, 121, 255',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lighter',
                    value: '204, 165, 255',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lightest',
                    value: '230, 210, 255',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-dark',
                    value: '115, 57, 191',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darker',
                    value: '77, 38, 128',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darkest',
                    value: '38, 19, 64',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-primary',
              value: '157, 92, 255',
            },
          },
          {
            key: 'secondary',
            default: {
              color: '#53FFE0',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-secondary-light',
                    value: '113, 255, 240',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-secondary-lighter',
                    value: '160, 255, 245',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-secondary-lightest',
                    value: '208, 255, 250',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-secondary-dark',
                    value: '49, 191, 176',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-secondary-darker',
                    value: '33, 128, 118',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-secondary-darkest',
                    value: '16, 64, 59',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-secondary',
              value: '83, 255, 224',
            },
          },
          {
            key: 'focus',
            default: {
              color: '#fbce3a',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-light',
                    value: '255, 226, 93',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-lighter',
                    value: '255, 236, 147',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-lightest',
                    value: '255, 245, 201',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-dark',
                    value: '191, 162, 29',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-darker',
                    value: '128, 108, 19',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-darkest',
                    value: '64, 54, 10',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-focus',
              value: '251, 206, 58',
            },
          },
          {
            key: 'error',
            default: {
              color: 'red',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-error-light',
                    value: '255, 64, 64',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-error-lighter',
                    value: '255, 128, 128',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-error-lightest',
                    value: '255, 191, 191',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-error-dark',
                    value: '191, 0, 0',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-error-darker',
                    value: '128, 0, 0',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-error-darkest',
                    value: '64, 0, 0',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-error',
              value: '255, 0, 0',
            },
          },
          {
            key: 'warning',
            default: {
              color: 'orange',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-warning-light',
                    value: '255, 193, 64',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-warning-lighter',
                    value: '255, 214, 128',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-warning-lightest',
                    value: '255, 234, 191',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-warning-dark',
                    value: '191, 129, 0',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-warning-darker',
                    value: '128, 86, 0',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-warning-darkest',
                    value: '64, 43, 0',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-warning',
              value: '255, 165, 0',
            },
          },
          {
            key: 'success',
            default: {
              color: 'green',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-success-light',
                    value: '64, 169, 64',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-success-lighter',
                    value: '128, 198, 128',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-success-lightest',
                    value: '191, 226, 191',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-success-dark',
                    value: '0, 106, 0',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-success-darker',
                    value: '0, 70, 0',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-success-darkest',
                    value: '0, 35, 0',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-success',
              value: '0, 128, 0',
            },
          },
          {
            key: 'page',
            default: {
              color: '#f3f3f9',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-light',
                    value: '246, 246, 251',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-lighter',
                    value: '249, 249, 252',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-lightest',
                    value: '252, 252, 254',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-dark',
                    value: '182, 182, 187',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-darker',
                    value: '121, 121, 125',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-darkest',
                    value: '61, 61, 62',
                  },
                },
              ],
            },
            dark: {
              color: '#111117',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-light',
                    value: '76, 76, 82',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-lighter',
                    value: '136, 136, 139',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-lightest',
                    value: '195, 195, 197',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-dark',
                    value: '12, 12, 18',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-darker',
                    value: '8, 8, 12',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-darkest',
                    value: '4, 4, 6',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-page',
              value: '17, 17, 23',
            },
          },
          {
            key: 'tertiary',
            default: {
              color: '#FF5958',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-light',
                    value: '255, 118, 117',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-lighter',
                    value: '255, 164, 163',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-lightest',
                    value: '255, 209, 209',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-dark',
                    value: '191, 54, 54',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-darker',
                    value: '128, 36, 36',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-darkest',
                    value: '64, 18, 18',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-tertiary',
              value: '255, 89, 88',
            },
          },
        ],
        containers: [
          {
            key: 'small',
            default: {
              max_width: '39rem',
            },
          },
          {
            key: 'medium',
            default: {
              max_width: '75rem',
            },
          },
          {
            key: 'large',
            default: {
              max_width: '90rem',
            },
          },
        ],
        fonts: [
          {
            key: 'sans',
            default: {
              family: "'Inter', sans-serif",
            },
          },
          {
            key: 'serif',
            default: {
              family: 'serif',
            },
          },
          {
            key: 'script',
            default: {
              family: 'script',
            },
          },
          {
            key: 'mono',
            default: {
              family: 'monospace',
            },
          },
        ],
        gradients: [
          {
            key: 'divider',
            default: {
              gradient: 'linear-gradient(90deg, #53FFE0, #9D5CFF)',
              fallback: '#53FFE0',
            },
          },
          {
            key: 'primaryRadial',
            default: {
              gradient:
                'radial-gradient(rgba(157,92,255, 1), rgba(42, 44, 61, 1))',
              fallback: 'rgba(157,92,255, 1)',
            },
          },
          {
            key: 'accentRadial',
            default: {
              gradient:
                'radial-gradient(rgba(83, 255, 224, 1), rgba(42, 44, 61, 1))',
              fallback: 'rgba(83, 255, 224, 1)',
            },
          },
        ],
        radii: [
          {
            key: 'rounded',
            default: {
              radius: '10px',
            },
          },
          {
            key: 'pill',
            default: {
              radius: '50rem',
            },
          },
          {
            key: 'circle',
            default: {
              radius: '100%',
            },
          },
        ],
        shadows: [
          {
            key: 'small',
            default: {
              shadow: '0 0.1rem 0.2rem 0 rgba(0, 0, 0, .2)',
            },
          },
          {
            key: 'medium',
            default: {
              shadow: '0 0.25rem 0.5rem -0.05rem rgba(0, 0, 0, .2)',
            },
          },
          {
            key: 'large',
            default: {
              shadow: '0 0.4rem 0.7rem -0.1rem rgba(0, 0, 0, .2)',
            },
          },
          {
            key: 'larger',
            default: {
              shadow: '0 0.55rem 1rem -0.2rem rgba(0, 0, 0, .2)',
            },
          },
          {
            key: 'largest',
            default: {
              shadow: '0 0.7rem 1.5rem -0.3rem rgba(0, 0, 0, .2)',
            },
          },
        ],
        transitions: {
          durations: [],
          functions: [],
          delays: [],
        },
      },
      theme: {
        key: 'theme',
        typography: [
          {
            query_key: 'base',
            size: '120%',
            line_height: '1.5',
            type_scale: '1.33',
            query: 'base',
            caption: {
              size: 'calc((1 / 1.33 ) * 1rem)',
              line_height: 'var(--h2-base-line-height)',
            },
            copy: {
              size: '1rem',
              line_height: 'var(--h2-base-line-height)',
            },
            h6: {
              size: 'calc((1 * 1.33 ) * 1rem)',
              line_height: 1.1278195488721805,
            },
            h5: {
              size: 'calc(var(--h2-font-size-h6) * 1.33 )',
              line_height: 1.6959692464243314,
            },
            h4: {
              size: 'calc(var(--h2-font-size-h5) * 1.33 )',
              line_height: 1.2751648469355876,
            },
            h3: {
              size: 'calc(var(--h2-font-size-h4) * 1.33 )',
              line_height: 1.4381558424085574,
            },
            h2: {
              size: 'calc(var(--h2-font-size-h3) * 1.33 )',
              line_height: 1.081320182262073,
            },
            h1: {
              size: 'calc(var(--h2-font-size-h2) * 1.33 )',
              line_height: 1.0840302579068402,
            },
            display: {
              size: 'calc(var(--h2-font-size-h1) * 1.33 )',
              line_height: 1.0188254303635715,
            },
          },
          {
            query_key: 'desktop',
            size: '150%',
            line_height: '1.5',
            type_scale: '1.33',
            query: 'screen and (min-width: 100em)',
            caption: {
              size: 'calc((1 / 1.33 ) * 1rem)',
              line_height: 'var(--h2-base-line-height)',
            },
            copy: {
              size: '1rem',
              line_height: 'var(--h2-base-line-height)',
            },
            h6: {
              size: 'calc((1 * 1.33 ) * 1rem)',
              line_height: 1.1278195488721805,
            },
            h5: {
              size: 'calc(var(--h2-font-size-h6) * 1.33 )',
              line_height: 1.6959692464243314,
            },
            h4: {
              size: 'calc(var(--h2-font-size-h5) * 1.33 )',
              line_height: 1.2751648469355876,
            },
            h3: {
              size: 'calc(var(--h2-font-size-h4) * 1.33 )',
              line_height: 1.4381558424085574,
            },
            h2: {
              size: 'calc(var(--h2-font-size-h3) * 1.33 )',
              line_height: 1.081320182262073,
            },
            h1: {
              size: 'calc(var(--h2-font-size-h2) * 1.33 )',
              line_height: 1.0840302579068402,
            },
            display: {
              size: 'calc(var(--h2-font-size-h1) * 1.33 )',
              line_height: 1.0188254303635715,
            },
          },
        ],
        colors: [
          {
            key: 'primary',
            default: {
              color: '#EE3482',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-light',
                    value: '255, 89, 159',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lighter',
                    value: '255, 144, 191',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lightest',
                    value: '255, 200, 223',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-dark',
                    value: '191, 25, 95',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darker',
                    value: '128, 17, 64',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darkest',
                    value: '64, 8, 32',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-primary',
              value: '238, 52, 130',
            },
          },
          {
            key: 'accent',
            default: {
              color: '#F4B12F',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-light',
                    value: '255, 201, 84',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lighter',
                    value: '255, 219, 141',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lightest',
                    value: '255, 237, 198',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-dark',
                    value: '191, 138, 21',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darker',
                    value: '128, 92, 14',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darkest',
                    value: '64, 46, 7',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-accent',
              value: '244, 177, 47',
            },
          },
          {
            key: 'focus',
            default: {
              color: '#2F73F4',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-light',
                    value: '84, 145, 255',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-lighter',
                    value: '141, 182, 255',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-lightest',
                    value: '198, 219, 255',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-dark',
                    value: '21, 82, 191',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-darker',
                    value: '14, 55, 128',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-darkest',
                    value: '7, 27, 64',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-focus',
              value: '47, 115, 244',
            },
          },
        ],
        containers: [],
        fonts: [
          {
            key: 'sans',
            default: {
              family: "'Open Sans', sans-serif",
            },
          },
          {
            key: 'serif',
            default: {
              family: 'serif',
            },
          },
          {
            key: 'script',
            default: {
              family: 'script',
            },
          },
          {
            key: 'mono',
            default: {
              family: 'monospace',
            },
          },
        ],
        gradients: [
          {
            key: 'divider',
            default: {
              gradient: 'linear-gradient(90deg, #EE3482, #F4B12F)',
              fallback: '#EE3482',
            },
          },
          {
            key: 'primaryRadial',
            default: {
              gradient:
                'radial-gradient(rgba(238, 52, 130, 1), rgba(42, 44, 61, 1))',
              fallback: 'rgba(238, 52, 130, 1)',
            },
          },
          {
            key: 'accentRadial',
            default: {
              gradient:
                'radial-gradient(rgba(244, 177, 47, 1), rgba(42, 44, 61, 1))',
              fallback: 'rgba(244, 177, 47, 1)',
            },
          },
        ],
        radii: [],
        shadows: [],
        transitions: {
          durations: [],
          functions: [],
          delays: [],
        },
      },
      dt: {
        key: 'dt',
        colors: [
          {
            key: 'white',
            default: {
              color: 'white',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-light',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-lighter',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-lightest',
                    value: '255, 255, 255',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-dark',
                    value: '191, 191, 191',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-darker',
                    value: '128, 128, 128',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-darkest',
                    value: '64, 64, 64',
                  },
                },
              ],
            },
            dark: {
              color: '#2d2d2d',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-light',
                    value: '98, 98, 98',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-lighter',
                    value: '150, 150, 150',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-lightest',
                    value: '203, 203, 203',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-dark',
                    value: '34, 34, 34',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-darker',
                    value: '23, 23, 23',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-white-darkest',
                    value: '11, 11, 11',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-white',
              value: '45, 45, 45',
            },
          },
          {
            key: 'black',
            default: {
              color: '#1B1C22',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-light',
                    value: '84, 84, 90',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-lighter',
                    value: '141, 141, 145',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-lightest',
                    value: '198, 198, 200',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-dark',
                    value: '20, 21, 26',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-darker',
                    value: '13, 14, 17',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-black-darkest',
                    value: '7, 7, 9',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-black',
              value: '27, 28, 34',
            },
          },
          {
            key: 'primary',
            default: {
              color: '#00C3B7',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-light',
                    value: '64, 225, 214',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lighter',
                    value: '128, 235, 228',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lightest',
                    value: '191, 245, 241',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-dark',
                    value: '0, 161, 150',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darker',
                    value: '0, 107, 100',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darkest',
                    value: '0, 54, 50',
                  },
                },
              ],
            },
            dark: {
              color: '#86e3de',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-light',
                    value: '157, 241, 237',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lighter',
                    value: '190, 246, 243',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lightest',
                    value: '222, 250, 249',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-dark',
                    value: '94, 177, 173',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darker',
                    value: '62, 118, 115',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darkest',
                    value: '31, 59, 58',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-primary',
              value: '134, 227, 222',
            },
          },
          {
            key: 'accent',
            default: {
              color: '#9747FF',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-light',
                    value: '175, 103, 255',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lighter',
                    value: '202, 154, 255',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lightest',
                    value: '228, 204, 255',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-dark',
                    value: '111, 39, 191',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darker',
                    value: '74, 26, 128',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darkest',
                    value: '37, 13, 64',
                  },
                },
              ],
            },
            dark: {
              color: '#c395ff',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-light',
                    value: '209, 168, 255',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lighter',
                    value: '224, 197, 255',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lightest',
                    value: '240, 226, 255',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-dark',
                    value: '145, 104, 191',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darker',
                    value: '97, 69, 128',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darkest',
                    value: '48, 35, 64',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-accent',
              value: '195, 149, 255',
            },
          },
          {
            key: 'tertiary',
            default: {
              color: '#FF5958',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-light',
                    value: '255, 118, 117',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-lighter',
                    value: '255, 164, 163',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-lightest',
                    value: '255, 209, 209',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-dark',
                    value: '191, 54, 54',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-darker',
                    value: '128, 36, 36',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-tertiary-darkest',
                    value: '64, 18, 18',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-tertiary',
              value: '255, 89, 88',
            },
          },
          {
            key: 'focus',
            default: {
              color: '#2F73F4',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-light',
                    value: '84, 145, 255',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-lighter',
                    value: '141, 182, 255',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-lightest',
                    value: '198, 219, 255',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-dark',
                    value: '21, 82, 191',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-darker',
                    value: '14, 55, 128',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-focus-darkest',
                    value: '7, 27, 64',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-focus',
              value: '47, 115, 244',
            },
          },
          {
            key: 'page',
            default: {
              color: '#f3f3f9',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-light',
                    value: '246, 246, 251',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-lighter',
                    value: '249, 249, 252',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-lightest',
                    value: '252, 252, 254',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-dark',
                    value: '182, 182, 187',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-darker',
                    value: '121, 121, 125',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-darkest',
                    value: '61, 61, 62',
                  },
                },
              ],
            },
            dark: {
              color: '#111117',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-light',
                    value: '76, 76, 82',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-lighter',
                    value: '136, 136, 139',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-lightest',
                    value: '195, 195, 197',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-dark',
                    value: '12, 12, 18',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-darker',
                    value: '8, 8, 12',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-page-darkest',
                    value: '4, 4, 6',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-page',
              value: '17, 17, 23',
            },
          },
        ],
        containers: [],
        fonts: [
          {
            key: 'sans',
            default: {
              family: "'Open Sans', sans-serif",
            },
          },
          {
            key: 'serif',
            default: {
              family: 'serif',
            },
          },
          {
            key: 'script',
            default: {
              family: 'script',
            },
          },
          {
            key: 'mono',
            default: {
              family: 'monospace',
            },
          },
        ],
        gradients: [
          {
            key: 'divider',
            default: {
              gradient: 'linear-gradient(90deg, #FFB900, #00C3B7, #FF5958)',
              fallback: '#FFB900',
            },
          },
          {
            key: 'primaryRadial',
            default: {
              gradient:
                'radial-gradient(RGBA(255, 185, 0, 1), rgba(42, 44, 61, 1))',
              fallback: 'RGBA(255, 185, 0, 1)',
            },
          },
          {
            key: 'accentRadial',
            default: {
              gradient:
                'radial-gradient(RGBA(255, 89, 88, 1), rgba(42, 44, 61, 1))',
              fallback: 'RGBA(255, 89, 88, 1)',
            },
          },
        ],
        radii: [],
        shadows: [],
        transitions: {
          durations: [],
          functions: [],
          delays: [],
        },
      },
      iap: {
        key: 'iap',
        colors: [
          {
            key: 'primary',
            default: {
              color: '#c01e5a',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-light',
                    value: '220, 74, 128',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lighter',
                    value: '232, 134, 170',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lightest',
                    value: '243, 195, 213',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-dark',
                    value: '156, 10, 64',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darker',
                    value: '104, 7, 43',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darkest',
                    value: '52, 4, 21',
                  },
                },
              ],
            },
            dark: {
              color: '#df6b96',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-light',
                    value: '240, 135, 174',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lighter',
                    value: '245, 175, 201',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-lightest',
                    value: '250, 215, 228',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-dark',
                    value: '176, 72, 110',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darker',
                    value: '117, 48, 74',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-primary-darkest',
                    value: '59, 24, 37',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-primary',
              value: '223, 107, 150',
            },
          },
          {
            key: 'accent',
            default: {
              color: '#272f6b',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-light',
                    value: '88, 95, 149',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lighter',
                    value: '144, 148, 184',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lightest',
                    value: '199, 202, 220',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-dark',
                    value: '24, 31, 85',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darker',
                    value: '16, 21, 57',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darkest',
                    value: '8, 10, 28',
                  },
                },
              ],
            },
            dark: {
              color: '#6871b3',
              modifiers: [
                {
                  key: 'light',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-light',
                    value: '136, 144, 204',
                  },
                },
                {
                  key: 'lighter',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lighter',
                    value: '176, 181, 221',
                  },
                },
                {
                  key: 'lightest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-lightest',
                    value: '215, 218, 238',
                  },
                },
                {
                  key: 'dark',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-dark',
                    value: '72, 81, 140',
                  },
                },
                {
                  key: 'darker',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darker',
                    value: '48, 54, 93',
                  },
                },
                {
                  key: 'darkest',
                  default: true,
                  overwritten: false,
                  color: false,
                  var_data: {
                    name: '--h2-color-accent-darkest',
                    value: '24, 27, 47',
                  },
                },
              ],
            },
            var_data: {
              name: '--h2-color-accent',
              value: '104, 113, 179',
            },
          },
        ],
        containers: [],
        fonts: [
          {
            key: 'sans',
            default: {
              family: "'Open Sans', sans-serif",
            },
          },
          {
            key: 'serif',
            default: {
              family: 'serif',
            },
          },
          {
            key: 'script',
            default: {
              family: 'script',
            },
          },
          {
            key: 'mono',
            default: {
              family: 'monospace',
            },
          },
        ],
        gradients: [
          {
            key: 'divider',
            default: {
              gradient: 'linear-gradient(90deg, #c01e5a, #272f6b)',
              fallback: '#c01e5a',
            },
          },
          {
            key: 'primaryRadial',
            default: {
              gradient:
                'radial-gradient(rgba(192, 30, 90, 1), rgba(42, 44, 61, 1))',
              fallback: 'rgba(192, 30, 90, 1)',
            },
          },
          {
            key: 'accentRadial',
            default: {
              gradient:
                'radial-gradient(rgba(39, 47, 107, 1), rgba(42, 44, 61, 1))',
              fallback: 'rgba(39, 47, 107, 1)',
            },
          },
        ],
        radii: [],
        shadows: [],
        transitions: {
          durations: [],
          functions: [],
          delays: [],
        },
      },
    },
    config: {
      directory: '/home/substrae/code/hydrogen/tests/test-defaults',
      path: '/home/substrae/code/hydrogen/tests/test-defaults/hydrogen.config.json',
    },
  };
}

module.exports = {
  settings_test_data,
};
