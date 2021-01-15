
async function showTrainingEnquiry(enquiryList){

	var enquiryList = enquiryList.filter(function(enquiry){return enquiry.request_type == 1;});

	console.log(" enquiryList : ",enquiryList)



	trainingTable = $('#trainingTable').DataTable( {
      dom: 'Blfrtip',
      autoWidth: false,
      buttons: [
          ],
      destroy: true,
      pageLength: 200,
      lengthMenu: [[100, 200, 500, 1000, -1], [100, 200, 500, 1000, "All"]],
      aaData: enquiryList,
      columns: [
  
  
        {
        "title":"Date",
          render: function(data, type, row){
              return moment(row["created_at"]).format("DD/MM/YYYY");
          }
        },
         
        {
        "title":"Name",
          render: function(data, type, row){
            
              return row["user"]["first_name"]
          }
        },

        {
        "title":"Email",
          render: function(data, type, row){
            
              return row["email"]
          }
        },

        {
        "title":"Address",
          render: function(data, type, row){
            
              return row["address"]["address"]
          }
        },

        {
        "title":"Enquiry",
          render: function(data, type, row){
            
              return row["details"]
          }
        },

        {
        "title":"Status",
          render: function(data, type, row){

          	var selectStr = "<select onchange='updateEnquiryStatus(this,`"+row["id"]+"`)''><option>"+row["status"]+"</option>"
            	
            var statusArr = ["wip","created", "closed", "rejected"]
			for(j=0; j<statusArr.length;j++){
				if(statusArr[j] != row["status"]){

					selectStr = selectStr.concat('<option>'+statusArr[j]+'</option>')
				}
			}
			selectStr = selectStr.concat('</select>')
            return selectStr

          }
        },
        {
        "title":"Reply",
          render: function(data, type, row){
            
              return "<button type=\"button\"  id='trainingEnquiryReply' class=\"btn btn-default btn-sm\"><span class=\"fa fa-reply\" style=\"white-space: nowrap;\"> </span></button>"
          }
        },
        
      
      ]
    
    })


	$('.deleteBtn').click(function () {
      	notifyInfo("Please wait");
		var id = this.id	

		var onError =function(error){
        	notifyError("Failed to upload file");
      	};

      	var onResponse = function(response){

        	if(response.data.status==true){
            	notifySuccess(response.data.message);

            	getNewsletter(function(response){
					showNewsletter(response.data)
				},onError);
        	}else{
            	notifyError(response.data.message);
        	}
      	};
      	
      	deleteNewsletter(id,onResponse,onError)
	});
}




async function showAftersalesEnquiry(enquiryList){

	
	var enquiryList = enquiryList.filter(function(enquiry){return enquiry.request_type == 2;});

	console.log(" enquiryList : ",enquiryList)



	afterSalesTable = $('#aftersalesTable').DataTable( {
      dom: 'Blfrtip',
      autoWidth: false,
      buttons: [
          ],
      destroy: true,
      pageLength: 200,
      lengthMenu: [[100, 200, 500, 1000, -1], [100, 200, 500, 1000, "All"]],
      aaData: enquiryList,
      columns: [
  
  
        {
        "title":"Date",
          render: function(data, type, row){
              return moment(row["created_at"]).format("DD/MM/YYYY");
          }
        },
         
        {
        "title":"Name",
          render: function(data, type, row){
            
              return row["user"]["first_name"]
          }
        },

        {
        "title":"Email",
          render: function(data, type, row){
            
              return row["email"]
          }
        },

        {
        "title":"Address",
          render: function(data, type, row){
            
              return row["address"]["address"]
          }
        },

        {
        "title":"Enquiry",
          render: function(data, type, row){
            
              return row["details"]
          }
        },

        {
        "title":"Status",
          render: function(data, type, row){

          	var selectStr = "<select onchange='updateEnquiryStatus(this,`"+row["id"]+"`)''><option>"+row["status"]+"</option>"
            	
            var statusArr = ["wip","created", "closed", "rejected"]
			for(j=0; j<statusArr.length;j++){
				if(statusArr[j] != row["status"]){

					selectStr = selectStr.concat('<option>'+statusArr[j]+'</option>')
				}
			}
			selectStr = selectStr.concat('</select>')
            return selectStr

          }
        },
        {
        "title":"Reply",
          render: function(data, type, row){
            
              return "<button type=\"button\" id='aftersalesEnquiryReply'  class=\"btn btn-default btn-sm\"><span class=\"fa fa-reply\" style=\"white-space: nowrap;\"> </span></button>"
          }
        },
        
      
      ]
    
    })


	$('.deleteBtn').click(function () {
      	notifyInfo("Please wait");
		var id = this.id	

		var onError =function(error){
        	notifyError("Failed to upload file");
      	};

      	var onResponse = function(response){

        	if(response.data.status==true){
            	notifySuccess(response.data.message);

            	getNewsletter(function(response){
					showNewsletter(response.data)
				},onError);
        	}else{
            	notifyError(response.data.message);
        	}
      	};
      	
      	deleteNewsletter(id,onResponse,onError)
	});
}


// showNewsletter(enquiryList)


$(document).ready(function(){

	var onError =function(error){
		// notifyError("Failed to");
	};


	getTrainingAftersalesEnquiryList(function(response){
		showTrainingEnquiry(response.data.enquiries.data)
		showAftersalesEnquiry(response.data.enquiries.data)
	},onError);

});




async function updateEnquiryStatus(updatedStatus,enquiry_id) {

  	var status = $(updatedStatus).val()

  	var onError =function(error){
		// notifyError("Failed to");
	};

  	var onResponse = function(response){

    	if(response.data.status==true){
        	notifySuccess("Status is Update");

        	getTrainingAftersalesEnquiryList(function(response){
				showTrainingEnquiry(response.data.enquiries.data)
				showAftersalesEnquiry(response.data.enquiries.data)
			},onError);

    	}else{
        	notifyError("Something went wrong");
    	}
  	};
  	
  	updateTrainingAftersalesEnquiryStatus(status,enquiry_id,onResponse,onError)
};





 $('#trainingTable').on('click', '#trainingEnquiryReply', function () {
  	var RowIndex = $(this).closest('tr');
    var data = $('#trainingTable').dataTable().api().row(RowIndex).data();

  	console.log("data :  data : ", data)
  	trainingEnquiryReply(data)
  });


async function trainingEnquiryReply(enquiryArr){

	var trainingEnqReplyHTML = ""
	$("#trainingEnqReply").empty()

	var enquiryReplyArr = enquiryArr["enquiry_replies"]

	// alert()

	if(enquiryReplyArr.length > 0){

		trainingEnqReplyHTML += '<table class="table table-bordered">'
		trainingEnqReplyHTML += '<thead>'
		trainingEnqReplyHTML += '<tr>'
		trainingEnqReplyHTML += '<th>Sr. No</th>'
		trainingEnqReplyHTML += '<th>Date</th>'
		trainingEnqReplyHTML += '<th>Reply</th>'
		trainingEnqReplyHTML += '</tr>'
		trainingEnqReplyHTML += '</thead>'
		trainingEnqReplyHTML += '<tbody>'

		for(i=0;i<enquiryReplyArr.length;i++){
			var enquiryReplyItem = enquiryReplyArr[i]

			trainingEnqReplyHTML += '<tr>'
			trainingEnqReplyHTML += '<th scope="row">'+(i+1)+'</th>'
			trainingEnqReplyHTML += '<td>'+moment(safeAccess(["created_at"],enquiryReplyItem,"-")).format("DD/MM/YYYY")+'</td>'
			trainingEnqReplyHTML += '<td>'+safeAccess(["details"],enquiryReplyItem,"-")+'</td>'
		}
		trainingEnqReplyHTML += '</tr>'

		trainingEnqReplyHTML += '</tbody>'
		trainingEnqReplyHTML += '</table>'
	}

	trainingEnqReplyHTML += '<label style="padding:20px">Reply : </br></label><textarea id="trainingEnquiryReplyDetails" placeholder="" name="trainingReplyDetails" class="form-control2" style="width:50%"></textarea>'
	trainingEnqReplyHTML += '<button id ="submitTrainingEnquiryReply" style="margin:20px; margin:20px;color: white;background: #73879C;"> Send</button>'
    // hbnjmk



	// orderDetailsHTML += '</table>'


    $("#trainingEnqReply").append(trainingEnqReplyHTML);
    $('#modal_training_enq_reply').modal('show');



    $( "#submitTrainingEnquiryReply" ).click(async function() {

		var enquiry_id = enquiryArr["id"]


		var trainingEnquiryReplyDetail = $("#trainingEnquiryReplyDetails").val();

		// console.log("trainingEnquiryDetails : ", trainingEnquiryDetail)
	    if(trainingEnquiryReplyDetail.trim() != ''){
	    	replyTrainingAftersalesEnquiry(trainingEnquiryReplyDetail,enquiry_id,function(res){

	           	if(res.data.status == true){
	            	notifySuccess("Reply Sent")
	            	$('#trainingEnquiryReplyDetails').val('');
					// $('#modal_training_enq_reply').modal('hide');
					location.reload(); 

	           }else{
	            	notifyError("Something went wrong")
	           }
	        })
		}else{
			notifyError("Input an reply message");
		}

	});
}




$('#aftersalesTable').on('click', '#aftersalesEnquiryReply', function () {
  	var RowIndex = $(this).closest('tr');
    var data = $('#aftersalesTable').dataTable().api().row(RowIndex).data();

  	console.log("data :  data : ", data)
  	aftersalesEnquiryReply(data)
  });


async function aftersalesEnquiryReply(enquiryArr){

	var aftersalesEnqReplyHTML = ""
	$("#aftersalesEnqReply").empty()

	var enquiryReplyArr = enquiryArr["enquiry_replies"]

	// alert()

	if(enquiryReplyArr.length > 0){

		aftersalesEnqReplyHTML += '<table class="table table-bordered">'
		aftersalesEnqReplyHTML += '<thead>'
		aftersalesEnqReplyHTML += '<tr>'
		aftersalesEnqReplyHTML += '<th>Sr. No</th>'
		aftersalesEnqReplyHTML += '<th>Date</th>'
		aftersalesEnqReplyHTML += '<th>Reply</th>'
		aftersalesEnqReplyHTML += '</tr>'
		aftersalesEnqReplyHTML += '</thead>'
		aftersalesEnqReplyHTML += '<tbody>'

		for(i=0;i<enquiryReplyArr.length;i++){
			var enquiryReplyItem = enquiryReplyArr[i]

			aftersalesEnqReplyHTML += '<tr>'
			aftersalesEnqReplyHTML += '<th scope="row">'+(i+1)+'</th>'
			aftersalesEnqReplyHTML += '<td>'+moment(safeAccess(["created_at"],enquiryReplyItem,"-")).format("DD/MM/YYYY")+'</td>'
			aftersalesEnqReplyHTML += '<td>'+safeAccess(["details"],enquiryReplyItem,"-")+'</td>'
		}
		aftersalesEnqReplyHTML += '</tr>'

		aftersalesEnqReplyHTML += '</tbody>'
		aftersalesEnqReplyHTML += '</table>'
	}

	aftersalesEnqReplyHTML += '<label style="padding:20px">Reply : </br></label><textarea id="aftersalesEnquiryReplyDetails" placeholder="" name="aftersalesReplyDetails" class="form-control2" style="width:50%"></textarea>'
	aftersalesEnqReplyHTML += '<button id ="submitAftersalesEnquiryReply" style="margin:20px; margin:20px;color: white;background: #73879C;"> Send</button>'
    // hbnjmk



	// orderDetailsHTML += '</table>'


    $("#aftersalesEnqReply").append(aftersalesEnqReplyHTML);
    $('#modal_aftersales_enq_reply').modal('show');



    $( "#submitAftersalesEnquiryReply" ).click(async function() {

		var enquiry_id = enquiryArr["id"]


		var aftersalesEnquiryReplyDetail = $("#aftersalesEnquiryReplyDetails").val();

		// console.log("trainingEnquiryDetails : ", trainingEnquiryDetail)
	    if(aftersalesEnquiryReplyDetail.trim() != ''){
	    	replyTrainingAftersalesEnquiry(aftersalesEnquiryReplyDetail,enquiry_id,function(res){

	           	if(res.data.status == true){
	            	notifySuccess("Reply Sent")
	            	$('#aftersalesEnquiryReplyDetails').val('');
					// $('#modal_training_enq_reply').modal('hide');
					location.reload(); 

	           }else{
	            	notifyError("Something went wrong")
	           }
	        })
		}else{
			notifyError("Input an reply message");
		}

	});
}





