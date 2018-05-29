'use strict';
import query from './queries';
import models from '../models'
import {
	GraphQLObjectType,
	GraphQLSchema,
} from 'graphql';

let modelQueryObjects = {};
for (let util of Object.keys(query)) {
	let utilQueryType = query[util];
	if (utilQueryType) {
		modelQueryObjects[util] = {
			type: utilQueryType,
			resolve: () => true
		}
	}
}

const queries = new GraphQLObjectType({
	name:  'Queries',
	fields: modelQueryObjects
});


// export the schema
module.exports =  new GraphQLSchema({
	query: queries
});

