$(document).ready(function(){
  $("#submitEnquiry").click(function(){

    var enquiryMessage = $("#enquiryMessage").val();
    alert(enquiryMessage)
    if(enquiryMessage.trim() != ''){

      sendEnquiryMail(enquiryMessage,function(res){
         
         if(res){
          notifySuccess("Enquiry Sent")
         }else{
          notifyError("Something went wrong")
         }
      })
    }else{
        notifyError("Enter valid message")
    }
  })
});




