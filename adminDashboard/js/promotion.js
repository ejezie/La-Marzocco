async function showPromotion(promotionData){


	console.log("promotionHTML : ", promotionData)
	var promotionImages = promotionData.images.data

	$("#promotions_master").empty()

	var promotionHTML = ''

	promotionHTML += '<thead>'
	promotionHTML += '<tr class="headings">'
	promotionHTML += ''
	promotionHTML += '<th class="column-title">Promotion </th>'
	promotionHTML += '<th class="column-title">Deactivate </th>'
	promotionHTML += '<th class="column-title">Delete </th>'
	promotionHTML += ''
	promotionHTML += '</th>'
	promotionHTML += ''
	promotionHTML += '</tr>'
	promotionHTML += '</thead>'
	promotionHTML += ''
	promotionHTML += '<tbody>'

	for(i=0; i< promotionImages.length; i++){

		promotionHTML += '<tr class="even pointer">'
		promotionHTML += ''
		promotionHTML += '<td class=" "><img src="'+promotionImages[i]["image"]["name"]+'"></td>'
		promotionHTML += '<td><button type="button" class="btn btn-default btn-sm deactivateBtn" id="'+promotionImages[i]["id"]+'"><span class="fa fa-times-circle"></span></button></td>'
		promotionHTML += '<td><button type="button" class="btn btn-default btn-sm deleteBtn" id="'+promotionImages[i]["id"]+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
		promotionHTML += '</td>'
		promotionHTML += '</tr>'
	}
	promotionHTML += '</tbody>'

	$("#promotions_master").append(promotionHTML)



	$('.deactivateBtn').click(async function () {
		var id = this.id	

      	var onResponse = function(response){
      		console.log("response : ", response)
        	if(response.data.image){
            	notifySuccess("Promotion Image Deactivated Successfully");
        	}else{
            	notifyError(response.data.message);
        	}
      	};
      	var onError =function(error){
        	notifyError("Failed to upload file");
      	};

      	deactivatePromotion(id,onResponse,onError)

	});



	$('.deleteBtn').click(async function () {
		var id = this.id	

      	var onResponse = function(response){
      		console.log("response : ",response)
        	if(response.data.status == true){
            	notifySuccess(response.data.message);
        	}else{
            	notifyError(response.data.message);
        	}
      	};
      	var onError =function(error){
        	notifyError("Failed to upload file");
      	};

      	deletePromotion(id,onResponse,onError)

      	getPromotion(function(response){
			showPromotion(response.data)
		},onError);
	});

}




$(document).ready(function(){

	var onError =function(error){
		// notifyError("Failed to");
	};

	getPromotion(function(response){
		showPromotion(response.data)
	},onError);

});



$('#uploadPromotion').click(async function () {
      var pdf = document.querySelector('#promotions_file');
      var onResponse = function(response){
        $('#UploadPromotionModal').modal('hide');
        console.log("response : ", response)
        if(response.data.image){

            notifySuccess("File uploaded!");
			// window.location.reload();
			var onError =function(error){
			// notifyError("Failed to");
			};

			getPromotion(function(response){
				showPromotion(response.data)
			},onError);
        }else{
            notifyError(response.data.message);
        }
      };
      var onError =function(error){
        notifyError("Failed to upload file");
      };
      uploadPromotion(onResponse,onError, pdf.files[0]);



});