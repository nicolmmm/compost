import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const SAVE_STATION = gql`
  mutation SaveStation($stationId: ID!) {
    saveStation(stationId: $stationId) {
      savedStations {
        _id
      }
    }
  }
`;

export const REMOVE_SAVED_STATION = gql`
  mutation RemoveSavedStation($stationId: ID!) {
    removeSavedStation(stationId: $stationId) {
      userName
      _id
    }
  }
`;

export const REMOVE_STATION = gql`
  mutation RemoveStation($stationId: ID!) {
    removeStation(stationId: $stationId) {
      stationName
      _id
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation addUser(
    $userName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
  ) {
    addUser(
      userName: $userName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
    ) {
      token
      user {
        userName
        email
        password
        phoneNumber
      }
    }
  }
`;

export const INCREMENT_THUMBS_DOWN = gql`
  mutation IncrementThumbsDown($userId: ID!) {
    incrementThumbsDown(userId: $userId) {
      userName
      _id
      thumbsDown
    }
  }
`;

export const INCREMENT_THUMBS_UP = gql`
  mutation IncrementThumbsUp($userId: ID!) {
    incrementThumbsUp(userId: $userId) {
      _id
      userName
      thumbsUp
    }
  }
`;

export const CREATE_NEW_STATION = gql`
  mutation addStation(
    $stationName: String!
    $stationDescription: String!
    $streetNumber: String!
    $street: String!
    $city: String!
    $postCode: Int!
    $acceptingWaste: Boolean
    $distributingSoil: Boolean
  ) {
    addStation(
      stationName: $stationName
      stationDescription: $stationDescription
      streetNumber: $streetNumber
      street: $street
      city: $city
      postCode: $postCode
      acceptingWaste: $acceptingWaste
      distributingSoil: $distributingSoil
    ) {
      stationName
      _id
    }
  }
`;
