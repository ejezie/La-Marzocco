var employeeMasterTable;
function loadCustomers() {

  employeeMasterTable = $('#employee_master').dataTable( {
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
              console.log("recordsTotal "+res.data.data.data.length)
              // notifySuccess("sucess");
              callback({
                draw:data.draw,
                recordsTotal: res.data.data.total,
                recordsFiltered: res.data.data.total,
                data: res.data.data.data
              });

            };
            var onError =function(error){

              dismiss(loadingId);
              console.log(error);
              notifyError(error.response.data.message);
            };

              var pageIndex = data.start / data.length + 1 ;
              console.log("apgedinnnnnnnnnnndex  " +pageIndex)
              getEmployeeList(onResponse,onError,pageIndex,data.length);
        
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
                "title":"First Name",
                render: function(data, type, row, meta){

                  console.log("row : ", row)
                  return row.user.first_name;
                }
              },
              {
                "title":"Last Name",
                render: function(data, type, row){
                  return row.user.last_name;
                }
              },
              
              {
                "title":"Email",
                render: function(data, type, row){
                  return row.user.email;
                }
              },
              {
                "title":"Role",
                render: function(data, type, row){
                    return row.role
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
  loadCustomers();
  // populateIndustry();


  $('#customer_master').on('click', '#btnEdit', function () {
    var RowIndex = $(this).closest('tr');
    var data = employeeMasterTable.api().row(RowIndex).data();
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




  $('#employee_master').on('click', '#btnDelete', function () {
    var RowIndex = $(this).closest('tr');
    var data = employeeMasterTable.api().row(RowIndex).data();
    var onResponse = function(response){
        notifySuccess("Deleted successfully");
        window.location.reload();
      };
      var onError =function(error){
        notifyError("Failed to delete!");
      };
    if(confirm("Delete this item?")){
      deleteEmployee(onResponse,onError, data.id);
    }

});


    $('#customer_master').on('click', '#btnEditss', function () {

      var RowIndex = $(this).closest('tr');
      var data = employeeMasterTable.api().row(RowIndex).data();
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
      var xlsx = document.querySelector('#excelfile');
      var onResponse = function(response){
        $('#bulkUploadModal').modal('hide');
        if(response.data.is_valid){
            notifySuccess("File uploaded!");
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



