var KEY_ACCESS_TOKEN = "accessToken";

function updateAPIToken(token){
	localStorage.setItem(KEY_ACCESS_TOKEN, token);
}

function getAPIToken(){
	// return 	localStorage.getItem(KEY_ACCESS_TOKEN);
	return 	"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8zLjEwNi4xMzEuMTc5XC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTk3Mzg3NzQ0LCJleHAiOjE1OTc0NzQxNDQsIm5iZiI6MTU5NzM4Nzc0NCwianRpIjoiSHBZd2N2MXJvYkRLb1ptaCIsInN1YiI6NTgsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.XexywrYHYXT15woCKrwz1envHoPhyeP2Lfy1YREQTB8";
}