var months = {
		'January' : 1,
		'February' : 2,
		'March' : 3,
		'April' : 4,
		'May' : 5,
		'June' : 6,
		'July' : 7,
		'August' : 8,
		'September' : 9,
		'October' : 10,
		'November' : 11,
		'December' : 12
	}


function val2key(val,array){
    for (var key in array) {
        if(array[key] == val){
            return key;
        }
    }
 return false;
}

async function showNewsletter(newsletterData){

	console.log(" Month name : ",val2key(2,months))

	var newsletterHTML = ''
	$("#newsletter").empty()

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


		console.log("newsletter : ", newsletter)
		newsletterHTML += '<tr>'
		newsletterHTML += '<td><article class="media event"><a class="pull-left date"><p class="month">'+(val2key(newsletter[i]["month"],months)).substring(0,3)+'</p><p class="month">'+newsletter[i]["year"]+'</p></a>'
		newsletterHTML += '<div class="media-body"><p>Newsletter : '+val2key(newsletter[i]["month"],months)+' '+newsletter[i]["year"]+' Update</p><a class="title" href="'+newsletter[i]["name"]+'">PDF</a></div></article></td>'
		newsletterHTML += '<td><button type="button" class="btn btn-default btn-sm deactivateBtn" id="'+newsletter[i]["id"]+'"><span class="fa fa-times-circle"></span></button></td>'
		newsletterHTML += '<td><button type="button" class="btn btn-default btn-sm deleteBtn" id="'+newsletter[i]["id"]+'"><span class="glyphicon glyphicon-trash"></span></button></td>'

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




	$('.deactivateBtn').click(function () {
		var id = this.id	

      	var onResponse = function(response){
        	if(response.data.newsletter){
            	notifySuccess("Success!");
        	}else{
            	notifyError(response.data.message);
        	}
      	};
      	var onError =function(error){
        	notifyError("Failed to upload file");
      	};

      	deactivateNewsletter(id,onResponse,onError)
	});



	$('.deleteBtn').click(function () {
		var id = this.id	

      	var onResponse = function(response){
        	if(response.data.newsletter){
            	notifySuccess("Success!");
        	}else{
            	notifyError(response.data.message);
        	}
      	};
      	var onError =function(error){
        	notifyError("Failed to upload file");
      	};

      	deleteNewsletter(id,onResponse,onError)
	});
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

      console.log("pdf : ",pdf.files[0])
      var onError =function(error){
        notifyError("Failed to upload file");
      };
      var onResponse = function(response){
        $('#UploadNewsletterModal').modal('hide');
        if(response.data.newsletter){

            notifySuccess("File uploaded!");

            getNewsletter(function(response){
				showNewsletter(response.data)
			},onError);
        }else{
            notifyError(response.data.message);
        }
      };


    var months = {
		'January' : 1,
		'February' : 2,
		'March' : 3,
		'April' : 4,
		'May' : 5,
		'June' : 6,
		'July' : 7,
		'August' : 8,
		'September' : 9,
		'October' : 10,
		'November' : 11,
		'December' : 12
	}

	var selectedMonth = $('#month').val()
	var selectedMonthNo = months[selectedMonth]
	var currentYear = $('#currentYear').val()

	if(selectedMonthNo > 0){
		if(pdf.files[0] != undefined){

      		uploadNewsletter(onResponse,onError,selectedMonthNo,currentYear, pdf.files[0]);
		}else{
			alert("Upload valid File")
			return false
		}	

	}else{
		alert("Select valid month")
		return false
	}



});



$('#addNewsletter').click(function () {
	var d = new Date();
  	var n = d.getFullYear();
	$("#currentYear").val(n);


	var onResponse = function(response){
		var newsletterList = response.data.newsletters.data

		var assignedMonth = []
		var monthList = [1,2,3,4,5,6,7,8,9,10,11,12]

		for(i=0;i<newsletterList.length;i++){
			assignedMonth.push(newsletterList[i]["month"])
			var filtered = monthList.filter(function(value, index, arr){ return value != newsletterList[i]["month"];})
		}

		
  	};

  	var onError =function(error){
        notifyError("Failed to upload file");
  	};

	getNewsletter(onResponse,onError)

	// console.log("listOfNewsletter : ", listOfNewsletter)

})


