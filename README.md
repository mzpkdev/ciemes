# ciemes

TypeScript monorepo for the Ciemes core and its GraphQL and REST API packages.

## Packages

- `@ciemes/core`
- `@ciemes/graphql-api`
- `@ciemes/rest-api`

## Development

The workspace uses Turborepo to coordinate package tasks and the sibling
WebAnvil worktree managed by uberepo for builds, checks, and tests.

```sh
npm install
npm run build
npm run check
npm test
```
