
$(document).ready(function(){

if(window.location.href.includes("change-pass")){
 $(' a[href="#change-pass"]').tab('show');
}
getAddressesList(function(response){
			showAddressSlider(safeAccess(["data","addresses","data"],response));
	});


 $.fn.extend({
    trackChanges: function() {
      //this.off('change');
      this.removeData("changed");
      this.change(function() {
        // alert($(this).val())
        $(this).data("changed", $(this).val());
      });
    }
    ,
    getChanged: function() { 
      return this.data("changed"); 
    }
  });

	     $("#email").trackChanges();

	$("#updatePassword").click(function(){
		const currentPass = $("#currentPass").val(); 
		const newPass = $("#newPass").val(); 
		const newPassConfirm = $("#newPassConfirm").val(); 
		notifyInfo("Please wait");
		updatePassword(currentPass,newPass,newPassConfirm,function(){
			location.reload();
		})
	});



	$("#btSaveProfile").click(function(){
		const newName = $("#firstName").val(); 
		const newLastName = $("#lastName").val(); 
		notifyInfo("Please wait");
		updateProfile(newName,newLastName ,function(res){
			if(res.status==200){
				notifySuccess("Profile updated");
			}
		})
		      var newMail = $("#email").getChanged();
		      if(newMail){
		      	updateMail(newMail ,function(res){
						if(res.status==200){
				notifySuccess("Email updated");
			}
					})
		      }

	});

	getUserProfile(function(res){
		if(res.status == 200){
			 $("#firstName").val(safeAccess(["data","user","first_name"],res,"")); 
			 $("#lastName").val(safeAccess(["data","user","last_name"],res,"")); 
			 $("#email").val(safeAccess(["data","user","email"],res,"")); 
		}
	})
	
})


async function showAddressSlider(addArr){

	var addSliderHTML = ""

	for(i=0; i<addArr.length;i++){

		const address = addArr[i];

		addSliderHTML += '<div class="optionsecoptions" style="border:1px solid #ccc; ; width: initial;;font-size: 14px;width: 100%;">'
		addSliderHTML += ''+ address.address+''
		if(address.is_billable != 0){
			addSliderHTML += '<br>'
			addSliderHTML += '<label id="billingAddrCheckbox"  class="billingChk" value="'+address.id+'" ><label style="font-size:13px">Billing Address</label>'
		}
		if(address.is_shippable != 0){
			addSliderHTML += '<label id="shippingAddrCheckbox" class="shippingChk" value="'+address.id+'"  ><label style="font-size:13px">Shipping Address</label>'
		}
		addSliderHTML += '</div>'
	}

	$("#addressSlider").append(addSliderHTML)



	$(".billingChk").change(function()
      	{
          	$(".billingChk").prop('checked',false);
          	$(this).prop('checked',true);
      	}
    );


    $(".shippingChk").change(function()
      	{
          	$(".shippingChk").prop('checked',false);
          	$(this).prop('checked',true);
      	}
    );
}

$(".select_add").click(function() {
    $("button").each(function() {
           $(this).css("background-color", "#414141"); 
    });
   $(this).css("background-color", "#ae0000"); 
});


$( "#toggleModalAddAddress" ).click(function() {
	initAddAddress()
})