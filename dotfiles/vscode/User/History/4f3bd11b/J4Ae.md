# Queries

This directory contains all the GraphQL queries used in Ourafront.

## Building queries

Some guidelines on adding new queries here:

- If possible, each page should have just one single query to fetch all the data it needs.
  Fewer requests are better.

- Queries can either be run server-side (inside the page's getInitialProps function) or
  client-side (as a hook inside a React component). Server-side is better if possible.

- We're using react-query as a fetching/caching layer in front of all queries.

  - Server-side queries will call react-query's `queryClient.fetchQuery` (a blocking async call).

  - Client-side queries will call react-query's `useQuery` (a non blocking React hook).

- When adding a new query, add a test for it in /tests/integration/Queries.test.ts . This
  test can just check that the query succeeds without error. (this will catch any mismatches
  with the live GraphQL schema)

## Typescript types

Inside /queries/types are automatically generated Typescript types.

> Note: these types are managed in [ouraservices](https://github.com/jouzen/ouraservices/blob/staging/services/content/GQLSchema.ts)

After you write or update your query file, run `node bin/regenerateGraphQLTypescript.js` to
update the Typescript files. This will reference the schema from Staging environment.

If you have schema changes that aren't on staging yet, you can run
`node bin/regenerateGraphQLTypescript.js --local` to update types from your local server running on http://localhost:8201 .
