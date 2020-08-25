var KEY_ACCESS_TOKEN = "accessToken";

function updateAPIToken(token){
	localStorage.setItem(KEY_ACCESS_TOKEN,"Bearer "+ token);
	alert("new token "+getAPIToken());
}

function getAPIToken(){
		alert("retrn token "+localStorage.getItem(KEY_ACCESS_TOKEN));

	return 	localStorage.getItem(KEY_ACCESS_TOKEN);
	// return 	"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8zLjEwNi4xMzEuMTc5XC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTk3OTI4MDM2LCJleHAiOjE1OTgwMTQ0MzYsIm5iZiI6MTU5NzkyODAzNiwianRpIjoibDEzOVVnWGIyZW4yWVNNNiIsInN1YiI6NTksInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.we8Q3iqtAyP_WzUb8z3le1t9_kTZJVDwu-eYtaROnYQ";
}