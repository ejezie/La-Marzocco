$(document).ready(function(){

        // $("#forgotPassword").click(async function(){
        //     var result = confirm( "Send new password to registered email?" );
        //     if ( result ) {
        //         await forgotPassword($("#email").val());
        //     }
        // });
        // $("#login").click(async function(){
        //     var email = $("#email").val();
        //     var password = $("#password").val();
            
        //         login(email,password,function(response){
        //             notifySuccess('Login Success');
        //             updateAccessToken(response.data.access_token);

        //             //redirect
        //         },
        //         function(error){
        //            notifyError('Login error');
        //         })

        // });

         $('#createItemWizard').smartWizard({
			 // onFinish:uploadProduct,
			 enableFinishButton:true,
		 });

	    $('.buttonNext').addClass('btn btn-success');
	    $('.buttonPrevious').addClass('btn btn-primary');
	    $('.buttonFinish').addClass('btn btn-default');

 		// $('#createItemWizard').smartWizard("loader", "show");
	    // populateGroup();
	    // populateFamily();
	    // populateType();
	    // populateParent();

	    // $('#createItemWizard').smartWizard("loader", "hide");

    });