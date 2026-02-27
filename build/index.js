"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./config/app");
var dotenv_1 = require("dotenv");
var db_config_1 = __importDefault(require("./config/db.config"));
(0, dotenv_1.config)({ path: '.env.local' });
db_config_1.default.initialize()
    .then(function () {
    console.log('Data Source has been initialized!');
    (0, app_1.buildApp)().listen(process.env.PORT, function () { return console.log('Server started'); });
})
    .catch(function (err) {
    console.error('Error during Data Source initialization:', err);
});
