module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	var bodyParser = require('body-parser');
	var request = require('request');
	var helper = require('sendgrid').mail
	var sendgrid = require("sendgrid")("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");

	app.use(bodyParser.json())

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