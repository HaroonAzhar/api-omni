# 4. Use apidoc for endpoint documentation

Date: 2019-12-31

## Status

Accepted

## Context

To document how frontend can utilize the API we need a tool to generate a documentation webpage.

In the company we have most of our experience working with `apidoc`. Using `apidoc` each endpoint
function should be documented according to `apidoc` documentation.

Main alternative is `swagger`. In `swagger` enpoints are documented in JSON file according 
to its specification.

## Decision

Considering our experience we are choosing `apidoc` as the documentation tool.

## Consequences

Each endpoint should be documented according to the apidoc specification.

It will add some work fo the dev team. Moreover, docs must be kept in sync with changes of the endpoints.

In the future we may revisit this decision and switch to `swagger`
