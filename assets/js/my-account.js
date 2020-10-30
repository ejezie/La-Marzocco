$(document).ready(function(){
	$("#updatePassword").click(function(){
		const currentPass = $("#currentPass").val(); 
		const newPass = $("#newPass").val(); 
		const newPassConfirm = $("#newPassConfirm").val(); 
		// notifyAlert("Please wait");
		updatePassword(currentPass,newPass,newPassConfirm,function(){
			location.reload();
		})
	})
})