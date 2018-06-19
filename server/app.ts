import * as express from 'express';
import * as mongoose from 'mongoose';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/trainee')
	.then(db => {
	console.log('Connected to MongoDB');

	app.get('/*', function(req, res) {
		res.send('Hello World!');
	})
	
	if (!module.parent) {
		app.listen(3000, function() {
			console.log('App listening on port 3000.');
		})
	}
	})
	.catch(err => console.error(err));

export {app}