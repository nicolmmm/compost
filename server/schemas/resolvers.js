const { AuthenticationError } = require("apollo-server-express");
const { Station, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    stations: async () => {
      return Station.find();
    },

    singleStation: async (parent, { stationId }) => {
      return Station.findOne({ _id: stationId });
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
      console.log("user is", user, "token is", token);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      console.log("we in login");
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
      },
      context
    ) => {
      console.log("context is ", context.user);
      if (context.user) {
        const station = await Station.create({
          stationName,
          stationDescription,
          streetNumber,
          street,
          city,
          postCode,
          acceptingWaste,
          distributingSoil,
          owner: context.user._id,
        });
        //adds station ID to user in DB
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { ownsStations: station._id } }
        );
        return station;
      }
      throw new AuthenticationError("You need to be logged in!");
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
