async function showNewsletter(newsletterData){

	var newsletterHTML = ''

	var newsletter = newsletterData.newsletters.data

	newsletterHTML += '<thead>'
	newsletterHTML += '<tr>'
	newsletterHTML += '<th>Name</th>'
	newsletterHTML += '<th>Deactivate</th>'
	newsletterHTML += '<th>Archive</th>'
	newsletterHTML += '</tr>'
	newsletterHTML += '</thead>'
	newsletterHTML += ''
	newsletterHTML += ''
	newsletterHTML += '<tbody>'

	for(i=0; i< newsletter.length; i++){
		newsletterHTML += '<tr>'
		newsletterHTML += '<td><article class="media event"><a class="pull-left date"><p class="month">Jan</p><p class="month">2020</p></a>'
		newsletterHTML += '<div class="media-body"><p>Newsletter : Jan 2020 Update</p><a class="title" href="'+newsletter[i]["name"]+'">PDF</a></div></article></td>'
		newsletterHTML += '<td><button type="button" class="btn btn-default btn-sm" id="deactivateBtn"><span class="glyphicon glyphicon-edit"></span></button></td>'
		newsletterHTML += '<td><button type="button" class="btn btn-default btn-sm" id="archiveBtn"><span class="glyphicon glyphicon-trash"></span></button></td>'

		newsletterHTML += '</tr>'
	}
	newsletterHTML += '</tbody>'

	// for(i=0; i< newsletter.length; i++){

	// 	newsletterHTML += '<article class="media event">'
	// 	newsletterHTML += '<a class="pull-left date">'
	// 	newsletterHTML += '<p class="month">Jan</p>'
	// 	newsletterHTML += '<p class="month">2020</p>'
	// 	newsletterHTML += '</a>'
	// 	newsletterHTML += '<div class="media-body">'
	// 	newsletterHTML += '<p>Newsletter : Jan 2020 Update</p>'
	// 	// newsletterHTML += '<a class="title" href="https://www.careerpower.in/2020/The-Hindu-Review-June-2020.pdf">PDF</a>'
	// 	newsletterHTML += '<a class="title" href="'+newsletter[i]["name"]+'">PDF</a>'
	// 	newsletterHTML += '</div>'
	// 	newsletterHTML += '</article>'
	// 	newsletterHTML += '<br/ >'
	// }

	$("#newsletter").append(newsletterHTML)
}





$(document).ready(function(){

	var onError =function(error){
		// notifyError("Failed to");
	};


	getNewsletter(function(response){
		showNewsletter(response.data)
	},onError);


});





$('#uploadNewsletter').click(function () {
      var pdf = document.querySelector('#pdffile');
      var onResponse = function(response){
        $('#UploadNewsletterModal').modal('hide');
        if(response.data.newsletter){

            notifySuccess("File uploaded!");
        }else{
            notifyError(response.data.message);
        }
      };
      var onError =function(error){
        notifyError("Failed to upload file");
      };
      uploadNewsletter(onResponse,onError, pdf.files[0]);
});


$('#deactivateBtn').click(function () {

	alert("thi")
      // var onResponse = function(response){
      //   if(response.data.newsletter){
      //       notifySuccess("Success!");
      //   }else{
      //       notifyError(response.data.message);
      //   }
      // };
      // var onError =function(error){
      //   notifyError("Failed to upload file");
      // };

      // deactivateNewsletter(id,onResponse,onError)
});