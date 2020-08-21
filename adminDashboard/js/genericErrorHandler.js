function errorResponseHandler(error) {
     // check for errorHandle config
     if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
         return Promise.reject(error);
     }

     // if9 has response show the error
     if (error.response) {
        if(error.response.status==401){
            window.location = 'login.html', true;
             // window.location.pathname   = "/login.html";
        }else if(error.response.message){
                if(typeof error.response.message === 'string' || error.response.message instanceof String){
                 notifyError(error.response.message);
                }else if(typeof error.response.message === 'object'){
                    for (var key of Object.keys(error.response.data.message)) {
                        notifyError(error.response.data.message[key][0]);
                    }
                }
            }else{
             notifyError("Something went wrong");
            }
        }else{
            notifyError("Please check your connection!");
      }
 }

// apply interceptor on response
axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);