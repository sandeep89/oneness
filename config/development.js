/*
	Default config file for sigularity app
*/

var config = {
	database:{
		name:"oneness",
		region: "us-west-2",
        endpoint: "http://localhost:8000",
        create:false
	},
	placeholder:{
		apiUrl:"http://jsonplaceholder.typicode.com"
	}
}

module.exports = config;