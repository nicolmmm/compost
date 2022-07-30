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
    }
  }
`;
