'use strict';

const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
	GraphQLObjectType
} = GraphQL;

const Colortype = require('../schema');

// import the Post resolver we created
const ColorResolver = require('../../../graphql/resolvers/Color');
const queries=  new GraphQLObjectType({
		name: "task_mutation",
		fields: {
      Addone:{
				type: new GraphQLList(Colortype),
				args: {
					subreddit: {
						type: GraphQLString,
						description: 'Please enter subreddit name',
					}
				},
				resolve(parent, args, context, info) {
					return ColorResolver.addOne(args);
				}
			},
			Add:{
				type: new GraphQLList(Colortype),
				args: {
					subreddit: {
						type: GraphQLString,
						description: 'Please enter subreddit name',
					}
				},
				resolve(parent, args, context, info) {
					return ColorResolver.add(args);
				}
			}
		}
	})

;

 export default queries

