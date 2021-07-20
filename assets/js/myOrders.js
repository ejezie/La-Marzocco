var orderArr = [{
        "orderId": "ord10012020",
        "date": "10th Jan 2020",
        "totalQuantity": "2",
        "totalPrice": "$1900",
        "status": "Delivered",
        "orderDetails": [{
                "productId": "levas123",
                "productImage": "",
                "productName": "Leva s",
                "productQuantity": "1",
                "productPrice": "$900.00",
                "totalProductPrice": "$900.00",
                "status": "Delivered"

            },
            {
                "productId": "levar123",
                "productImage": "",
                "productName": "Leva r",
                "productQuantity": "1",
                "productPrice": "$1000.00",
                "totalProductPrice": "$1000.00",
                "status": "In Transit"

            }
        ]
    },
    {
        "orderId": "ord20032020",
        "date": "20th Mar 2020",
        "totalQuantity": "2",
        "totalPrice": "$1700",
        "status": "In Transit",
        "orderDetails": [{
                "productId": "lineamini123",
                "productImage": "",
                "productName": "Linea Mini",
                "productQuantity": "1",
                "productPrice": "$900.00",
                "totalProductPrice": "$900.00",
                "status": "In Transit"

            },
            {
                "productId": "modbar123",
                "productImage": "",
                "productName": "Modbar",
                "productQuantity": "1",
                "productPrice": "$800.00",
                "totalProductPrice": "$800.00",
                "status": "Delivered"

            }
        ]
    },
]

async function showCart(orderArr) {

    var myOrdersHTML = ""


    myOrdersHTML += '<table>'
    myOrdersHTML += '<thead>'
    myOrdersHTML += '<tr>'
    myOrdersHTML += '<th class="product_name">Date</th>'
    myOrdersHTML += '<th >Items</th>'
    myOrdersHTML += '<th class="product_quantity">Quantity</th>'
    myOrdersHTML += '<th class="product-price">Price</th>'
    // myOrdersHTML += '<th >Status</th>'
    myOrdersHTML += '</tr>'
    myOrdersHTML += '</thead>'
    myOrdersHTML += '<tbody>'

    for (i = 0; i < orderArr.length; i++) {

        myOrdersHTML += '<tr>'
        myOrdersHTML += '<td >' + orderArr[i]["date"] + '</td>'
        myOrdersHTML += '<td><a class="primary" data-toggle="modal" data-target="#modal_box" id=' + orderArr[i]["orderId"] + ' onclick="showOrderDetails(`' + orderArr[i]["orderId"] + '`)">View Details</a></td>'
        myOrdersHTML += '<td>' + orderArr[i]["totalPrice"] + '</td>'
        myOrdersHTML += '<td class="product_total">' + orderArr[i]["totalPrice"] + '</td>'
        myOrdersHTML += '</tr>'
    }

    myOrdersHTML += '</tbody>'
    myOrdersHTML += '</table>'

    $("#myOrders").append(myOrdersHTML)
}

function capitalize(str) {
    strVal = '';
    str = str.split(' ');
    for (var chr = 0; chr < str.length; chr++) {
        strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
    }
    return strVal
}

var itemMasterTable;
async function showOrders(orderArr) {
    itemMasterTable = $('#tableOrders').DataTable({
        dom: 'Blfrtip',
        processing: true,
        autoWidth: true,
        serverSide: true,
        pageLength: 10,
        bSort: false,
        lengthMenu: [
            [10, 20, 500, 1000, -1],
            [10, 20, 500, 1000, "All"]
        ],
        columnDefs: [{
                orderable: false,
                className: 'select-checkbox',
                targets: 0
            },
            {
                targets: '_all',
                defaultContent: '-'
            },
        ],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        order: [
            [1, 'asc']
        ],
        ajax: function(data, callback, settings) {
            const loadingId = notifyInfo("Please wait");
            var onResponse = function(res) {
                dismiss(loadingId);
                console.log("recordsTotal " + res.data.order.data.length)
                callback({
                    draw: data.draw,
                    recordsTotal: res.data.order.total,
                    recordsFiltered: res.data.order.total,
                    data: res.data.order.data
                });

            };
            var onError = function(error) {
                console.log(error);
                dismiss(loadingId);
            };
            var pageIndex = data.start / data.length + 1;
            getOrderList(onResponse, onError, pageIndex, data.length);
        },
        buttons: [],
        columns: [

            {
                "title": "Date",
                render: function(data, type, row, meta) {
                    // console.log(JSON.stringify(row,null,2))
                    return safeAccess(['created_at'], row, "").match(/([^T]+)/)[0].split("-").reverse().join("/");;
                }
            },
            {
                "title": "PO",
                render: function(data, type, row) {
                    return safeAccess(['po_number'], row, "");
                }
            },
            {
                "title": "Items",
                render: function(data, type, row) {
                    return safeAccess(['order_line'], row, []).length;
                }
            },
            {
                "title": "Product Details",
                render: function(data, type, row) {
                    return "<button type=\"button\" id='btnDetails' class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\">Products</span></button>"
                }
            },
            {
                "title": "Price",
                render: function(data, type, row) {
                    return "$" + safeAccess(['total'], row, "-").toLocaleString("en-AU");
                }
            },
            {
                "title": "Re Order",
                render: function(data, type, row) {
                    return "<button type=\"button\" id='reBtnDetails' class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\">Re Order</span></button>"
                }
            },
            {
                "title": "Order Id",
                render: function(data, type, row, meta) {
                    // console.log(JSON.stringify(row,null,2))
                    return safeAccess(['sap_order_id'], row, "");;
                }
            },

            {
                "title": "Track Order",
                render: function(data, type, row) {
                    return "<button type=\"button\" id='btnTrackOrder' class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\">Track</span></button>"
                }
            },
            {
                "title": "Status",
                render: function(data, type, row, meta) {
                    // console.log(JSON.stringify(row,null,2))
                    return capitalize(safeAccess(['status'], row, "-"));
                },
            },
        ]
    })

}
$(document).ready(function() {
    showOrders();

    $('#tableOrders').on('click', '#btnDetails', function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableOrders').dataTable().api().row(RowIndex).data();
        showOrderDetails(data.order_line);
    });

    $('#tableOrders').on('click', '#reBtnDetails', function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableOrders').dataTable().api().row(RowIndex).data();
        repeatShowOrderDetails(data.order_line);
    })

    $('#tableOrders').on('click', '#btnTrackOrder', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableOrders').dataTable().api().row(RowIndex).data();
        notifyInfo("Please wait");
        trackOrder(data.id, function(res) {
            showOrderTrackingDetails(res.data.track_items);
        })
    });
});

async function showOrderTrackingDetails(items) {
    var orderDetailsHTML = ""
    $("#orderTrackingDetails").empty()
    orderDetailsHTML += '<table style="width:inherit">'
    orderDetailsHTML += '<thead>'
    orderDetailsHTML += '<tr>'
    orderDetailsHTML += '<th class="product_thumb">Item Part No.</th>'
    orderDetailsHTML += '<th class="product_name">Quantity</th>'
    orderDetailsHTML += '<th class="product-status">Status</th>'
    orderDetailsHTML += '<th class="product-awb">AWB</th>'
    orderDetailsHTML += '<th class="product-awb">Track</th>'
    orderDetailsHTML += '<th></th>'
    orderDetailsHTML += '</tr>'
    orderDetailsHTML += '</thead>'
    orderDetailsHTML += '<tbody>'
    for (i = 0; i < items.length; i++) {
        const item = items[i];
        orderDetailsHTML += '<tr>'
        orderDetailsHTML += '<td class="product_name"><a>' + safeAccess(["item_part_number"], item, "-") + '</a></td>'
        orderDetailsHTML += '<td class="product_name"><a>' + safeAccess(["quantity"], item, "-") + '</a></td>'
        // orderDetailsHTML += '<td class="product_name"><a>'+safeAccess(["name"],item,"-")+'</a></td>'
        orderDetailsHTML += '<td class="product_name"><a>' + safeAccess(["status"], item, "-") + '</a></td>'
        orderDetailsHTML += '<td class="product_name"><a>' + safeAccess(["awb"], item, "-") + '</a></td>'
        if (safeAccess(["awb"], item)) {
            const awb = safeAccess(["awb"], item);
            orderDetailsHTML += '<td class="product_name"><a target="_blank" rel="noopener noreferrer" href="https://trackingtool.efmlogistics.com.au/?id=' + awb + '">' + awb + '</a></td>'
        } else {
            orderDetailsHTML += '<td class="product_name"><a>-</a></td>'

        }
        orderDetailsHTML += '</tr>'
    }
    orderDetailsHTML += '</tbody>'
    orderDetailsHTML += '</table>'
    $("#orderTrackingDetails").append(orderDetailsHTML);
    $('#modal_tracking').modal('show');
}
async function showOrderDetails(quoteLine) {
    var orderDetailsHTML = ""
    $("#orderDetails").empty()
    orderDetailsHTML += '<table style="width:inherit">'
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
    for (i = 0; i < quoteLine.length; i++) {
        const quoteItem = quoteLine[i];
        console.log("quoteItem : ", quoteItem)
        orderDetailsHTML += '<tr>'
        if (quoteItem.item.item_images[0]) {

            orderDetailsHTML += '<td class="product_thumb"><a href="#"><img src="' + quoteItem.item.item_images[0]["image"]["image"] + '" alt=""></a></td>'
        } else {

            orderDetailsHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/lma_catalog_img.png" alt=""></a></td>'
        }
        orderDetailsHTML += '<td class="product_name"><a href="#">' + safeAccess(["item", "code"], quoteItem, "-") + '</a></td>'
        orderDetailsHTML += '<td class="product_name"><a href="#">' + safeAccess(["item", "name"], quoteItem, "-") + '</a></td>'
        orderDetailsHTML += '<td class="product-price">$' + safeAccess(["price"], quoteItem, "-").toLocaleString("en-AU") + '</td>'
        orderDetailsHTML += '<td class="product_quantity">' + safeAccess(["qty"], quoteItem, "-") + '</td>'
        orderDetailsHTML += '<td class="product_total">$' + safeAccess(["total"], quoteItem, "-").toLocaleString("en-AU") + '</td>'
        orderDetailsHTML += '<td class="product_total">' + safeAccess(["expected_delivery_date"], quoteItem, "-") + '</td>'
        orderDetailsHTML += '</tr>'
    }

    orderDetailsHTML += '</tbody>'
    orderDetailsHTML += '</table>'
    $("#orderDetails").append(orderDetailsHTML);
    $('#modal_box').modal('show');
}
async function repeatShowOrderDetails(quoteLine) {
    var orderDetailsHTML = ""
    $("#orderDetails").empty()
    orderDetailsHTML += '<table id="repeatOrderTable" style="width:inherit">'
    orderDetailsHTML += '<thead>'
    orderDetailsHTML += '<tr>'
    orderDetailsHTML += '<th class="product_thumb">Product</th>'
    orderDetailsHTML += '<th class="product_code">Code</th>'
    orderDetailsHTML += '<th class="product_name">Name</th>'
    orderDetailsHTML += '<th class="product_status">Quantity</th>'
    orderDetailsHTML += '<th></th>'
    orderDetailsHTML += '</tr>'
    orderDetailsHTML += '</thead>'
    orderDetailsHTML += '<tbody>'
    for (i = 0; i < quoteLine.length; i++) {
        const quoteItem = quoteLine[i];
        console.log("quoteItem : ", quoteItem)
        orderDetailsHTML += '<tr>'
        if (quoteItem.item.item_images[0]) {

            orderDetailsHTML += '<td class="product_thumb" id="testid" ><a href="#"><img src="' + quoteItem.item.item_images[0]["image"]["image"] + '" class="re_Order_Image" alt=""></a></td>'
        } else {

            orderDetailsHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/lma_catalog_img.png" class="re_Order_Image" alt=""></a></td>'
        }
        orderDetailsHTML += '<td class="product_name"><a href="#">' + safeAccess(["item", "code"], quoteItem, "-") + '</a></td>'
        orderDetailsHTML += '<td class="product_name"><a href="#">' + safeAccess(["item", "name"], quoteItem, "-") + '</a></td>'
        var inputId = "inputQuantity" + i
        orderDetailsHTML += '<td class="product_total"><input id="' + inputId + '"  min="1" max="100"  value="' + safeAccess(["qty"], quoteItem, "-") + '" type="number"></td>'
        orderDetailsHTML += '</tr>'
    }

    orderDetailsHTML += '</tbody>'
    orderDetailsHTML += '</table>'
    orderDetailsHTML += '<br>'
    orderDetailsHTML += '<button type="button"  id="btAddToCart" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-edit">Add To Cart</span></button>'
    orderDetailsHTML += '<br>'
    console.log("orderDetailsHTML", orderDetailsHTML)
    $("#orderDetails").append(orderDetailsHTML);
    $('#modal_box').modal('show');
    $("section").each(function() {
        $(this).data("serial", current);
        current++;
    });


    $("#btAddToCart").click(async function() {
        var counters = 0;
        var flage = false;
        for (m = 0; m < quoteLine.length; m++) {
            const newQty = $("#inputQuantity" + m).val();
            var itemId = quoteLine[m]["item_id"]
            if (newQty == '') {
                notifyError("Amount Should not Empty!");
                
            } else if (newQty > 100){
                // counters = counters + 1;
                notifyError("Amount should not greater than 100!");
                
            }else if(newQty <= 0){
                notifyError("Amount should not equal to 0!");
                
            }else{
                 shoppingCart.modify(itemId, newQty, function() { reloadMiniCart(); });
            }
            // if (quoteLine.length === counters) {
            //     flage = true;
            //     counters = 0;
            //     console.log("flage  >>>>>>>>>> ", flage)
            // }
        }
        // if (flage === true) {
        //     for (m = 0; m < quoteLine.length; m++) {
        //         const newQty = $("#inputQuantity" + m).val();
        //         var itemId = quoteLine[m]["item_id"];
        //         shoppingCart.modify(itemId, newQty, function() { reloadMiniCart(); });
        //     }
        // }
    });
}