const { AuthenticationError } = require("apollo-server-express");
const { Station, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      console.log(userId);
      return User.findOne({ _id: userId });
    },

    stations: async () => {
      return Station.find();
    },

    stationByPostCode: async (parent, { queryPostCode }) => {
      return Station.find({ postCode: queryPostCode });
    },
  },

  Mutation: {
    addUser: async (parent, { userName, email, password, phoneNumber }) => {
      const user = await User.create({
        userName,
        email,
        password,
        phoneNumber,
      });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addStation: async (
      parent,
      {
        stationName,
        stationDescription,
        streetNumber,
        street,
        city,
        postCode,
        acceptingWaste,
        distributingSoil,
      }
    ) => {
      return Station.create({
        stationName,
        stationDescription,
        streetNumber,
        street,
        city,
        postCode,
        acceptingWaste,
        distributingSoil,
      });
    },

    incrementThumbsUp: async (parents, { userId }) => {
      return User.findOneAndUpdate({ _id: userId }, { $inc: { thumbsUp: 1 } });
    },

    incrementThumbsDown: async (parents, { userId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $inc: { thumbsDown: 1 } }
      );
    },

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
  },
};

module.exports = resolvers;
