const express = require("express")
const router = express.Router()

router
	.route("/")
	.get()
	.post((req, res) => {
		console.log("req|Body:", req.body)
	})

module.exports = router
