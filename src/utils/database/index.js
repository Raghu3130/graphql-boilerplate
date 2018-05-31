
const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
	GraphQLObjectType
} = GraphQL;
import generateTypes from '../../libs/generateTypes';
import {map,get} from 'lodash'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

class database{
  constructor(){

  }

  addOneResolver(args){
    
    return new Promise((resolve,reject) =>{
      const id = get(args,'find.id');
      const data=[{
        id:1,
        name:"green",
        code:"#34433",
        preview:"dfdf"
      },
      {
        id:2,
        name:"red",
        code:"#333",
        preview:"dfdf"
      },
      {
        id:3,
        name:"blacl",
        code:"#344",
        preview:"dfdf"
      }
    ];
    map(data,i =>{
      
      if(i.id ==id){
        
        resolve(i);
      }
    })
    })
    

    
    
    
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
             return self.addOneResolver(args).then(res =>{
               
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

