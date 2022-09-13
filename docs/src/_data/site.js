module.exports = {
  build_time: new Date(),
  base_url: 'https://hydrogen.design',
  name: 'Hydrogen',
  languages: [
    {
      label: 'EN',
      code: 'en',
    },
    {
      label: 'FR',
      code: 'fr',
    },
  ],
  components: {
    skip_to_content: {
      title: {
        en: 'Skip to the main content of this page.',
        fr: 'Sautez au contenu principal de cette page.',
      },
      label: {
        en: 'Skip to content',
        fr: 'Sauter au contenu',
      },
    },
    skip_to_nav: {
      title: {
        en: 'Skip to the main navigation.',
        fr: 'Sauter à la navigation principale.',
      },
      label: {
        en: 'Skip to navigation',
        fr: 'Sauter à la navigation',
      },
    },
    breadcrumbs: {
      theme_switcher: {
        preference_toggle: {
          title: {
            en: 'Toggle the theme to your system preference.',
            fr: 'Passez le thème en fonction de vos préférences système.',
          },
        },
        light_toggle: {
          title: {
            en: 'Toggle the theme to light mode.',
            fr: 'Passez le thème en mode léger.',
          },
        },
        dark_toggle: {
          title: {
            en: 'Toggle the theme to dark mode.',
            fr: 'Passez le thème en mode sombre.',
          },
        },
      },
      language_toggle: {
        title: {
          en: 'Visitez cette page en français.',
          fr: 'Visit this page in English.',
        },
      },
    },
  },
};
