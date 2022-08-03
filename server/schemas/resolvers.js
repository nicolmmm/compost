const { AuthenticationError } = require("apollo-server-express");
const { Station, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId })
        .populate("ownsStations")
        .populate("savedStations");
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

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    removeSavedStation: async (parent, { stationId }, context) => {
      console.log(context.user);
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedStations: stationId } },
          { new: true }
        );
        console.log(context.user);
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeStation: async (parent, { userId }) => {
      return Station.findOneAndDelete({ _id: stationId });
      //update saved stations too?
    },
  },
};

module.exports = resolvers;
