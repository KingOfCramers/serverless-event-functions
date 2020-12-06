import { Handler } from "../Types";
import axios from "axios";
import {
  createError,
  createSuccess,
  createApolloClient,
} from "../common/index";

import { ApolloError } from "@apollo/client/core";
import { ADD_HOUSE_DISCLOSURE } from "../gql";

type HouseDisclosure = {
  office: string;
  first: string;
  last: string;
  title: string;
  year: number;
  link: string;
};

export const getHouseDisclosures: Handler = async (
  _event,
  _context,
  _callback
) => {
  const res = await axios.post(
    process.env.SCRAPER_BASE_URL + "getHouseDisclosures",
    {}
  );

  if (res.status !== 200) {
    return createError(
      new Error(`Post returned status ${res.status}: ${res.statusText}`)
    );
  }

  const data: HouseDisclosure[] = res.data;

  const client = createApolloClient();

  // For each datapoint scraped, send the GQL POST to the API
  for (const disclosure of data) {
    const { office, first, last, title, year, link } = disclosure;
    try {
      await client.mutate({
        mutation: ADD_HOUSE_DISCLOSURE,
        variables: { office, first, last, title, year, link },
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
