# Trivia App

This repository contains all code for a trivia application, a starter project to get familiar with React as well as team-based development. The codebase consists currently of a UI project.

## Development

- Next.JS based scaffolding for this project.
- JavaScript based stack that supports [TypeScript](https://typescriptlang.org). Initially, the project will support TypeScript based development, but JavaScript files may be seen
  in the project as all collaborators become familiar with React using JavaScript, with the eventual goal of creating all UI components using React + TypeScript.
- [TSLint] is utilized to help ensure that code conforms to an internal standard
- UIs are built using [React](https://reactjs.org) for views, [React Router](https://reacttraining.com/react-router) for browser-based routing

## Installation

1. At the root of the repository (/), execute the following commands to start the server of the project.

   `npm install`

   `npm run dev`

The server should start at `localhost:3000`. By running the `npm run dev` command, Next.JS will watch for changes in the code base and will live reload as files in the repository are
updated and saved.

## Notes

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.
