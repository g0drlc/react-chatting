import { UserSchema } from './';

const types = `
  type Comment {
    id: ID!
    content: String!
    createdAt: String!
    updatedAt: String!
    author: User!
  }

  type ErrableComment {
    id: ID
    comment: Comment
    error: String
  }
`;

const queries = `
  comments(offset: Int, limit: Int): [Comment]
  comment(id: ID!): Comment
`;

const mutations = `
  postComment(content: String!): ErrableComment
  removeComment(id: ID!): ErrableComment
`;

const resolvers = {
  Query: {
    comments: async (root, { offset, limit }, context) => {
      return await context.Comment.getComments({ offset, limit });
    },
    comment: async (root, { id }, context) => await context.Comment.getById(id),
  },
  Mutation: {
    postComment: async (__, { content }, context) => {
      return await context.Comment.postNewComment({ content, user: context.user });
    },
    removeComment: async (__, { id }, context) => {
      return await context.Comment.removeComment({ id, user: context.user });
    }
  },
};

export default {
  types: () => [types, UserSchema.types],
  queries,
  mutations,
  resolvers
};
