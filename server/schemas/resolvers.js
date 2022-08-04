const { AuthenticationError } = require("apollo-server-express");
const { Station, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //finds all users
    users: async () => {
      return User.find();
    },

    //find a single user and their stations
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId })
        .populate("ownsStations")
        .populate("savedStations");
    },
    // finds all stations
    stations: async () => {
      return Station.find();
    },

    //finds a single station
    singleStation: async (parent, { stationId }) => {
      return Station.findOne({ _id: stationId });
    },

    //find a station by it's postcode
    stationByPostCode: async (parent, { queryPostCode }) => {
      return Station.find({ postCode: queryPostCode });
    },
  },

  Mutation: {
    //add a new user
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

    //saves a station to a user's "savedStations" array
    saveStation: async (parent, { stationId }, context) => {
      console.log(stationId);
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedStations: stationId } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //add a new station if a user is logged in.
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
          { $addToSet: { ownsStations: station._id } },
          { new: true }
        );
        return station;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    incrementThumbsUp: async (parents, { userId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $inc: { thumbsUp: 1 } },
        { new: true }
      );
    },

    incrementThumbsDown: async (parents, { userId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $inc: { thumbsDown: 1 } },
        { new: true }
      );
    },

    //removes a user, not used currently
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    //removes a saved station from a user's savedStations array
    removeSavedStation: async (parent, { stationId }, context) => {
      console.log(context.user);
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedStations: stationId } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //deletes  a station
    removeStation: async (parent, { stationId }, context) => {
      if (context.user) {
        return Station.findOneAndDelete({ _id: stationId });
      }
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { ownsStations: stationId } },
        { new: true }
      );
      return user;
    },
  },
};

module.exports = resolvers;
