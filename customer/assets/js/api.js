var BASE_URL = "http://3.106.131.179/api/";

async function login(email,pass,onSuceess,onError){

	var data = new FormData();
	data.append('password', email);
	data.append('email', pass);

	var config = {
	  method: 'post',
	  url: BASE_URL+'auth/login',
	  headers: {'Content-Type': 'multipart/form-data' },
	  data : data
	};

	axios(config)
	.then(function (response) {
		if(response.data.status){
			onSuceess(response);
		}else{
			onError(null);
		}
	})
	.catch(function (error) {
	  	if (error.response) {
	  		onError(error);
	    } else if (error.request) {
	      	notifyError('Network issue');
	    } else {
	        notifyError('Unknown error');
	    }
	});


// 	try{

// 		var bodyFormData = new FormData();
// 		bodyFormData.set('email', email);
// 		bodyFormData.set('password', pass);

// 		var res =  await axios({
// 	    method: 'post',
// 	    url: BASE_URL+'auth/login',
// 	    data: bodyFormData,
// 	    headers: {'Content-Type': 'multipart/form-data' }
// 	    })

// 		return res;
// 	} catch (error) {
// 	    if (error.response) {
// 	    	notifyError('Login error '+error.response.status);
// 	    } else if (error.request) {
// 	      	notifyError('Network issue');
// 	    } else {
// 	        notifyError('Unknown error');
// 	    }
// 	    console.log(error);
// }
}

async function register(email,pass,fname,lname,city,state,role,country){
	var data = new FormData();
	data.append('email', '1331@gmail.com');
	data.append('password', '111111');
	data.append('first_name', 'testing');
	data.append('last_name', 'api');
	data.append('city_id', '1');
	data.append('state_id', '1');
	data.append('role_level_id', '5');
	data.append('country_id', '1');

	var config = {
	  method: 'post',
	  url: BASE_URL+'auth/register',
	  headers: {'Content-Type': 'multipart/form-data' },
	  data : data
	};

	axios(config)
	.then(function (response) {
	  console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
	  console.log(error);
	        notifyError('Registration failed');  
	});
}


async function forgotPassword(email){
	var data = new FormData();
	data.append('email', email);

	var config = {
	  method: 'post',
	  url: BASE_URL+'user/forgot-password',
	  headers: {'Content-Type': 'multipart/form-data' },
	  data : data
	};

	const loadingNotification = notifyInfo('Please wait');

	axios(config)
	.then(function (response) {
		dismiss(loadingNotification);
		if(response.data.status){
	      notifySuccess('New password is sent to your mail');  
		}else{
	      notifyError('Failed to change password');  
		}
	})
	.catch(function (error) {
	  console.log(error);
	    if (error.response) {
	    	notifyError('Unable to change password'+error.response.status);
	    } else if (error.request) {
	      	notifyError('Network issue');
	    } else {
	        notifyError('Unknown error');
	    }
	});

}