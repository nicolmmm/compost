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

export const USER_BY_ID = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      thumbsDown
      thumbsUp
      phoneNumber
      userName
      _id
    }
  }
`;

export const USER_BY_ID_STATION_LISTS = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      userName
      phoneNumber
      thumbsUp
      thumbsDown
      ownsStations {
        _id
        stationName
        stationDescription
        streetNumber
        street
        city
        postCode
        acceptingWaste
        distributingSoil
        owner
      }
      savedStations {
        _id
        stationName
        stationDescription
        streetNumber
        street
        city
        postCode
        acceptingWaste
        distributingSoil
        owner
      }
    }
  }
`;

export const USER_BY_ID_PROFILE = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      userName
      phoneNumber
      thumbsUp
      thumbsDown
      ownsStations {
        _id
      }
      savedStations {
        _id
      }
    }
  }
`;

export const SEARCH_STATION_BY_ID = gql`
  query SingleStation($stationId: ID!) {
    singleStation(stationId: $stationId) {
      _id
      stationName
      stationDescription
      streetNumber
      street
      city
      postCode
      acceptingWaste
      distributingSoil
      owner
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
