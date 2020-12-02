import { Handler } from "./Types";
import axios from "axios";
import { createError, createSuccess, createApolloClient } from "./common";

import { gql, ApolloError } from "@apollo/client";

class Disclosure {
  id: string;
  first: string;
  last: string;
  link: string;
  title: string;
  date: Date;
}

export const getSenateDisclosures: Handler = async (
  _event,
  _context,
  _callback
) => {
  // Activate our scraper with the correct POST
  // request and pull off the relevant data from
  // the Axios response. The SCRAPER_BASE_URL is our
  // Lambda function production API, with the getSenateDisclosures
  // pointing to the specific Lambda for Senate disclosures

  const res = await axios.post(
    process.env.SCRAPER_BASE_URL + "getSenateDisclosures",
    {}
  );

  if (res.status !== 200) {
    return createError(
      new Error(`Post returned status ${res.status}: ${res.statusText}`)
    );
  }

  const data: Disclosure[] = res.data;

  // Create an ApolloClient for interacting with the API
  const client = createApolloClient();

  // Create the scaffolding for each GQL POST request
  const ADD_DISCLOSURE = gql`
    mutation(
      $first: String!
      $last: String!
      $link: String!
      $title: String!
      $date: DateTime!
    ) {
      addDisclosure(
        input: {
          first: $first
          last: $last
          link: $link
          title: $title
          date: $date
        }
      ) {
        id
        first
      }
    }
  `;

  // For each datapoint scraped, send the GQL POST to the API
  for (const disclosure of data) {
    const { first, last, link, title, date } = disclosure;
    try {
      await client.mutate({
        mutation: ADD_DISCLOSURE,
        variables: { first, last, link, title, date },
      });
    } catch (err) {
      if (err instanceof ApolloError) {
        console.error("❌", `Could not save data due to GraphQLError(s)`);
        err.graphQLErrors.forEach((error) =>
          console.error("  ", error.message)
        );
      } else if (err instanceof Error) {
        console.error("❌", `Could not save: ${err.message}`);
      }
    }
  }
  // Send a success message upon completion
  return createSuccess("Completed function.");
};
