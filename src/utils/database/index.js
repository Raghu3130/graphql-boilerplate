
const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
	GraphQLObjectType
} = GraphQL;



class database{
  constructor(){

  }

  addOneResolver(args){
    return "error";
  }

  queries(type, inputType, model) {
    console.log(model.schema);
    let schema = model.schema;
    let modelName = schema.name;
    return new GraphQLObjectType({
      name: [modelName, 'Database_query'].join(''),
      fields: {
        Addone:{
          type: new GraphQLList(schema),
          args: {
            subreddit: {
              type: GraphQLString,
              description: 'Please enter subreddit name',
            }
          },
          resolve(parent, args, context, info) {
            return this.addOneResolver(args);
          }
        },
        Add:{
          type: new GraphQLList(schema),
          args: {
            subreddit: {
              type: GraphQLString,
              description: 'Please enter subreddit name',
            }
          },
          resolve(parent, args, context, info) {
            return this.addOneResolver(args);
          }
        }
      }
    })
  };
  mutation(type, inputType, model) {
    let schema = model.schema;
    let modelName = schema.name;
    return new GraphQLObjectType({
      name: [modelName, 'Database_mutation'].join(''),
      fields: {
        Addone:{
          type: new GraphQLList(schema),
          args: {
            subreddit: {
              type: GraphQLString,
              description: 'Please enter subreddit name',
            }
          },
          resolve(parent, args, context, info) {
            return this.addOneResolver(args);
          }
        },
        Add:{
          type: new GraphQLList(schema),
          args: {
            subreddit: {
              type: GraphQLString,
              description: 'Please enter subreddit name',
            }
          },
          resolve(parent, args, context, info) {
            return this.addOneResolver(args);
          }
        }
      }
    })
  };

}

 export default database

