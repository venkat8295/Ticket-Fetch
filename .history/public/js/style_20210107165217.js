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

		let pageNumber = 1
		console.log("companyData: 1")

		getAllCompanyData(apikey, subdomain, pageNumber).then(
			(companyData) => {
				$(".loading").hide()
				$("#step1").hide()

				displayTickets(companyData, apikey, subdomain)
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

const displayTickets = (companyData, apikey, subdomain) => {
	console.log("companyData:::", companyData.data.results.length)
	console.log("companyData:::", companyData.data.results[0])
	let status_check
	let appendData
	for (let i = 0; i < companyData.data.results.length; i++) {
		if (companyData.data.results[i].status == 2) {
			status_check = "Open"
		} else if (companyData.data.results[i].status == 3) {
			status_check = "Pending"
		} else if (companyData.data.results[i].status == 4) {
			status_check = "Resolve"
		} else if (companyData.data.results[i].status == 5) {
			status_check = "Closed"
		}
		getContact(companyData.data.results[i].requester_id, apikey, subdomain)
			.then((res) => {
				console.log("res::", res)
				appendData += `<div class="row top5 inner-end"><div class="flx">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                <h2> <b>${companyData.data.results[i].subject}</b></h2><br/>
                <h4><b> ${companyData.data.results[i].description_text}</b></h4><br/>
                <p><b>Ticket ID </b>: ${companyData.data.results[i].id}&nbsp &nbsp &nbsp<b>Name </b>: ${companyData.data.results[i].res}&nbsp &nbsp &nbsp<b>Status</b> : ${status_check}&nbsp &nbsp &nbsp<b>Type </b>: ${companyData.data.results[i].type}</p>
                </div>
                </div>
              </div>`
				$("#step2").append(appendData)
			})
			.catch((err) => {
				appendData += `<div class="row top5 inner-end"><div class="flx">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                <h2> <b>${companyData.data.results[i].subject}</b></h2><br/>
                <h4><b> ${companyData.data.results[i].description_text}</b></h4><br/>
                <p><b>Ticket ID </b>: ${companyData.data.results[i].id}&nbsp &nbsp &nbsp<b>Name </b>: Name Not Defined!&nbsp &nbsp &nbsp<b>Status</b> : ${status_check}&nbsp &nbsp &nbsp<b>Type </b>: ${companyData.data.results[i].type}</p>
                </div>
                </div>
              </div>`
				$("#step2").append(appendData)
			})
	}
}

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

function getContact(requester_id, apikey, subdomain) {
	return new Promise(function (resolve, reject) {
		let url = `https://${subdomain}.freshdesk.com/api/v2/agents/${requester_id}`
		let options = {
			headers: {
				Authorization: `Basic ${btoa(apikey)}`,
				"Content-Type": "application/json"
			}
		}
		axios.get(url, options).then(
			function (companyData) {
				// console.log("company", companyData)
				resolve(companyData.data.contact.name)
			},
			(error) => {
				reject("Error")
			}
		)
	})
}

function getContact(requester_id, apikey, subdomain) {
	return new Promise(function (resolve, reject) {
		let url = `https://${subdomain}.freshdesk.com/api/v2/contacts/${requester_id}`
		let options = {
			headers: {
				Authorization: `Basic ${btoa(apikey)}`,
				"Content-Type": "application/json"
			}
		}
		axios.get(url, options).then(
			function (companyData) {
				console.log("company", companyData)
				resolve(companyData.data.contact.name)
			},
			(error) => {
				reject("Error")
			}
		)
	})
}

function getAllCompanyData(apikey, subdomain, pageNumber) {
	return new Promise(function (resolve, reject) {
		console.log("companyData: 11")

		let url = `https://${subdomain}.freshdesk.com/api/v2/search/tickets?query="status:2"`
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
				resolve(companyData)
			},
			(error) => {
				reject("Error")
			}
		)
	})
}
