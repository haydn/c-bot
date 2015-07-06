# C-BOT

A [Curvytron](http://curvytron.com) bot by Haydn Ewers.

Inspired by [Curvybot](https://github.com/chris-teague/curvybot) by Chris Teague.

## Requirements

- [Node.js](https://nodejs.org)
- [Babel CLI](https://babeljs.io/docs/setup/#babel_cli)
- [direnv](http://direnv.net)

## Getting Started

1.  Install NPM dependencies:

    ```
    npm install
    ```

2.  Create `.envrc`:

    ```
    echo "export URL=ws://curvytron.com" > .envrc
    ```

3.  Allow the `.direnvrc` file:

    ```
    direnv allow
    ```

4.  Run with `babel-node`:

    ```
    babel-node index.js
    ```
