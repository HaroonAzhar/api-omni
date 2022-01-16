# 2. Use TypeScript as the main technology

Date: 2019-12-05

## Status

Accepted

## Context

Previously, considering the skillset that we have and want to grow in the company the decision was made to build the backend of the Omni API in Node.js.

Building ups in the JS there are at least two options to do so:

- build in the vanilla JS
- build it using TypeScript

The decision that needs to be made was: "Do we want to use TypeScript in Omni API?"

TypeScript is an object-oriented programming language developed and maintained by the Microsoft Corporation. It is a superset of JavaScript and contains all of its elements.

Main advantages of the TypeScript are:

- TypeScript provides highly productive development tools for JavaScript IDEs and practices, like static checking.
- TypeScript simplifies JavaScript code, making it easier to read and debug.
- TypeScript will help your developers work together on a growing codebase.
- Typescript supports interfaces and generic classes and using dependency injection it is easier to build clean code.

Main disadvantages of the TypeScript are:

- It’s quicker to set up something in JavaScript. The lack of a type system makes for agility and ease of changing stuff. It also makes it easier to break things, so make sure you know what you’re doing.
- TypeScript requires additional transcription step, which takes some time and must be set up on developer environments.

Some more in-depth articles:
https://dzone.com/articles/what-is-typescript-and-why-use-it
https://itnext.io/why-use-typescript-good-and-bad-reasons-ccd807b292fb
https://www.freecodecamp.org/news/when-should-i-use-typescript-311cb5fe801b/

## Decision

Considering that:

- the main developer in the project has extensive experience in TypeScript
- TypeScript is something that we want to test in the company and spread the knowledge about it among other developers
- we want to build a readable, well-designed project

We will be using TypeScript as the main language in the project

## Consequences

Additional compilation steps would be needed for all source code files in the project. It will be part of the CI process.

We will be building functions and classes using the type-annotated language which is an additional burden for the developers, although it makes code more readable.
