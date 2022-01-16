# API v2

We use framework written in TypeScript - **Nest**. See docs: https://docs.nestjs.com/.

## Core concepts

To be consistent with Nest, we use:

- _class-validators_ to validate forms (_class-transformer_ to transform); for casting eg, numbers we can use
  transformer `Type` and decorate prop in class (`@Type(() => Number)`)
- file between modules should be imported as absolute path using prefix `@v2`;
  inside module it could be realized as relative
- response in case of success should contain object with properties _data_ and _pagination_ (optional); in case of error response should be wrapped by framework
- we use **prettier** recommended rules for lint code in v2
