var itemMasterTable;



// var itemMasterTable 
function loadProducts(beatdata) {
 itemMasterTable = $('#items_master').DataTable( {
  dom: 'Blfrtip',
   searching : false,
   processing: true,
   serverSide: true,
   pageLength: 10,
   bSort : false,
   lengthMenu: [[10, 20, 500, 1000, -1], [10, 20, 500, 1000, "All"]],
          columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ,
        {
             targets: '_all',
             defaultContent: '-'
            },],
        select: {
            style:    'multi',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]],
   // columnDefs: [{
   //              targets: 0,
   //              data: 6,
   //              'checkboxes': {
   //                  'selectRow': true
   //              }
   //          },
   //         {
   //           targets: '_all',
   //           defaultContent: '-'
   //          },
   //          // { "visible": false, "targets": 1 }
   //          ],
   //          select: {
   //              style: 'multi'
   //          },
   ajax: function(data, callback, settings) {
    const loadingId = notifyInfo("Please wait");
    // console.log(JSON.stringify(data,null,2));

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
              // console.log("apgedinnnnnnnnnnndex  " +pageIndex)
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
       
        buttons : [
            // 'selectAll',
            // 'selectNone',
            //  {
            //     text: 'Get selected data',
            //     action: function () {
            //         var count = itemMasterTable.rows( { selected : true } ).data()[0];;
            //         // var count = $('#items_master').DataTable().columns().checkboxes.selected()[0];
 
            //         console.log("nvcjdsvcndsvndsvnj : ", count)
            //     }
            // },
          //   {
          // extend: 'csv',
          //       // className: 'btn btn-sm btn-success',
          //       titleAttr: 'CSV export.',
          //       text: 'CSV',
          //       // filename: 'attendance',
          //       extension: '.csv'
          //     }, {
          //       extend: 'pdf',
          //       // className: 'btn btn-sm btn-danger',
          //       titleAttr: 'Copy table data.',
          //       text: 'PDF'
          //     }
              ],
              columns: [
              
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
                "title":"Description",
                render: function(data, type, row){
                 // console.log("row.salesperson.fullname",row.salesPerson.fullName)
                 return row.desc;
               }
              },
        ]
      })





}









$(document).ready(function(){
  loadProducts();




    $('#items_master').on('click', '.btn', function () {

      var RowIndex = $(this).closest('tr');
      var data = $('#items_master').dataTable().api().row(RowIndex).data();

      console.log("data :",data)
      populateGroup(data.item_group.id);
      populateFamily(data.item_family.id);
      // populateType(data.type.id);
      // populateParent(data.parent.id);

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
      bulkUploadItemDescription(onResponse,onError, xlsx.files[0]);
    });
    

});



