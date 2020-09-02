var KEY_ACCESS_TOKEN = "accessToken";

function updateAccessToken(token){
	localStorage.setItem(KEY_ACCESS_TOKEN, token);
}

function getAccessToken(){
	return 	localStorage.getItem(KEY_ACCESS_TOKEN);
}