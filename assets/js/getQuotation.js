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




async function showQuotation(orderArr){

	// var myOrdersHTML = ""



	// for(i=0;i<orderArr.length;i++){

	// 	myOrdersHTML += '<tr>'
	// 	myOrdersHTML += '<td >'+orderArr[i]["date"]+'</td>'
	// 	myOrdersHTML += '<td><a class="primary" data-toggle="modal" data-target="#modal_box" id='+orderArr[i]["orderId"]+' onclick="showOrderDetails(`'+orderArr[i]["orderId"]+'`)">View Details</a></td>'
	// 	myOrdersHTML += '<td>'+orderArr[i]["totalPrice"]+'</td>'
	// 	myOrdersHTML += '<td class="product_total">'+orderArr[i]["totalPrice"]+'</td>'
	// 	// myOrdersHTML += '<td>'+orderArr[i]["status"]+'</td>'
	// 	myOrdersHTML += '</tr>'


	// }


	// $("#myOrders").append(myOrdersHTML)


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
            'selectAll',
            'selectNone',
              ],
              columns: [
            
              {
                "title":"Date",
                render: function(data, type, row, meta){
                  // console.log(JSON.stringify(row,null,2))
                  return safeAccess(['created_at',],row,"");
                }
              },
              {
                "title":"Items",
                render: function(data, type, row){
                  return safeAccess(['quote_line',],row,[]).length;
                }
              },
              {
                "title":"Quantity",
                render: function(data, type, row){
                  return safeAccess(['quote_line',],row,[]).length;
                }
              },
              {
                "title":"Price",
                render: function(data, type, row){
                  return  safeAccess(['total'],row,"-");
                }
              },
              {
                "title":"Details",
                render: function(data, type, row){
                  return "Details";
                }
              },
              {
                "title":"Add to Cart",
                render: function(data, type, row){
                  return "Add to cart";
                }
              }
        ]
      })
}


async function showOrderDetails(orderId){

	var orderDetails = orderArr.filter(function(order){return order.orderId == orderId;});


	console.log("orderDetails : ",orderDetails[0]["orderDetails"])


	var orderDetailsHTML = ""
	$("#orderDetails").empty()


	orderDetailsHTML += '<table>'
	orderDetailsHTML += '<thead>'
	orderDetailsHTML += '<tr>'
	orderDetailsHTML += '<th class="product_thumb">Product</th>'
	orderDetailsHTML += '<th class="product_name">Name</th>'
	orderDetailsHTML += '<th class="product-price">Price</th>'
	orderDetailsHTML += '<th class="product_quantity">Quantity</th>'
	orderDetailsHTML += '<th class="product_total">Total</th>'
	orderDetailsHTML += '<th class="product_status">Status</th>'
	orderDetailsHTML += '<th></th>'
	orderDetailsHTML += '</tr>'
	orderDetailsHTML += '</thead>'
	orderDetailsHTML += '<tbody>'


	for(i=0;i<orderDetails[0]["orderDetails"].length;i++){

		orderDetailsHTML += '<tr>'
		orderDetailsHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/s-product/product.jpg" alt=""></a></td>'
		orderDetailsHTML += '<td class="product_name"><a href="#">'+orderDetails[0]["orderDetails"][i]["productName"]+'</a></td>'
		orderDetailsHTML += '<td class="product-price">'+orderDetails[0]["orderDetails"][i]["productPrice"]+'</td>'
		orderDetailsHTML += '<td class="product_quantity">'+orderDetails[0]["orderDetails"][i]["productQuantity"]+'</td>'
		orderDetailsHTML += '<td class="product_total">'+orderDetails[0]["orderDetails"][i]["totalProductPrice"]+'</td>'
		orderDetailsHTML += '<td class="product_total">'+orderDetails[0]["orderDetails"][i]["status"]+'</td>'
		orderDetailsHTML += '<td><a>Add to cart</a></td>'
		orderDetailsHTML += '</tr>'
	}


	orderDetailsHTML += '</tbody>'
	orderDetailsHTML += '</table>'


    $("#orderDetails").append(orderDetailsHTML)

}


$(document).ready(function(){
	showQuotation()
});
