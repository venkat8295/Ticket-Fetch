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

				displayTickets(companyData)
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

const displayTickets = (companyData) => {
	console.log("companyData:::", companyData.data.results.length)
	console.log("companyData:::", companyData.data.results[0])
	let status_check
	let appendData
	appendData += `<div class="jumbotron">
    <h1>Authentication Entry Level Development!</h1>
    <p class="lead">FreshWorks Information!</p>
    <p><a class="btn btn-lg btn-default" href="https://www.spritle.com/" role="button" target="frame1">Go To Spritle Site!</a></p>
  </div>`

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
		appendData += `<div class="row top5"><div class="flx">
        <div class="col-sm-3"></div>
        <div class="col-sm-6 inner-end">
        <h2>Ticket Information ${i} </h2>
        <p><b>Subject</b> : ${companyData.data.results[i].subject}</p>
        <p><b>Description Text</b> : ${companyData.data.results[i].description_text}</p>
        <p><b>Ticket ID </b>: ${companyData.data.results[i].id}</p>
        <p><b>Requester ID </b>: ${companyData.data.results[i].requester_id}</p>
        <p><b>Status</b> : ${status_check}</p>
        <p><b>Type </b>: ${companyData.data.results[i].type}</p>
        </div>
        </div>
      </div>`
	}
	$("#step2").append(appendData)
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
