import { gql } from "@apollo/client/core";

// Create the scaffolding for each GQL POST request
export const ADD_SENATE_DISCLOSURE = gql`
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

export const ADD_HOUSE_DISCLOSURE = gql`
  mutation(
    $office: String!
    $first: String!
    $last: String!
    $title: String!
    $year: Int!
    $link: String!
  ) {
    addDisclosure(
      input: {
        office: $office
        first: $first
        last: $last
        title: $title
        year: $year
        link: $link
      }
    ) {
      id
    }
  }
`;
