$(".loading").hide()
$("#submit").click(() => {
	$("#submit").attr("disabled", true)
	apikey = $("#apikey").val()
	subdomain = $("#subdomain").val()

	if (apikey == "") {
		showNotify("step1", "alertFailure", "Please enter API key", false)
	} else if (subdomain == "") {
		showNotify("step1", "alertFailure", "Please enter Subdomain", false)
	}
})
function showNotify(step, id, message, bool) {
	$(".loading").hide()
	$(`#${step}`).css({ opacity: 1 })

	if (step == "step1") {
		$("#next").attr("disabled", false)
	} else {
		$("#step1").css({ opacity: 0.5 })
        $(".loading").show()
        
      let allCompanyData = [];
      let pageNumber = 1;

      getAllCompanyData(apikey, subdomain, allCompanyData, pageNumber).then(function (companyData) {
        $('.loading').hide();
        $('#step1').hide();
        $('#step2').show();
        companyResponse = companyData;

      }, function (err) {
        if (err.status == 401) {
          showNotify("step1", "alertFailure", "Invalid API Key", false);
        } else if (err.status == 404) {
          showNotify("step1", "alertFailure", "Invalid Subdomain", false);
        } else {
          showNotify("step1", "alertFailure", "Timeout while processing the request. Please try again!", false);
        }
      });
    }
	}

	$(`#${id}`).text(message).show()
	$(`#${id}`).delay(3000).fadeOut("slow")
	validation = bool
}
