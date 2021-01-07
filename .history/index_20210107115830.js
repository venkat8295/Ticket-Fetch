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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public", express.static("public"))
app.use("/", require("./controllers/home"))
app.set("port", PORT || 5000)

//For avoidong Heroku $PORT error
app.get("/", function (req, res) {
	var result = "App is running"
	res.send(result)
}).listen(app.get("port"), function () {
	console.log(
		+`${green("✓")} ${cyan(
			` App is running at port ${PORT} in ${env} mode.`
		)}`,
		app.get("port")
	)
})

process.on("unhandledRejection", (reason, p) => {
	throw reason
})

process.on("uncaughtException", (error) => {
	console.log(red("Uncaught Exception ✗", error))

	process.exit(1)
})
