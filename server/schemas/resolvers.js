const { AuthenticationError } = require('apollo-server-express');
const { User, Park } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  // Query: {
  //   me: async (parent, args, context) => {
  //     if (context.user) {
  //       return User.findOne({ _id: context.user._id });
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  // },

  Query: {
    me: async (parent, { name }) => {
      return User.findOne({ name }).populate('savedParks');
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // ****** NEW
    savePark: async (parent, args, context) => {
      if (context.user) {
      //   const savedBook = await Book.create({ ...args, username: context.user.username });
       const updatedUser =  await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedParks: args.input } },
          { new: true }
        );
    
      return updatedUser;
      }
    
      throw new AuthenticationError('You need to be logged in!');
  },

    // ****** OLD
    // savePark: async (parent, args, context) => {
    //     if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: context.userId },
    //       {
    //         $addToSet: {
    //           parks: args.input
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    removePark: async (parent, { userId, parkId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: parkId },
          {
            $pull: {
              parks: {
                _id: parkId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },





  },
};

module.exports = resolvers;
