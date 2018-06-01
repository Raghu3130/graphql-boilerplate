import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

// let's import the schema file we just created
import  schemagen from './src/schemagen';
let schema = new  schemagen();
const app = express();
  
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema.generate() }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// app.get('/*', function (req, res) {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// let's set the port on which the server will run
app.set( 'port', 1337 );
// start the server
app.listen(
	app.get('port'),
	() => {
		const port = app.get('port');
		console.log('GraphQL Server Running at http://127.0.0.1:' + port );
	}
);

