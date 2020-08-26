function errorResponseHandler(error) {
     // check for errorHandle config
     if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
         return Promise.reject(error);
     }

     // if9 has response show the error
     if (error.response) {
        if(error.response.status==401){
            window.location = '/login.html', true;
             // window.location.pathname   = "/login.html";
        }else if(error.response.data.message){
                if(typeof error.response.data.message === 'string' || error.response.data.message instanceof String){
                    notifyError(error.response.data.message);
                }else if(typeof error.response.data.message === 'object'){
                    var longMessage="";
                    var duration = 1000;
                    for (var key of Object.keys(error.response.data.message)) {
                        longMessage+=(error.response.data.message[key][0]);
                        longMessage+="\n\n";
                        duration += 3000;
                    }

                    new Notyf(
                    // {
                    //     position: {
                    //     x: 'center',
                    //     y: 'top',
                    //   }
                    // }
                    ).error({
                      message: longMessage,
                      duration: duration,
                      icon: false,
                      dismissible: true
                    })
                }
            }else{
             notifyError("Something went wrong...");
            }
        }else{
            notifyError("Please check your connection!");
      }

        return Promise.reject(error);
 }

// apply interceptor on response
axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);