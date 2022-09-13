---
eleventyNavigation:
  key: Home
layout: pages/home.njk
title: Home
key: home
homeNav:
  - label: Home
    id: home
    link: /en
    title: Visit Hydrogen's homepage.
  - label: Code
    link: https://gitlab.com/hydrogen-css/hydrogen
    title: Visit Hydrogen's open source code.
hero:
  title: Hydrogen
  slogan: An open-source design and CSS utility framework powered by data-attributes.
  features:
    - title: What is Hydrogen?
      content:
        - Hydrogen is a utility CSS framework that allows you to style websites right in your markup. Design settings meet the flexibility of data attributes to help you create consistent, beautiful experiences.
    - title: How does it work?
      content:
        - Hydrogen scans your markup for instances of <code>data-h2</code> attributes and builds CSS based on their values. It produces a production-ready file that only contains exactly what you've asked for.
    - title: Why should I use it?
      content:
        - Leave behind the complexities of maintaining your CSS, remembering how to name classes, defining type scales, and enforcing consistent colors. Best of all, Hydrogen is fast, legible, and open-source.
features:
  title:
    label: Feature overview
    id: features
    img:
      src: /static/img/icon-robot.svg
      alt: A sticker-style icon of one of Hydrogen's adorable little mascots, Beep. Beep is a robot.
  sections:
    - title:
        label: An easy-to-learn, namespaced syntax.
        id: syntax
      copy:
        - Hydrogen's syntax mimics CSS to make understanding your markup as easy as possible. It pulls from existing best practices to reduce the language learning curve, and it won't interfere with your existing CSS thanks to its custom attributes.
      code:
        file: index.html
        lines:
          - '<p data-h2-color="base(primary) base:hover(accent)">'
          - '  Welcome to Hydrogen!'
          - '</p>'
    - title:
        label: Watch it build as you work, in an instant.
        id: speed
      copy:
        - Rather than compiling a library, Hydrogen scans your code and builds a CSS file. Integrate it into your build tools and run it in the background as you develop and it will provide an up-to-date CSS file for you on the fly.
      code:
        file: terminal
        lines:
          - '☼ Hydrogen - Timer - Total build: 234ms'
          - '☼ Hydrogen - Success'
          - '> Context: Hydrogen successfully build a CSS file in your output directory.'
    - title:
        label: Your brand, your way, in every line.
        id: brand
      copy:
        - Embracing a design token style approach, Hydrogen encourages you to define decisions like color, typography, radii, and shadows in its configuration file. Use these definitions in your attributes, and update them product-wide in a matter of seconds.
      code:
        file: index.html
        lines:
          - '<p data-h2-color="base(myBrandColor)">'
          - '  Your project name.'
          - '</p>'
subfeatures:
  title:
    label: And a whole lot more...
    id: more
  list:
    - label: Inline media queries
      content:
        - Define any type of query in your configuration and then call them right in your markup.
    - label: Target specific selectors
      content:
        - Style component states by targeting whether an ID or class is present on your element.
    - label: Target nested elements
      content:
        - Using the <code>:children</code> modifier, set styles on nested tags or selectors for bulk styling.
    - label: Inline dark mode
      content:
        - Pair queries with dark mode counterparts and toggle them through a class or browser setting.
    - label: Inline state styling
      content:
        - Style and manage native HTML interaction states like hover and focus right in your markup.
    - label: CSS value support
      content:
        - Use raw CSS values in many attributes to get it pixel perfect, including color, spacing, and more.
    - label: Automated typography
      content:
        - Generate a type scale, vertical rhythm, and whitespace framework based on line height.
    - label: Open-source
      content:
        - The framework is provided under an MIT license. Dig into the code and discover the possibilities.
start:
  title:
    label: Quick start
    id: start
    img:
      src: /static/img/icon-flag.svg
      alt: A sticker-style icon of a race flag.
  subtitle:
    label: Get up and running in 6 steps.
    id: steps
  sections:
    - section:
        - type: step
          index: 1
          content:
            - Install Hydrogen using NPM
        - type: copy
          content:
            - Ensure you have <a href="https://nodejs.org/en/" title="Learn more about Node and NPM." target="_blank" rel="noreferrer">Node installed</a> on your machine. Then navigate to your project in a terminal and run the NPM installation command to install Hydrogen.
      code:
        file: terminal
        lines:
          - 'npm install @hydrogen-css/hydrogen --save'
    - section:
        - type: step
          index: 2
          content:
            - Create a configuration file
        - type: copy
          content:
            # - From your project, run the <code>h2-init</code> command to create a configuration file. You'll be asked to specify your input and output directories. Learn more about initialization on <a href="en/docs/setup/commands/#init" title="Learn more about the command line options available when using Hydrogen.">the commands page</a>.
            - From your project, run the <code>h2-init</code> command to create a configuration file. You'll be asked to specify your input and output directories. Learn more about initialization on the commands page.
      code:
        file: terminal
        lines:
          - 'npx h2-init'
    - section:
        - type: step
          index: 3
          content:
            - Add <code>data-h2</code> to your <code>html</code> element
        - type: copy
          content:
            - To apply Hydrogen to your entire project, add the <code>data-h2</code> attribute to your <code>html</code> element. Hydrogen's styles won't work outside of this attribute, so feel free to apply it elsewhere if you only need to style a subset of your project.
      code:
        file: index.html
        lines:
          - '<!DOCTYPE html>'
          - '<html data-h2>'
          - '  <body />'
          - '</html>'
    - section:
        - type: step
          index: 4
          content:
            - Import the Hydrogen CSS file
        - type: copy
          content:
            - Like any other CSS file, you'll need to import Hydrogen's CSS into the <code>head</code> of your document.
      code:
        file: index.html
        lines:
          - '<head>'
          - '  ...'
          - '  <link rel="stylesheet" href="path/to/hydrogen.css">'
          - '</head>'
    - section:
        - type: step
          index: 5
          content:
            - Use Hydrogen to style an element
        - type: copy
          content:
            - Now that the CSS file is ready to be loaded in, you can start going wild with Hydrogen attributes to style your project.
      code:
        file: index.html
        lines:
          - '<p data-h2-color="base(primary)">'
          - '  Hello!'
          - '</p>'
    - section:
        - type: step
          index: 6
          content:
            - Watch the magic
        - type: copy
          content:
            # - When you're ready to view your masterpiece, you can run the build (or <a href="en/docs/setup/commands/#watch" title="Learn more about the command line options available when using Hydrogen.">watch</a>) command to compile your custom built CSS file.
            - When you're ready to view your masterpiece, you can run the build (or watch) command to compile your custom built CSS file.
      code:
        file: terminal
        lines:
          - 'npx h2-build'
properties:
  title:
    label: Find a property
    id: properties
    img:
      src: /static/img/icon-compass.svg
      alt: A sticker-style icon of a compass.
    link:
      link: /en/docs
      title: Head on over to Hydrogen's documentation for more detailed property information.
      label: Visit the documentation
---
