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
	let appendData
	appendData += `<div class="jumbotron">
    <h1>Authentication Entry Level Development!</h1>
    <p class="lead">FreshWorks Information!</p>
    <p><a class="btn btn-lg btn-default" href="https://www.spritle.com/" role="button" target="frame1">Go To Spritle Site!</a></p>
  </div>`
	appendData += `<div class="row">
  <div class="col-lg-4">
    <h2>General Information 1 <!--<button type="button" name="" id="check" class="btn btn-info view">Check</button>--></h2>
    <p>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.</p>
    <p><a class="btn btn-default" href="https://en.wikipedia.org/wiki/Main_Page" role="button" target="frame1">View details &raquo;</a></p>
  </div>
  <div class="col-lg-4">
    <h2>General Information 2</h2>
    <p>Node.js is an open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser.</p>
    <p><a class="btn btn-default" href="https://nodejs.org/en/about/" role="button" target="frame1">View details &raquo;</a></p>
  </div>
  <div class="col-lg-4">
    <h2>General Information 3</h2>
    <p>Stack Overflow is the largest, most trusted online community for developers to learn, share​ ​their programming ​knowledge, and build their careers.</p>
    <p><a class="btn btn-default" href="https://stackoverflow.com/" role="button" target="frame1">View details &raquo;</a></p>
  </div>
  </div>`
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
