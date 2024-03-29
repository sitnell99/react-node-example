const graphql = require('graphql');
const graphqlScalars = require('graphql-scalars');
const {GraphQLDate} = graphqlScalars;
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull} = graphql;

const SignUpType = new GraphQLObjectType({
    name: 'SignUpType',
    fields: () => ({
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        birthdate: {type: GraphQLDate},
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
    })
});

const LogInType = new GraphQLObjectType({
    name: 'LogInType',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        phone: {type: new GraphQLNonNull(GraphQLString)},
        firstname: {type: GraphQLString},
        lastname:{type: GraphQLString},
        birthdate: {type: GraphQLDate},
        token: {type: GraphQLString}
    })
});

const UserDataType = new GraphQLObjectType({
    name: 'UserDataType',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        firstname: {type: GraphQLString},
        lastname:{type: GraphQLString},
        birthdate: {type: GraphQLDate},
        phone: {type: GraphQLString},
        password: {type: GraphQLString},
        token: {type: GraphQLString}
    })
});

const GetUserDataType = new GraphQLObjectType({
    name: 'GetUserDataType',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        firstname: {type: GraphQLString},
        lastname:{type: GraphQLString},
        birthdate: {type: GraphQLDate},
        phone: {type: GraphQLString},
    })
});

const PostsType = new GraphQLObjectType({
    name: 'PostsType',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        authorId: {type: new GraphQLNonNull(GraphQLID)},
        authorName: {type: new GraphQLNonNull(GraphQLString)},
        published: {type: new GraphQLNonNull(GraphQLDate)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
    })
});

const NoteType = new GraphQLObjectType({
    name: 'NoteType',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        authorId: {type: new GraphQLNonNull(GraphQLID)},
        theme: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        category: {type: new GraphQLNonNull(GraphQLString)}
    })
});

const RemoveNoteType = new GraphQLObjectType({
    name: 'RemoveNoteType',
    fields: () => ({
        res: {type: GraphQLString}
    })
});

module.exports = { PostsType, UserDataType, LogInType, SignUpType, NoteType, GetUserDataType, RemoveNoteType };