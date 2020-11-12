var KEY_ACCESS_TOKEN = "accessToken";
var KEY_ADMIN_MANAGED_USER = "adminManagedUser";

function updateAPIToken(token){
	localStorage.setItem(KEY_ACCESS_TOKEN,"Bearer "+ token);
}

function setCurrentManagedUser(userid){
	localStorage.setItem(KEY_ADMIN_MANAGED_USER,userid);
}

function getAPIToken(){
	return 	localStorage.getItem(KEY_ACCESS_TOKEN);
}

function getManagedUser(){
	var managedUser = localStorage.getItem(KEY_ADMIN_MANAGED_USER);
	if(managedUser){
		return 	parseInt(managedUser);
	}

}