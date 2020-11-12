var orderArr = [
					{	
						"orderId" : "ord10012020",
						"date" : "10th Jan 2020",
						"totalQuantity" : "2",
						"totalPrice" : "$1900",
						"status" : "Delivered",
						"orderDetails" : [
											{
												"productId" : "levas123",
												"productImage" : "",
												"productName" : "Leva s",
												"productQuantity" : "1",
												"productPrice" : "$900.00",
												"totalProductPrice" : "$900.00",
												"status" : "Delivered"

											},
											{
												"productId" : "levar123",
												"productImage" : "",
												"productName" : "Leva r",
												"productQuantity" : "1",
												"productPrice" : "$1000.00",
												"totalProductPrice" : "$1000.00",
												"status" : "In Transit"

											}
										]
					},
					{
						"orderId" : "ord20032020",
						"date" : "20th Mar 2020",
						"totalQuantity" : "2",
						"totalPrice" : "$1700",
						"status" : "In Transit",
						"orderDetails" : [
											{
												"productId" : "lineamini123",
												"productImage" : "",
												"productName" : "Linea Mini",
												"productQuantity" : "1",
												"productPrice" : "$900.00",
												"totalProductPrice" : "$900.00",
												"status" : "In Transit"

											},
											{
												"productId" : "modbar123",
												"productImage" : "",
												"productName" : "Modbar",
												"productQuantity" : "1",
												"productPrice" : "$800.00",
												"totalProductPrice" : "$800.00",
												"status" : "Delivered"

											}
										]
					},
				]


var itemMasterTable;

async function showQuotation(orderArr){
   itemMasterTable = $('#tableQuoteList').DataTable( {
   dom: 'Blfrtip',
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
              console.log("recordsTotal "+res.data.quotes.data.length)
              callback({
                draw:data.draw,
                recordsTotal: res.data.quotes.total,
                recordsFiltered: res.data.quotes.total,
                data: res.data.quotes.data
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
            // 'selectAll',
            // 'selectNone',
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
		      },
		       {
		        "title":"PDF",
		        render: function(data, type, row){
		           return "<button type=\"button\" id='btGeneratePDF' href='invoice.html?quote="+row.id+"' class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\">Generate</span></button>"
		          }

        }
        ]
      })

}


async function showOrderDetails(quoteLine){

	// var orderDetails = orderArr.filter(function(order){return order.orderId == orderId;});


	console.log("orderDetails : ",quoteLine)


	var orderDetailsHTML = ""
	$("#orderDetails").empty()


	orderDetailsHTML += '<table>'
	orderDetailsHTML += '<thead>'
	orderDetailsHTML += '<tr>'
	orderDetailsHTML += '<th class="product_thumb">Product</th>'
	orderDetailsHTML += '<th class="product_code">Code</th>'
	orderDetailsHTML += '<th class="product_name">Name</th>'
	orderDetailsHTML += '<th class="product-price">Price</th>'
	orderDetailsHTML += '<th class="product_quantity">Quantity</th>'
	orderDetailsHTML += '<th class="product_total">Total</th>'
	orderDetailsHTML += '<th class="product_status">Expected Dispatch</th>'
	orderDetailsHTML += '<th></th>'
	orderDetailsHTML += '</tr>'
	orderDetailsHTML += '</thead>'
	orderDetailsHTML += '<tbody>'


	for(i=0;i<quoteLine.length;i++){
		const quoteItem = quoteLine[i];

		orderDetailsHTML += '<tr>'
		if(quoteItem.item.item_images[0]){

		orderDetailsHTML += '<td class="product_thumb"><a href="#"><img src="'+quoteItem.item.item_images[0]["image"]["image"]+'" alt=""></a></td>'
		}else{

		orderDetailsHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/lma_catalog_img.png" alt=""></a></td>'
		}
		orderDetailsHTML += '<td class="product_name"><a>'+safeAccess(["item","code"],quoteItem,"-")+'</a></td>'
		orderDetailsHTML += '<td class="product_name"><a>'+safeAccess(["item","name"],quoteItem,"-")+'</a></td>'
		orderDetailsHTML += '<td class="product-price">'+safeAccess(["price"],quoteItem,"-")+'</td>'
		orderDetailsHTML += '<td class="product_quantity">'+safeAccess(["qty"],quoteItem,"-")+'</td>'
		orderDetailsHTML += '<td class="product_total">'+safeAccess(["total"],quoteItem,"-")+'</td>'
		orderDetailsHTML += '<td class="product_total">'+safeAccess(["expected_delivery_date"],quoteItem,"-")+'</td>'
		orderDetailsHTML += '</tr>'
	}


	orderDetailsHTML += '</tbody>'
	orderDetailsHTML += '</table>'


    $("#orderDetails").append(orderDetailsHTML);
    $('#modal_box').modal('show');
}


$(document).ready(function(){
	showQuotation();

  $('#tableQuoteList').on('click', '#btnDetails', function () {
  	var RowIndex = $(this).closest('tr');
    var data = $('#tableQuoteList').dataTable().api().row(RowIndex).data();
  	showOrderDetails(data.quote_line);
  });
  $('#tableQuoteList').on('click', '#btGeneratePDF', function () {
  	var RowIndex = $(this).closest('tr');
    var data = $('#tableQuoteList').dataTable().api().row(RowIndex).data();
  	window.location.href = "invoice.html?quote="+data.id;
  });


  $('#tableQuoteList').on('click', '#btnAddToCart',async function () {
  		var RowIndex = $(this).closest('tr');
    	var data = $('#tableQuoteList').dataTable().api().row(RowIndex).data();
    	if(data.is_archived==1){
    		if(confirm("This quotation has expired.Please create a new one")){
    			window.location.href = ("cart.html");
    		}
    	}else{
  			window.location.href = ("checkout.html?quote="+data.id);
  	}
    	// notifyInfo("Adding items to cart");
    	// for(var item of data.quote_line){
    	// 	await shoppingCart.addItemToCart(item.item.id,item.item.name,item.price,item.qty);
    	// }
    	// window.location.href  ="cart.html";
  });

  
});
