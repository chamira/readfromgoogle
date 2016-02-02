
var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);
return;

var argvs = process.argv.slice(2);
console.dir(argvs);
if (argvs.length != 3) {
	console.error("Must pass 3 params(Google Spreadsheet Key, Device type and language) in correct order");
	return;
}

var googleSheetKey = argvs[0];
var type = argvs[1].toLowerCase();
var language = argvs[2];

if (type != "ios" && type != "android") {
	console.log("Type of the OS family not known, (Only supported iOS and Android)");
	return;
}

//var googleSheetKey = "13_M0AbgTKyS3_BDOGP1r0d9pEWOmhX_nfJlEylGtN8g";
var GoogleSpreadsheet = require("google-spreadsheet");

var mySheet = new GoogleSpreadsheet(googleSheetKey);

var creds = {
    client_email: 'readinggoolespreadsheets@read-docs-1203.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSchD2CVt8ssWn\niXoL4KPwMFkdUOWiU2Rk3fMz2kwom3NIthLmuFnMwM4ede0q++AjOITWcJx0bfoT\n3aHBgxQOGnzP1mk7T18ez+S2/nFx5mhD7lletl8dAYuQJImMginldhypYzkvDicq\nTyyd8qxAapSnEZ9hdIIHNA7Coas25bhkLtN3gLoSrwU1X6kJ+rMA2tTWs8ugbW72\ny37iq27W7Qi0IJmpAIdZAUNozOeDrLCUQJVWCe7dhtZp3pmqdaQW+sHyAJJStm52\nffG1V+67v0wPgwRDzXbvLrkHKeUSmleKvh84uUqPOeSB4iHb2oNhZqSuZDk/H5PI\nsujUBeI/AgMBAAECggEAMU/fjjmQaOj5zXRpeF5oVZSyLUD0UjiqcZybLDaxtmrB\n4xYMP0yMUHoL7g3fkr3Ft5ZshJje1gXCU7YppbOxqR4aMRIN1T7g1MtERKphIO1o\n5pb32QCn/mhqylrDRmD+IponBJK4yrOFVKXcbEMu5XH+JFO2y2Yj8rEA12EA+jbV\nYeVsNCaeXpcNZv7QsKrJM1MSeHeMFvH0m+7oNRb3xV9JneAj6qatMcusG/+a1eyv\nxBzGs64LfkejDvSOfdWMlNVCVHJQYLekFi0s4rnGR4Pd2Bm/qMRkOVbw5Wm5QBSQ\nctIW7wJcdY1eDV1KOdOgWQmaITn6hw6rAAJLT2LqoQKBgQDVTOronlrLlIKILIgt\nltpd5UHSHgj2g4sO7Ej4y+bNqUeT9uMzW+4XFvclX4zRqjHZGk9EYoPtNkPwCaQ2\nn+KnmbWDBEUgOpvL+GS5IRKVcG/UcRJOo3yUlCsVISDXxTttzGmTkc6t3dvSvt8e\nFJf/3SSgWlaCFISERJ7M8uZARQKBgQCvwwNZCOjWWYvMW7aWOszhQ4vzaf4SPeYX\nrao+BtC7BTHVeVVSgFzSn/J6Aj83nMqiMpHtaeLptMY/n5JBayLluYZ/LPiATe4g\nOJLaA1OVI0l3M6ClQ3cD4lUMw1e4CnAfQI0iuWp0sf7zJrDjTqOzZVTdpINwt1RG\nDb0FK1dKswKBgD2Cf99zAvXgLsA8L00OSox3N0LzfFwyVOCJzQVKL5WxMj3+HUjL\nQt6PtdemNUKlFNjpmGA9FJRMaM0Iyr0h4Ee6sLhGe/SuUg1A5TLp0aUclnMp5ECf\nLqbeD4p5UjJG4ztnji6LBpHm/6RHfKn9AFQ9nnlLc9TxO8G01CKADVwNAoGAB7wJ\nNa3SsTwXjtKqYkoMIg2a5wdPCvZ2XaxixX//R3ufCcnhG1RSwWIQhZX7ujLIKAMZ\nsNzsA2TVJI+dHAve6UUUyhvsg5jqVbinnbhvwSxgW0KGWz9wyVb4bytZfNvYu0dX\n7qNCMAh1M7YMKrSXN5nJ9kb7Eca/iqWoH8YcfUkCgYEApkKSdgirvCXUlNCQirnF\nGr34XgUKQK/tUbh1PdW3RSNwSx5Q5BDRDh6HriEAPrIDvaJ0pk+qzOe2nIT9YUtA\nyZ/gQvJoC7tcod0RzXG8Qz4Db4lTWuW8mZYfNSJ/a7iRKK9PidPyxW91LDj5DIzR\nCjg4TexaS1fF75n50KTxlQM=\n-----END PRIVATE KEY-----\n'
}

mySheet.useServiceAccountAuth(creds, function(err){

	if (err) {
		console.error(err.message);
	} else {
		console.log("No errors, should load data");
		
		mySheet.getRows( 1, function(err, row_data){

	        if (err){
	            console.log(err);
	        } else {
	            
	            console.log('pulled in ' + row_data.length + ' rows');
	            var size = row_data.length;
	            var enString="";
	            if (type == "android") {
	            	enString ="<resources>";
	            }
	            for (var i=0;i<size;i++) {
	                var rowObject = row_data[i];
	                var baseString = rowObject["base"];
	                var space="";
	                if (i>0){
	                    space="\n";
	                }
	                var lang = rowObject[language];
	                if (lang.length == 0){
	                    lang="";
	                }
	                
	                if (type == "ios") {
	                	enString = enString+space+"\""+baseString+"\"="+"\""+lang+"\";";
	                } else {
	                
	                	enString = enString +
	                				"\n<string name=\""+baseString+"\">"+lang+"</string>";
	                }
	                
	                //console.log(rowObject);
	                //var noString = "\""+baseString+"\"="+"\""+rowObject["no"]+"\"";

	            }

	           	if (type == "android") {
	            	enString = enString+
	            				"\n</resources>";
	            }

	            console.log(enString);
	            //writeToFile(language,type,enString);

        	}	

    	});

	}

})

function writeToFile(fileName,type,content) {

	var fs = require('fs');
	var type = type == "ios" ? "iOS/" : "Android/";
	var dir = "languages/" + type + fileName +".txt";
	//console.log(dir);

	fs.writeFile(dir, content, function(err) {
    	
    	if(err) {
        	return console.log(err);
    	}

    	console.log("The file was saved at " + dir);

}); 

}