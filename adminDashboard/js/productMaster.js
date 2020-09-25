var itemMasterTable;

function populateGroup(currentVal){

  var groupDropdown = $("#input_item_group");
  groupDropdown.empty();

  var onResponse = function(response){
    for(var i=0; i< response.data.groups.data.length; i++){
      const group = response.data.groups.data[i];
      groupDropdown.append($("<option>").text(group.name +"   "+((group.desc != null)? group.desc : "")).val(group.id));
    }

    groupDropdown.val(currentVal);

  };
  var onError =function(error){
    notifyError("Failed to load groups");
  };
  getGroups(onResponse,onError);
  
}
function populateFamily(currentVal){

  var familyDropdown = $("#input_item_family");
  familyDropdown.empty();

  var onResponse = function(response){
    for(var i=0; i< response.data.families.data.length; i++){
      const group = response.data.families.data[i];
      familyDropdown.append($("<option>").text(group.code +"   "+((group.desc != null)? group.desc : "")).val(group.id));
    }
    familyDropdown.val(currentVal);

  };
  var onError =function(error){
    notifyError("Failed to load families");
  };

  getFamilies(onResponse,onError);

}
function populateType(currentVal){

  var typeDropdown = $("#input_item_type");
  typeDropdown.empty();

  var onResponse = function(response){
    for(var i=0; i< response.data.types.data.length; i++){
      const group = response.data.types.data[i];
      typeDropdown.append($("<option>").text(group.name +"   "+((group.desc != null)? group.desc : "")).val(group.id));
    }
    typeDropdown.val(currentVal);

  };
  var onError =function(error){
    console.log(error)
    notifyError("Failed to load types");
  };

  getTypes(onResponse,onError);

}
function populateParent(currentVal){

  var parentDropdown = $("#input_item_parent");
  parentDropdown.empty();

  var onResponse = function(response){
    for(var i=0; i< response.data.parents.data.length; i++){
      const group = response.data.parents.data[i];
      parentDropdown.append($("<option>").text(group.name +"   "+ ((group.desc != null)? group.desc : "")).val(group.id));
    }
    parentDropdown.val(currentVal);

  };
  var onError =function(error){
    console.log(error)
    notifyError("Failed to load parents");
  };

  getParents(onResponse,onError);

}


function loadProducts(beatdata) {
 itemMasterTable = $('#items_master').dataTable( {
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
              console.log("recordsTotal "+res.data.items.data.length)
              // notifySuccess("sucess");
              callback({
                draw:data.draw,
                recordsTotal: res.data.items.total,
                recordsFiltered: res.data.items.total,
                data: res.data.items.data
              });

            };
            var onError =function(error){
              console.log(error);
              dismiss(loadingId);
            };

              // var info = table.page.info();
              // var pageIndex = (data.start+10)/10;
              var pageIndex = data.start / data.length + 1 ;
              console.log("apgedinnnnnnnnnnndex  " +pageIndex)
              getItems(onResponse,onError,pageIndex,data.length);
          // var sort_column_name = data.columns[data.order[0].column].data.replace(/\./g,"__");
          // var direction = "";

          // if (data.order[0].dir == "desc") { direction = "-"};

          // $.get('your/tasty/pie/url?format=json', {
          //     limit: data.length,
          //     offset: data.start,
          //     your_search_field__searchattr: data.search.value,
          //     order_by: direction +sort_column_name
          // }, function(res) {
          //     callback({
          //         recordsTotal: res.meta.total_count,
          //         recordsFiltered: res.meta.total_count,
          //         data: res.objects
          //     });
          // });
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
                "title":"Group",
                render: function(data, type, row, meta){
                  console.log(JSON.stringify(row,null,2))
                  return safeAccess(['item_group','name'],row,"");
                }
              },
              {
                "title":"Family",
                render: function(data, type, row){
                  return safeAccess(['item_family','code'],row,"");
                }
              },
              {
                "title":"Type",
                render: function(data, type, row){
                  return  safeAccess(['type','code'],row,"");
                }
              },
              {
                "title":"Parent",
                render: function(data, type, row){
                  return  safeAccess(['item_parent','name'],row,"");
                }
              },
              {
                "title":"Item Code",
                render: function(data, type, row){
                  return row.code;
                }
              },
              {
                "title":"Item Name",
                render: function(data, type, row){
           // console.log("row.salesperson.fullname",row.salesPerson.fullName)
           return row.name;
         }
       },
       {
        "title":"Weight",
        render: function(data, type, row){
           // console.log("row.salesperson.fullname",row.salesPerson.fullName)
           return (row.weight != null ? (row.weight+" "+row.weight_uom) : "-" );
         }
       },
       {
        "title":"Active",
        render: function(data, type, row){
           // console.log("row.salesperson.fullname",row.salesPerson.fullName)
           return (row.is_active == 0 ? "Inactive" : "Active") ;  
         }
       },
       {
        "title":"Recommended",
        render: function(data, type, row){
           // console.log("row.salesperson.fullname",row.salesPerson.fullName)
           return (row.is_recommended == 0 ? "Not Recommended" : "Recommended") ;  
         }
       },
       {
        "title":"Edit",
        render: function(data, type, row){
           // console.log("row.salesperson.fullname",row.salesPerson.fullName)
           return "<button type=\"button\" class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\"></span></button>"
            // return "EDIT";
          }
        }
        ]
      })
}

function showItemEditModal(data){

  $('#editItemModal').modal('show');
}

function submitEditItemModal(data){

  var item_group_id = $("#input_item_group").val();
  var item_type_id = $("#input_item_type").val();
  var item_family_id = $("#input_item_family").val();
  var parent_item_id = $("#input_item_parent").val();


  var code = $("#input_code").val();
  var name = $("#input_name").val();
  var short_code = $("#input_short_code").val();
  var desc = $("#input_desc").val();
  var super_session_item_id = $("#input_super_session_item_id").val();
  var manage_serial_number = $("#input_manage_serial_no").val();


  var length = $("#input_length").val();
  // var length_uom = $("input_length_uom").val();
  var width = $("#input_width").val();
  // var width_uom = $("input_width_uom").val();
  var height = $("#input_height").val();
  // var height_uom = $("input_height_uom").val();
  var weight = $("#input_weight").val();
  // var weight_uom = $("input_weight_uom").val();
  var volume = $("#input_volume").val();
  // var volume_uom = $("#input_volume_uom").val();
  var is_consumable = $("#input_is_consumable").val();
  var is_recommended = $("#input_is_recommended").val();
  var is_slow_moving = $("#input_is_slow_moving").val();
  var is_active = $("#input_is_active").val();
  var onResponse = function(response){
    notifySuccess("Item updated");
    // window.location.href = 'productMaster.html';
  };
  var onError =function(error){
    notifyError("Failed to update item")
  };
  updateItem(
    data.id,
    code,
    name,
    short_code,
    desc,
    parent_item_id,
    super_session_item_id,
    manage_serial_number,
    item_group_id,
    item_type_id,
    item_family_id,
    length,
    "cm",
    width,
    "cm",
    height,
    "cm",
    weight,
    "grams",
    volume,
    "ml",
    is_consumable,
    is_recommended,
    is_slow_moving,
    is_active,
    onResponse,
    onError
    );
}

$(document).ready(function(){
  loadProducts();
    // $('#items_master tbody').on( 'click', 'button', function () {
    //   var data = $('#items_master').dataTable().row( $(this).parents('tr') ).data();
    //   alert( data[0] +"'s salary is: "+ data[ 5 ] );
    // });

    // $('#items_master').dataTable().on('click', 'button.edit-task', function () {
    //     var closestRow = $(this).closest('tr');
    //     var data = $table.row(closestRow).data();
    //     var taskID = data[0];
    // });



    $('#items_master').on('click', '.btn', function () {

      var RowIndex = $(this).closest('tr');
      var data = itemMasterTable.api().row(RowIndex).data();
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
            

            showItemEditModal(data);

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
      bulkUploadItems(onResponse,onError, xlsx.files[0]);
    });
    






    
// });
                // .on('click', '.btn', function () {
                //     alert("submitting")
                //     submitEditItemModal(data);
                //     alert("submitted")
                //     // $('#editItemModal').modal('hide');
                // });

              });



