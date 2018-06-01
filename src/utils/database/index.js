
const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
	GraphQLObjectType
} = GraphQL;
import generateTypes from '../../libs/generateTypes';
import {map,get} from 'lodash'
import Database from './database'

class database{
  constructor(){

  }

  addOneResolver(datasource,args){
    return Database.one(datasource,args);
  }

  queries(type, inputType, model) {
    let self=this;
    let schema = model.schema;
    let modelName = schema.name;
    let inputtype=generateTypes(schema,'Find')
    return new GraphQLObjectType({
      name: [modelName, 'Database'].join(''),
      fields: {
        Addone:{
          type: schema,
          args: {
            find: {
              type: inputtype,
            }
          },
          resolve:(parent, args, context, info) => {
             return self.addOneResolver(schema.datasource,args).then(res =>{
               
               return res;
             })
          }
        },
        Add:{
          type: new GraphQLList(schema),
          args: {
            subreddit: {
              type: inputtype,
              description: 'Please enter subreddit name',
            }
          },
          resolve(parent, args, context, info) {
            return self.addOneResolver(args);
          }
        }
      }
    })
  };
  mutation(type, inputType, model) {
    let self=this;
    let schema = model.schema;
    let modelName = schema.name;
    return new GraphQLObjectType({
      name: [modelName, 'database_mutation'].join(''),
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
            return self.addOneResolver(args);
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
            return self.addOneResolver(args);
          }
        }
      }
    })
  };

}

 export default database

