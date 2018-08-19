const mongoose = require('mongoose');

class Mongo {
	constructor() {
		const mongoConfig = {
			"hosts": [
				"localhost:27017"
			],
			"database": "product-management",
			"username": "",
			"password": "",
			"debug": true,
			"replicaSet": undefined
		};
		this.uri = 'mongodb://';

		if (mongoConfig['username'] !== '' && mongoConfig['password'] !== '') {
			this.uri += `${mongoConfig['username']}:${mongoConfig['password']}@`;
		}

		this.uri += `${mongoConfig['hosts'].join(',')}/${mongoConfig['database']}`;

		if (mongoConfig['replicaSet'] !== '') {
			this.uri += `?replicaSet=${mongoConfig['replicaSet']}`;
		}

		const options = {
			autoIndex: false, // Don't build indexes
			reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
			reconnectInterval: 500, // Reconnect every 500ms
			poolSize: 10, // Maintain up to 10 socket connections
			// If not connected, return errors immediately rather than waiting for reconnect
			bufferMaxEntries: 0,
			useNewUrlParser: true,
			replicaSet: mongoConfig['replicaSet'],
			authSource: 'admin'
		};

		mongoose
			.connect(
				this.uri,
				options
			)
			.then(
				() => {
					console.info(`Worker connected to Mongo Database`);
					global.Mongoose = mongoose;
				},
				err => {
					console.error(`Worker failed connecting to Mongo Database: ${err}`);
				}
			);
	}
}

module.exports = Mongo;
