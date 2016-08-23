var generateUUID = function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
    		var r = (d + Math.random()*16)%16 | 0;
    		d = Math.floor(d/16);
    		return (c=='x' ? r : (r&0x7|0x8)).toString(16);
		});
		return uuid.toUpperCase();
}

var BASE_URL = "http://localhost:8080/"
var SEND_EMAIL_URL = BASE_URL + "send-invite"
var PARSE_DOC_URL = BASE_URL + "parse-stories-doc"
