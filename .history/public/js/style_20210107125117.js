$(".loading").hide()
$("#submit").click(() => {
	$("#next").attr("disabled", true)
	apikey = $("#apikey").val()
	subdomain = $("#subdomain").val()
})
