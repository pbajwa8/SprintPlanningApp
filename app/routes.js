module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	var bodyParser = require('body-parser');
	var request = require('request');
	var helper = require('sendgrid').mail
	var sendgrid = require("sendgrid")("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");
	var XLSX = require("xlsx");
	var multiparty = require('connect-multiparty')

	app.use(bodyParser.json())

	var multipartyMiddleware = multiparty()
	
	app.post('/parse-stories-doc', multipartyMiddleware, function (req, res) {
		var file = req.files.file
		var workbook = XLSX.readFile(file.path)
		var worksheet = workbook.Sheets[workbook.SheetNames[0]]
		var storiesArray = XLSX.utils.sheet_to_json(worksheet)

		for (i in storiesArray) {
			var story = storiesArray[i]
			story["Status"] = "created"
		}

		res.send(storiesArray)
	});

	app.post('/send-invite', function (req, res) {
		data = req.body
		from_email = new helper.Email("parambirb@gmail.com")
  		to_email = new helper.Email(data.email)
  		subject = "Planning Meeting Request"
  		content = new helper.Content("text/plain", data.url)
  		mail = new helper.Mail(from_email, subject, to_email, content)

  		var requestBody = mail.toJSON()
  		var request = sendgrid.emptyRequest()
  		request.method = 'POST'
  		request.path = '/v3/mail/send'
  		request.body = requestBody
  		sendgrid.API(request, function (response) {
  			res.send(response)
  		})
	});
     
	// frontend routes =========================================================
	// route to handle all angular requests

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};