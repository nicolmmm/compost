const { Station, User } = require("../models");

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
      return User.create({ userName, email, password, phoneNumber });
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
