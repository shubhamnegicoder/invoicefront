/**
 * @file(config.dev.js) With all variables that is need on whole project
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */
import path from "path";

let config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'iot_server_app';
config.serverPort = process.env.serverPort || 8080;
config.superAdminLoginDetails = {
	emailId:"superAdmin@limitlessmobile.com",
	password:"limitless@123",
	module:[
		{              
	        name:"Asset", 
	        permission:["GET","POST", "PUT", "DELETE"] 
	    },
	    {              
	        name:"Device", 
	        permission:["GET","POST", "PUT", "DELETE"] 
    	},
    	{              
	        name:"Customer", 
	        permission:["GET","POST", "PUT", "DELETE"] 
    	}	,
	    {              
	        name:"User", 
	        permission:["GET","POST", "PUT", "DELETE"] 
	    }
    ],
}
export default config;