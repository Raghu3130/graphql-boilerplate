
import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} from 'graphql';


const Product = new GraphQLObjectType({
	name: 'product',
	description: {collection: "product", //aka tableName
	timestamps: false,
	skip_deleted: true},

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the Product',
		},
		name: {
			type: GraphQLString,
			description: 'name of the Product',
		},
		categories: {
			type: GraphQLString,
			description: 'category of the product',
		},
		price: {
			type: GraphQLFloat,
			description: 'price of the product',
		},
		photo: {
			type: GraphQLString,
			description: 'photo of the product',
		},
		description: {
			type: GraphQLString,
			description: 'decription of the product',
		},
		_deleted: {
			type: GraphQLBoolean,
			description: 'decription of the product',
		},
		
	})

});


module.exports = Product;

