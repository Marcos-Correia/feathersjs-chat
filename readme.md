# chat

## About

This project uses [Feathers](http://feathersjs.com), an open source framework for building APIs and real-time applications.

## Getting Started

1. Install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/).
2. Install dependencies:
    ```sh
    cd path/to/chat
    npm install
    ```

3. Start the app:
    ```sh
    npm run compile  # Compile TypeScript source
    npm run migrate  # Run database migrations
    npm start
    ```


## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## API Documentation

API documentation for the Chat Application built with FeathersJS is available in the [readme.md](https://github.com/Marcos-Correia/feathersjs-chat/blob/main/src/readme.md) file. It includes details on endpoints for managing users and messages.

## Public Folder

The [public](https://github.com/Marcos-Correia/feathersjs-chat/blob/main/public) folder contains static assets and client-side code for the chat application. Key files include:
- [client.js](https://github.com/Marcos-Correia/feathersjs-chat/blob/main/public/client.js): Initializes the Feathers client and handles client-side logic.
- [index.html](https://github.com/Marcos-Correia/feathersjs-chat/blob/main/public/index.html): Entry point for the chat application.
- `locales/`: Contains localization files for different languages.

To use the assets in this folder, ensure your server is configured to serve static files from the [public](https://github.com/Marcos-Correia/feathersjs-chat/blob/main/public) directory. The [index.html](https://github.com/Marcos-Correia/feathersjs-chat/blob/main/public/index.html) file will be the main entry point for users accessing the chat application.