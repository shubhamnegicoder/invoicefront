/**
 * @file(config.dev.js) With all variables that is need on whole project
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 *
 */
import path from "path";

let config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || '127.0.0.1';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'invoice';
config.serverPort = process.env.serverPort || 8080;

export default config;