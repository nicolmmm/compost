import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query Users {
    users {
      userName
      email
      phoneNumber
      thumbsUp
    }
  }
`;

export const SEARCH_BY_POSTCODE = gql`
  query StationByPostCode($postCode: Int!) {
    stationByPostCode(queryPostCode: $postCode) {
      _id
      stationName
      stationDescription
      streetNumber
      street
      city
      postCode
      acceptingWaste
      distributingSoil
    }
  }
`;

export const QUERY_MATCHUPS = gql`
  query matchups($_id: String) {
    matchups(_id: $_id) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;
