var customerMasterTable;
function loadCustomers() {

 customerMasterTable = $('#customer_master').dataTable( {
   searching: false,
   processing: true,
   serverSide: true,
   pageLength: 10,
   bSort : false,
   lengthMenu: [[10, 20, 500, 1000, -1], [10, 20, 500, 1000, "All"]],
   ajax: function(data, callback, settings) {
    const loadingId = notifyInfo("Please wait");
    console.log(JSON.stringify(data,null,2));

    var onResponse = function(res){
              dismiss(loadingId);
              console.log("recordsTotal "+res.data.customer_masters.data.length)
              // notifySuccess("sucess");
              callback({
                draw:data.draw,
                recordsTotal: res.data.customer_masters.total,
                recordsFiltered: res.data.customer_masters.total,
                data: res.data.customer_masters.data
              });

            };
            var onError =function(error){

              dismiss(loadingId);
              console.log(error);
              notifyError(error.response.data.message);
            };

              var pageIndex = data.start / data.length + 1 ;
              console.log("apgedinnnnnnnnnnndex  " +pageIndex)
              getCustomerList(onResponse,onError,pageIndex,data.length);
        
        },
        buttons : [{
          extend: 'csv',
                // className: 'btn btn-sm btn-success',
                titleAttr: 'CSV export.',
                text: 'CSV',
                // filename: 'attendance',
                extension: '.csv'
              }, {
                extend: 'pdf',
                // className: 'btn btn-sm btn-danger',
                titleAttr: 'Copy table data.',
                text: 'PDF'
              }],
              columns: [
              {
                "title":"Customer Code",
                render: function(data, type, row, meta){
                  return row.short_code;
                }
              },
              {
                "title":"Name",
                render: function(data, type, row){
                  return row.first_name;
                }
              },
              
              {
                "title":"Company Name",
                render: function(data, type, row){
                  return row.company_name;
                }
              },
              {
                "title":"Deposit Required",
                render: function(data, type, row){
                  if(row.deposit_required== 1){
                    return "Yes"
                  }else if(row.deposit_required== 0){
                    return "No";
                  }else if(row.deposit_required== 0){
                    return "-";
                  }
                }
              },
         {
        "title":"Edit",
        render: function(data, type, row){
           return "<button type='button' id='btnEdit' class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\"></span></button>"
          }
        },
       {
        "title":"Delete",
        render: function(data, type, row){
           return "<button type='button' id='btnDelete'  class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-trash\"></span></button>"
          }
        }
        ]
      })
}


function submitEditCustomerModal(data){


  var short_code = $("#inputShortCode").val();
  var industry_id = $("#inputIndustry").val();
  var first_name = $("#inputFirstName").val();
  var middle_name = $("#inputMiddleName").val();
  var last_name = $("#inputLastName").val();
  var company_name = $("#inputCompanyName").val();
  var deposit_required = $("#inputDepositRequired").val();

  var onResponse = function(response){
    notifySuccess("Updated");
    // window.location.href = 'productMaster.html';
  };
  var onError =function(error){
    notifyError("Failed to update")
  };
  updateCustomer(
    industry_id,
    short_code,
    first_name,
    middle_name,
    last_name,
    company_name,
    deposit_required,
    onResponse,
    onError
    );
}

function populateIndustry(){

  var industryDropdown = $("#inputIndustry");
  var onResponse = function(response){
    for(var i=0; i< response.data.industries.data.length; i++){
    const industry = response.data.industries.data[i];
         industryDropdown.append($("<option>").text(industry.name +"   "+((industry.short_code != null)? industry.short_code : "")).val(industry.id));
      }
  };
  var onError =function(error){
    notifyError("Failed to load industry");
  };
  getIndustryList(onResponse,onError);
}


$(document).ready(function(){

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


  // Login check - Show table to operations manager
  var user_profile = JSON.parse(localStorage.getItem("user_profile"))

  var role = user_profile["user_role"]
  var userName = user_profile["user_name"]
  var profileImage = user_profile["user_image"]
  console.log("role : ", user_profile)
  if (role == 5){
    $("#customerMasterBody").empty()
  }else{
    loadCustomers();
    populateIndustry();

  }


  $('#customer_master').on('click', '#btnEdit', function () {
    var RowIndex = $(this).closest('tr');
    var data = customerMasterTable.api().row(RowIndex).data();
    console.log(data);
     $("#inputShortCode").val(data.short_code);
     $("#inputIndustry").val(data.industry_id);
     $("#inputFirstName").val(data.first_name);
     $("#inputMiddleName").val(data.middle_name);
     $("#inputLastName").val(data.last_name);
     $("#inputCompanyName").val(data.company_name);
     $("#inputDepositRequired").val(data.deposit_required);

     $("#inputShortCode").trackChanges();
    $("#inputIndustry").trackChanges();
     $("#inputFirstName").trackChanges();
     $("#inputMiddleName").trackChanges();
     $("#inputLastName").trackChanges();
     $("#inputCompanyName").trackChanges();
     $("#inputDepositRequired").trackChanges();

    
    $('#cancelEditCustomerModal').click(function () {
      $('#editCustomerModal').modal('hide');
    });


    
    $('#submitEditCustomerModal').click(function () {

      var short_code = $("#inputShortCode").getChanged();
      var industry_id = $("#inputIndustry").getChanged();
      var first_name = $("#inputFirstName").getChanged();
      var middle_name = $("#inputMiddleName").getChanged();
      var last_name = $("#inputLastName").getChanged();
      var company_name = $("#inputCompanyName").getChanged();
      var deposit_required = $("#inputDepositRequired").getChanged();

      var onResponse = function(response){
        notifySuccess("Updated successfully");
        window.location.reload();
      };
      var onError =function(error){
        notifyError("Failed to update");
      };
      updateCustomer(onResponse,onError, data.id,
        short_code,
        industry_id,
        first_name,
        middle_name,
        last_name,
        company_name,
        deposit_required
        );
    });
    

    $('#editCustomerModal').modal('show');
  });




  $('#customer_master').on('click', '#btnDelete', function () {
    var RowIndex = $(this).closest('tr');
    var data = customerMasterTable.api().row(RowIndex).data();
    var onResponse = function(response){
        notifySuccess("Deleted successfully");
        window.location.reload();
      };
      var onError =function(error){
        notifyError("Failed to delete!");
      };
    if(confirm("Delete this item?")){
      deleteCustomer(onResponse,onError, data.id);
    }

});


    $('#customer_master').on('click', '#btnEditss', function () {

      var RowIndex = $(this).closest('tr');
      var data = customerMasterTable.api().row(RowIndex).data();
      populateGroup(data.group.id);
      populateFamily(data.family.id);
      populateType(data.type.id);
      populateParent(data.parent.id);

      $("#input_code").val(data.code);
      $("#input_name").val(data.name);
      $("#input_short_code").val(data.short_code);
      $("#input_desc").val(data.desc);
      $("#input_super_session_item_id").val(data.super_session_item_id);
      $("#input_manage_serial_no").val(data.manage_serial_number);


      $("#input_length").val(data.length);
            // var length_uom = $("input_length_uom").val();
            $("#input_width").val(data.width);
            // var width_uom = $("input_width_uom").val();
            $("#input_height").val(data.height);
            // var height_uom = $("input_height_uom").val();
            $("#input_weight").val(data.weight);
            // var weight_uom = $("input_weight_uom").val();
            $("#input_volume").val(data.volume);
            // var volume_uom = $("#input_volume_uom").val();
            $("#input_is_consumable").val(data.is_consumable);
            $("#input_is_recommended").val(data.is_recommended);
            $("#input_is_slow_moving").val(data.is_slow_moving);
            $("#input_is_active").val(data.is_active);


            $('#cancelEditItemModal').click(function () {
              $('#editItemModal').modal('hide');
            });


            $('#submitEditItemModal').click(function () {
              submitEditItemModal(data);
            });
            

          $('#editItemModal').modal('show');

            console.log(JSON.stringify(data,null,2));
          });


    
    $('#uploadFile').click(function () {
      $("#uploadFile").prop('disabled', true);
      var xlsx = document.querySelector('#excelfile');
      var onResponse = function(response){
        $('#bulkUploadModal').modal('hide');

        console.log("response uploaded : ", response)
        if(response.data.status == true){
            // notifySuccess("File uploaded!");
            notifySuccess(response.data.users);
        }else{
            notifyError(response.data.message);
        }
      };
      var onError =function(error){
        notifyError("Failed to upload file");
      };
      bulkUploadCustomers(onResponse,onError, xlsx.files[0]);
    });
           });







////////////////////////////////////////////////////////////////////////////////////////////////////////

// function ExportToTable(action) {

//     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
//     /*Checks whether the file is a valid excel file*/  
//     if (regex.test($("#excelfileAddAddress").val().toLowerCase())) {
//         var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
//         if ($("#excelfileAddAddress").val().toLowerCase().indexOf(".xlsx") > 0) {  
//             xlsxflag = true;  
//         }  
//          /*Checks whether the browser supports HTML5*/  
//         if (typeof (FileReader) != "undefined") {  
//             var reader = new FileReader();  
//             reader.onload = function (e) {  
//                 var data = e.target.result;
     
//              /*Converts the excel data in to object*/  
//             if (xlsxflag) {  
//                 var workbook = XLSX.read(data, { type: 'binary' });  
//             }  
//             else{  
//                 var workbook = XLS.read(data, { type: 'binary' });  
//             }  


//             /*Gets all the sheetnames of excel in to a variable*/  
//             var sheet_name_list = workbook.SheetNames;  

//             var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
//             sheet_name_list.forEach(async function (y) { /*Iterate through all sheets*/  
//                  /*Convert the cell value to Json*/  
//                 if (xlsxflag) {  
//                      var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]); 
                      
                      
//                      // Column names
//                      var keys = Object.keys(exceljson[1]);
//                      excel_column_names = keys;
//                      console.log(keys)
//                 }  
//                 else{  
//                     var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
//                       // Column names
//                     var keys = Object.keys(exceljson[1]);
//                     excel_column_names = keys;
//                 }  

//                  // Ckeck if the uploaded excel contains all required columns
//                 let requiredcolumns = ["ItemCode","Quantity"],
//                      uploadedcolumns = keys;
//                 let checker = (arr, target) => target.every(v => arr.includes(v));

//                 console.log(checker(uploadedcolumns, requiredcolumns));
                 
//                   // if (checker(uploadedcolumns, requiredcolumns)== true) {
//                 if (uploadedcolumns.length >0) {
//                     // For preview of the uploaded data
//                     if (action == 'Preview'){
//                         console.log("exceljson for add address :  ",exceljson)

//                         var onResponse = function(response){
//                             // for(var i=0; i< response.data.customers.data.length; i++){
//                             const connected_customers = response.data.customers.data;
//                             var counter = 0
//                             var new_user_arr = []
//                             // for(var i=0; i< exceljson.length; i++){
//                             for(var i=0; i< 2; i++){
//                                 var new_user_obj = {}
//                                 var filtered_conn_cust = connected_customers.filter(function(cust){return cust.email == exceljson[i]["EmailID"];});
//                                 // console.log("filtered_conn_cust : ", filtered_conn_cust)
//                                 if(filtered_conn_cust.length > 0){
//                                   var user_id = filtered_conn_cust[0]["id"]
//                                   var type = 3
//                                   var name = exceljson[i]["CompanyName"]
//                                   var zip_code = exceljson[i]["AreaCode"]
//                                   if(exceljson[i]["Address Line 2"]){

//                                     var address = exceljson[i]["Address Line 1"]+" "+exceljson[i]["Address Line 2"]
//                                   }else {
//                                     var address = exceljson[i]["Address Line 1"]

//                                   }
//                                   var landmark = exceljson[i]["SubUrb (Landmark)"]
//                                   var phone = 123456789

//                                   console.log("user_id : ",user_id)
//                                   console.log("type : ",type)
//                                   console.log("name : ",name)
//                                   console.log("zip_code : ",zip_code)
//                                   console.log("address : ",address)
//                                   console.log("landmark : ",landmark)
//                                   console.log("phone : ",phone)



//                                   // alert(user_id)




                                  
                                  
//                                   // getAddressesList(onResp,onErr,23)

//                                   // return false
//                                 }
//                             }
//                             // getAdd(new_user_arr)
//                             console.log("new_user_arr : ",new_user_arr)
//                             console.log("counter : ",counter)

//                           };
//                           var onError =function(error){
//                             notifyError("Failed to load Address.Please reload page");
//                           };

//                           var onErr =function(error){
//                             notifyError("Failed to load customers.Please reload page");
//                           };
//                         getConnectedCustomers(onResponse,onError)
//                         // var excelDataWithQty = exceljson.filter(function(item){return parseInt(item.Quantity) > 0;});
//                         // showBulkOrders(excelDataWithQty)
//                     } 
//                 }else {
//                     alert("Enter Valid Data ")
//                 }
        
//             });  

//         }  
//         if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
//             reader.readAsArrayBuffer($("#excelfileAddAddress")[0].files[0]);  
//         }  
//         else {  
//             reader.readAsBinaryString($("#excelfileAddAddress")[0].files[0]);     
//         }  
//     }  
//     else {  
//         alert("Sorry! Your browser does not support HTML5!");  
//     }  
//     }  
//     else {  
//      alert("Please upload a valid Excel file!");  
//     }  

// } 




// async function getAdd(userArr){
//   console.log("userArr : ",userArr)

//   var new_arr = []
//   alert(userArr.length)
//   for(k=0;k<300;k++){
//     console.log("userArr : ",userArr[k]["user_id"])
//   // for(k=0;k<3;k++){
//     var new_obj = {}
//     new_obj.user_id = userArr[k]["user_id"]
//     var onResp = function(resp){

//       var user_address =  resp.data.addresses.data
//       var addr_arr = []


//     }
//       console.log("new_arr : ", new_arr)
//     var onError =function(error){
//       notifyError("Failed to load Address.Please reload page");
//       console.log("error : ",error)
//     };
//     new_arr.push(new_obj)
//     // getAddressesList(onResp,onError,userArr[k]["user_id"])
//     // getAddressesList(onResp,onError,23)

//   }
// }


// function populateAreas(postcode){

//   var dropdown = $("#inputArea");
//   dropdown.html("");
//   var onResponse = function(response){
//     for(var i=0; i< response.data.area_codes.data.length; i++){
//     const item = response.data.area_codes.data[i];
//          dropdown.append($("<option>").text(item.name).val(item.id));
//       }

//       $("#inputArea").append('<option disabled selected value>Select Area</option>');
//   };
//   getAreas(postcode,onResponse);
// }