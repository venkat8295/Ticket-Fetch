const express = require("express")
const router = express.Router()

router
	.route("/")
	.get()
	.post((req, res) => {})

module.exports = router
