const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const mongoose_app = require("mongoose")
dotenv.config({ path: "./config/config.env" })
const db = require("./config/db")

const app = express()
