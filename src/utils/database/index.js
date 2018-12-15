
const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} = GraphQL;
import generateTypes from '../../libs/generateTypes';
import {map,get} from 'lodash'
import Database from './database'


class database{
  constructor(){

  }
  

  oneResolver(schema,inputType){
    return {
      type: schema,
      args: {
        find: {
          type: inputType,
        }
      },
      resolve:(parent, args, context, info) => {
        return Database.one(schema.description,args).then(res =>{
           return res;
         })
      }
    }
    
  }
  allResolver(schema,inputType){
    return {
      type:  new GraphQLList(schema),
      args: {
        find: {
          type: inputType,
        }
      },
      resolve:(parent, args, context, info) => {
        return Database.all(schema.description,args).then(res =>{
           return res;
         })
      }
    }
  }
  countResolver(schema,inputType){
    return {
      type: GraphQLInt,
      args: {
        find: {
          type: inputType,
        }
      },
      resolve:(parent, args, context, info) => {
        return Database.count(schema.description,args).then(res =>{
           return res['count(*)']
         })
      }
    }
  }
  addResolvser(schema,inputType){
    return {
      type: schema,
      args: {
        input: {
          type: inputType,
        }
      },
      resolve:(parent, args, context, info) => {
        let input = args.input;
          return Database.create(schema.description,input).then(res =>{
            return res;
          })
      }
    }
  }

  updateResolvser(schema,inputType,Findtype){
    return {
      type: GraphQLBoolean,
      args: {
        find: {
          type: Findtype,
        },
        input: {
          type: inputType,
        }
      },
      resolve:(parent, args, context, info) => {
        let {input,find} = args;
          return Database.update(schema.description,find,input,args).then(res =>{
            return res;
          })
      }
    }
  }
  addManyResolvser(schema,inputType){
    return {
      type: GraphQLInt,
      args: {
        input: {
          type:new GraphQLList(inputType),
        }
      },
      resolve:(parent, args, context, info) => {
        let input = args.input;
        return Database.createMany(schema.description,input).then(res =>{
          console.log("sdsd",res);
           return res;
         })
      }
    }
  }
 deleteResolver(schema,inputType,Findtype){
    return {
      type: GraphQLBoolean,
      args: {
        find: {
          type: Findtype,
        }
      },
      resolve:(parent, args, context, info) => {
        let find = args.find;
        return Database.delete(schema.description,find).then(res =>{
           return res;
         })
      }
    }
  }
  destroyResolver(schema,inputType,Findtype){
    return {
      type: GraphQLBoolean,
      args: {
        find: {
          type: Findtype,
        }
      },
      resolve:(parent, args, context, info) => {
        let find = args.find;
        return Database.destroy(schema.description,find).then(res =>{
           return res;
         })
      }
    }
  }

  queries(type, inputType, model) {
    let self=this;
    let schema = model.schema;
    let modelName = schema.name;
    let findType=generateTypes(schema,'FindQuery');

    return new GraphQLObjectType({
      name: [modelName, '_database_query'].join(''),
      fields: {
        one:this.oneResolver(schema,findType),
        all:this.allResolver(schema,findType),
        count:this.countResolver(schema,findType)
      }
    })
  };
  mutation(type, inputType, model) {
    let self=this;
    let schema = model.schema;
    let modelName = schema.name;
    let inputtype=generateTypes(schema,'Input');
    let Findtype=generateTypes(schema,'FindMutate');

    return new GraphQLObjectType({
      name: [modelName, '_database_mutation'].join(''),
      fields: {
        create:this.addResolvser(schema,inputtype),
        createMany:this.addManyResolvser(schema,inputtype),
        delete:this.deleteResolver(schema,inputtype,Findtype),
        destroy:this.destroyResolver(schema,inputtype,Findtype),
        update:this.updateResolvser(schema,inputtype,Findtype)
      }
    })
  };

}

 export default database

