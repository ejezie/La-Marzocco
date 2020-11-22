$(document).ready(function(){
  $("#submitEnquiry").click(function(){

    var enquiryMessage = $("#enquiryMessage").val();
    if(enquiryMessage.trim() != ''){

      getUserProfile(function(profile_res){
              console.log("profile_res : " , profile_res)
        if(profile_res.status == 200){
             var fname = safeAccess(["data","user","first_name"],profile_res,"")
             var lname = safeAccess(["data","user","last_name"],profile_res,"")
             var email = safeAccess(["data","user","email"],profile_res,"")

             var message = "First Name : "+fname+" \nLast Name : "+lname+" \nEmail Id : "+email+" \nEnquiry : "+enquiryMessage
             console.log(message)

            sendEnquiryMail(message,function(res){

              console.log("res : " , res)
               
               if(res.data.status == true){
                notifySuccess("Enquiry Sent")
                $('#enquiryMessage').val('');
               }else{
                notifyError("Something went wrong")
               }
            })
        }
      })
    }else{
        notifyError("Enter valid message")
    }
  })
});




