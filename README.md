# Project Directory Structure

This document describes the folder structure and purpose of each directory and key file in the project.

```
project-root/
├── .yarn/                     # Yarn package management directory
├── dist/                      # Production build output
├── node_modules/              # Installed dependencies
│
├── src/                       # Main source code directory
│   ├── assets/                # Static assets (images, icons, styles)
│   ├── components/            # Reusable Vue components (UI, widgets, layouts)
|   │   ├── Board/             # Includes -> Action.vue, Content.vue, Header.vue                   
|   │   ├── MessageBubble/     # Inlcudes -> ButtonOptions.vue, Main.vue, Single.vue, Typing        
|   │   ├── Outer/             # Includes -> AppStyle.vue, BotUi.vue, Homesection.vue
|   │   ├── AppStyle.vue                 
|   │   ├── HomePage.vue              
|   │   └── RegistrationForm.vue
|   |
│   ├── config/                # Configuration files (API endpoints, environment variables)
│   ├── helpers/               # Utility and helper functions
│   ├── App.vue                # Root Vue component
│   ├── main.js                # Main entry point that initializes the Vue app
│   └── vue-bot-ui.js          # Bot UI integration entry script
│
├── tests/
│   └── unit/                  # Unit tests for components and logic
│
├── .editorconfig              # Editor configuration for consistent coding styles
├── .env                       # Environment variables for local development
├── .example.env               # Example environment variable file
├── .eslintrc.js               # ESLint configuration for code linting
├── .gitignore                 # Git ignored files and folders
├── .yarnrc.yml                # Yarn configuration file
│
├── babel.config.js            # Babel transpiler configuration
├── changelog.md               # Project changelog (version history)
├── commitlint.config.js       # Commit message linting configuration
├── jest.config.js             # Jest testing configuration
│
├── LICENSE                    # License for the project
├── package.json               # Project metadata and dependencies
├── package-lock.json          # NPM lock file (for deterministic builds)
├── README.md                  # Project overview, setup, and usage guide
├── vue.config.js              # Vue CLI configuration
└── yarn.lock                  # Yarn lock file (dependency versions)
```

---

## Notes

- **`src/components/`** contains modular Vue components for UI — for example, chat bubbles, input fields, message lists, etc.  
- **`src/helpers/`** includes functions like formatters, validators, or network utilities.  
- **`config/`** may include constants such as API base URLs or bot settings.  
- **`vue-bot-ui.js`** could be used as the main export for embedding or initializing the chatbot widget externally.  

---

## Build & Run

```bash
# Install dependencies
yarn install

# Run in development mode
yarn serve

# Development & Demo - http://localhost:1901

# Build for production
yarn build

# Run tests
yarn test:unit
```
