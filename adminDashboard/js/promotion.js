async function showPromotion(promotionData){


	console.log("promotionHTML : ", promotionData)
	var promotionImages = promotionData.images.data

	$("#promotions_master").empty()

	var promotionHTML = ''

	promotionHTML += '<thead>'
	promotionHTML += '<tr class="headings">'
	promotionHTML += ''
	promotionHTML += '<th class="column-title">Promotion </th>'
	promotionHTML += '<th class="column-title">Activate </th>'
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
		promotionHTML += '<td class=" "><label class="switch">'
		promotionHTML += '<input type="checkbox" checked>'
		promotionHTML += '<span class="slider round"></span>'
		promotionHTML += '</label></td>'
		promotionHTML += '<td class=" last"><a href="">Click</a>'
		promotionHTML += '</td>'
		promotionHTML += '</tr>'
	}
	promotionHTML += '</tbody>'

	$("#promotions_master").append(promotionHTML)

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