const { gql, ApolloServer } = require("apollo-server");
//CREATE FAKE DATABASE
let books = [];
//DEFINE TYPES
const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
    publishedAt: Int
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    create(id: ID!, title: String!, author: String!, publishedAt: Int!): Book
    delete(id: ID!): Boolean
    update(id: ID!, title: String, author: String, publishedAt: Int): Book
  }
`;
//DEFINE RESOLVERS
const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    book: (_, { id }) => {
      return books.find((book) => book.id === id);
    },
  },
  Mutation: {
    create: (_, { id, title, author, publishedAt }) => {
      const book = { id, title, author, publishedAt };
      books.push(book);
      return book;
    },
    delete: (_, { id }) => {
      const filteredBooks = books.filter((book) => book.id !== id);
      books = filteredBooks;
      return true;
    },
    update: (_, { id, title, author, publishedAt }) => {
      const book = books.find((book) => book.id === id);
      book.id = book.id;
      book.title = title ? title : book.title;
      book.author = author ? author : book.author;
      book.publishedAt = publishedAt ? publishedAt : book.publishedAt;
      return book;
    },
  },
};

//CREATE SERVER
const app = new ApolloServer({ typeDefs, resolvers });
//RUN SERVER
app.listen().then(({ url }) => console.log(`Server running on ${url}`));
