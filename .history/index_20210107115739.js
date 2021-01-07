const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const chalk = require("chalk")
const mongoose_app = require("mongoose")
dotenv.config({ path: "./config/config.env" })
const db = require("./config/db")

const app = express()
const red = chalk.red.bold
const green = chalk.green.bold
const cyan = chalk.cyan.bold
const PORT = process.env.PORT
const env = process.env.NODE_ENV
