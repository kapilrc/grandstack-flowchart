import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import dotenv from "dotenv";
import seedmutations from "./seed-mutations-single";
import fetch from "node-fetch";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

dotenv.config();

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_URI, fetch }),
  cache: new InMemoryCache()
});

client
  .mutate({
    mutation: gql(seedmutations)
    // mutation: gql(`
    //   mutation {
    //     CreateUser(id: "start", name: "Starting Point") {
    //       id
    //       name
    //     }
    //   }
    // `)
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
