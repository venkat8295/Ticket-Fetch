$(".loading").hide()
$("#submit").click(() => {
	$("#submit").attr("disabled", true)
	apikey = $("#apikey").val()
	subdomain = $("#subdomain").val()

	if (apikey == "") {
		showNotify("step1", "alertFailure", "Please enter API key", false)
	} else if (subdomain == "") {
		showNotify("step1", "alertFailure", "Please enter Subdomain", false)
	} else {
		$("#step1").css({ opacity: 0.5 })
		$(".loading").show()

		let allCompanyData = []
		let pageNumber = 1
		console.log("companyData: 1")

		getAllCompanyData(apikey, subdomain, allCompanyData, pageNumber).then(
			(companyData) => {
				$(".loading").hide()
				$("#step1").hide()
				console.log("companyData: 2", companyData)

				console.log("companyData:", companyData)

				ajaxCall()
			},
			(err) => {
				console.log("companyData: 3")

				if (err.status == 401) {
					showNotify(
						"step1",
						"alertFailure",
						"Invalid API Key",
						false
					)
				} else if (err.status == 404) {
					showNotify(
						"step1",
						"alertFailure",
						"Invalid Subdomain",
						false
					)
				} else {
					showNotify(
						"step1",
						"alertFailure",
						"Timeout while processing the request. Please try again!",
						false
					)
				}
			}
		)
	}
})

const ajaxCall = () => {}

function showNotify(step, id, message, bool) {
	$(".loading").hide()
	$(`#${step}`).css({ opacity: 1 })

	if (step == "step1") {
		$("#next").attr("disabled", false)
	}

	$(`#${id}`).text(message).show()
	$(`#${id}`).delay(3000).fadeOut("slow")
	validation = bool
}

function getAllCompanyData(apikey, subdomain, allCompanyData, pageNumber) {
	return new Promise(function (resolve, reject) {
		console.log("companyData: 11")

		let url = `https://${subdomain}.freshdesk.com/api/v2/companies?per_page=100&page=${pageNumber}`
		let options = {
			headers: {
				Authorization: `Basic ${btoa(apikey)}`,
				"Content-Type": "application/json"
			}
		}
		console.log("companyData: 12")
		axios.get(url, options).then(
			function (companyData) {
				console.log("companyData: 13")
				let parsedData = JSON.parse(companyData.response)

				if (parsedData.length != 0) {
					pageNumber += 1
					Array.prototype.push.apply(allCompanyData, parsedData)

					getAllCompanyData(
						apikey,
						subdomain,
						allCompanyData,
						pageNumber
					).then(
						function () {
							resolve(allCompanyData)
						},
						function (error) {
							reject(error)
						}
					)
				} else {
					resolve(allCompanyData)
				}
			},
			(error) => {
				reject(error)
			}
		)
	})
}
