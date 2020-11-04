
var itemMasterTable;
async function showOrders(orderArr){
   itemMasterTable = $('#tableOrders').DataTable( {
   dom: 'Blfrtip',
   searching: false,
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
   	ajax: function(data, callback, settings) {
    const loadingId = notifyInfo("Please wait");
    var onResponse = function(res){
              dismiss(loadingId);
              console.log("recordsTotal "+res.data.order.data.length)
              callback({
                draw:data.draw,
                recordsTotal: res.data.order.total,
                recordsFiltered: res.data.order.total,
                data: res.data.order.data
              });

            };
            var onError =function(error){
              console.log(error);
              dismiss(loadingId);
            };
              var pageIndex = data.start / data.length + 1 ;
              getQuotationList(onResponse,onError,pageIndex,data.length);
        },
       
        buttons : [
            {
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
              }
              ],
              columns: [
            
              {
                "title":"Date",
                render: function(data, type, row, meta){
                  // console.log(JSON.stringify(row,null,2))
                  return safeAccess(['created_at',],row,"").match(/([^T]+)/)[0].split("-").reverse().join("/");
                }
              },
              {
                "title":"Items",
                render: function(data, type, row){
                  return safeAccess(['quote_line',],row,[]).length;
                }
              },
              {
                "title":"Price",
                render: function(data, type, row){
                  return  "$"+safeAccess(['total'],row,"-").toLocaleString("en-AU");
                }
              },
           {
            "title":"Product Details",
            render: function(data, type, row){
               return "<button type=\"button\" id='btnDetails' class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\">Products</span></button>"
              }
            },
           {
            "title":"Order",
            render: function(data, type, row){
               return "<button type=\"button\" id='btnAddToCart' class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\">Submit</span></button>"
              }
        }
        ]
      })

}



$(document).ready(function(){
	// alert("sdad")
	showOrders();

  $('#tableOrders').on('click', '#btnDetails', function () {
  	var RowIndex = $(this).closest('tr');
    var data = $('#tableOrders').dataTable().api().row(RowIndex).data();

  	showOrderDetails(data.id, data.order_line);
  });


  $('#tableOrders').on('click', '#btnTrackOrder',async function () {
  		var RowIndex = $(this).closest('tr');
    	var data = $('#tableOrders').dataTable().api().row(RowIndex).data();
    	notifyInfo("Please wait");
    	trackOrder(data.id,function(res){
    		 showOrderTrackingDetails(res.data.track_items);
    	})

  });


  $('#tableOrders').on('click', '#btnCancelOrder',async function () {
      var RowIndex = $(this).closest('tr');
      var data = $('#tableOrders').dataTable().api().row(RowIndex).data();
      console.log("this id data  : ", data)

      // notifyInfo("Please wait");

      var order_item_arr = []
      for(i=0; i<data["order_line"].length;i++){
        order_item_arr.push(data["order_line"][i]["id"])
      }

      var orderId = data["id"]
      var orderLineIds = order_item_arr.toString()

      deleteOrderLineItem(orderId, orderLineIds)
      // trackOrder(data.id,function(res){
      //    showOrderTrackingDetails(res.data.track_items);
      // })
      // value1.replace(/,/g,'')
  });
});



async function showOrderTrackingDetails(items){
var orderDetailsHTML = ""
	$("#orderTrackingDetails").empty()



    orderDetailsHTML += '<table class="table table-bordered">'
    orderDetailsHTML += '<thead>'
    orderDetailsHTML += '<tr>'
    orderDetailsHTML += '<th>#</th>'
    orderDetailsHTML += '<th>Item Part No.</th>'
    orderDetailsHTML += '<th>Quantity</th>'
    orderDetailsHTML += '<th>Status</th>'
    orderDetailsHTML += '<th>Tracking Id</th>'
    orderDetailsHTML += '</tr>'
    orderDetailsHTML += '</thead>'
    orderDetailsHTML += '<tbody>'

    for(i=0;i<items.length;i++){
        const item = items[i];

    orderDetailsHTML += '<tr>'
    orderDetailsHTML += '<th scope="row">'+(i+1)+'</th>'
    orderDetailsHTML += '<td>'+safeAccess(["item_part_number"],item,"-")+'</td>'
    orderDetailsHTML += '<td>'+safeAccess(["quantity"],item,"-")+'</td>'
    orderDetailsHTML += '<td>'+safeAccess(["status"],item,"-")+'</td>'
    orderDetailsHTML += '<td>'+safeAccess(["awb"],item,"-")+'</td>'
    orderDetailsHTML += '</tr>'
    }


    orderDetailsHTML += '</tbody>'
    orderDetailsHTML += '</table>'


    $("#orderTrackingDetails").append(orderDetailsHTML);
    $('#modal_tracking').modal('show');
}

async function showOrderDetails(orderId, quoteLine){

	var orderDetailsHTML = ""
	$("#orderDetails").empty()



orderDetailsHTML += '<table class="table table-bordered">'
orderDetailsHTML += '<thead>'
orderDetailsHTML += '<tr>'
orderDetailsHTML += '<th>#</th>'
orderDetailsHTML += '<th>Product</th>'
orderDetailsHTML += '<th>Code</th>'
orderDetailsHTML += '<th>Name</th>'
orderDetailsHTML += '<th>Price</th>'
orderDetailsHTML += '<th>Quantity</th>'
orderDetailsHTML += '<th>Total</th>'
orderDetailsHTML += '<th>Expected Dispatch</th>'
orderDetailsHTML += '<th>Cancel</th>'
orderDetailsHTML += '</tr>'
orderDetailsHTML += '</thead>'
orderDetailsHTML += '<tbody>'

for(i=0;i<quoteLine.length;i++){
   const quoteItem = quoteLine[i];

  orderDetailsHTML += '<tr>'
  orderDetailsHTML += '<th scope="row">'+(i+1)+'</th>'
  orderDetailsHTML += '<td><img src="../assets/img/s-product/product.jpg" alt=""></td>'
  orderDetailsHTML += '<td>'+safeAccess(["item","code"],quoteItem,"-")+'</td>'
  orderDetailsHTML += '<td>'+safeAccess(["item","name"],quoteItem,"-")+'</td>'
  orderDetailsHTML += '<td>$'+safeAccess(["price"],quoteItem,"-")+'</td>'
  orderDetailsHTML += '<td>'+safeAccess(["qty"],quoteItem,"-")+'</td>'
  orderDetailsHTML += '<td>$'+safeAccess(["total"],quoteItem,"-")+'</td>'
  orderDetailsHTML += '<td>'+safeAccess(["expected_delivery_date"],quoteItem,"-")+'</td>'
  if(quoteItem.status == "cancelled"){
    orderDetailsHTML += '<td>Archived</td>'
  }else{

    orderDetailsHTML += '<td><a ><i onclick="deleteOrderLineItem('+orderId+','+quoteItem.id+')" class="fa fa-trash-o" style="width: 30px;font-size:17px"></i></a></td>'
  }
}
orderDetailsHTML += '</tr>'

orderDetailsHTML += '</tbody>'
orderDetailsHTML += '</table>'

    // hbnjmk


	// orderDetailsHTML += '<table lass="table table-bordered">'
	// orderDetailsHTML += '<thead>'
	// orderDetailsHTML += '<tr>'
 //  orderDetailsHTML += '<th>#</th>'
	// orderDetailsHTML += '<th >Product</th>'
	// orderDetailsHTML += '<th >Name</th>'
	// orderDetailsHTML += '<th price">Price</th>'
	// orderDetailsHTML += '<th >Quantity</th>'
	// orderDetailsHTML += '<th >Total</th>'
	// orderDetailsHTML += '<th >Expected Delivery</th>'
	// orderDetailsHTML += '<th></th>'
	// orderDetailsHTML += '</tr>'
	// orderDetailsHTML += '</thead>'
	// orderDetailsHTML += '<tbody>'


	// for(i=0;i<quoteLine.length;i++){
	// 	const quoteItem = quoteLine[i];

	// 	orderDetailsHTML += '<tr>'
	// 	orderDetailsHTML += '<td ><a href="#"><img src="assets/img/s-product/product.jpg" alt=""></a></td>'
	// 	orderDetailsHTML += '<td ><a href="#">'+safeAccess(["item","name"],quoteItem,"-")+'</a></td>'
	// 	orderDetailsHTML += '<td price">'+safeAccess(["price"],quoteItem,"-")+'</td>'
	// 	orderDetailsHTML += '<td >'+safeAccess(["qty"],quoteItem,"-")+'</td>'
	// 	orderDetailsHTML += '<td >'+safeAccess(["total"],quoteItem,"-")+'</td>'
	// 	orderDetailsHTML += '<td >'+safeAccess(["expected_delivery_date"],quoteItem,"-")+'</td>'
	// 	orderDetailsHTML += '</tr>'
	// }


	// orderDetailsHTML += '</tbody>'
	// orderDetailsHTML += '</table>'


    $("#orderDetails").append(orderDetailsHTML);
    $('#modal_orderDetails').modal('show');
}




async function deleteOrderLineItem(orderId, orderLineIds) {

  notifyInfo("Please wait");
    // var RowIndex = $(this).closest('tr');
    // var data = customerMasterTable.api().row(RowIndex).data();
    var onResponse = function(response){
        notifySuccess("Deleted successfully");
        // showOrderDetails(orderId, quoteLine)
        window.location.reload();
      };
      var onError =function(error){
        notifyError("Failed to delete!");
      };
    if(confirm("Delete this item?")){
      deleteOrderItem(orderId,orderLineIds,onResponse,onError);
      // console.log("successfully", orderId)
      // console.log("successfully", orderLineIds)
    }

}



async function cancelOrder(order){
  console.log("this is order : ". order)
}