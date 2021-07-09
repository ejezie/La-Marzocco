var itemMasterTable;
async function showOrders(orderArr) {
    itemMasterTable = $('#tableOrders').DataTable({
        dom: 'Blfrtip',
        searching: false,
        processing: true,
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
                console.log("recordsTotal " + res.data.quotes.data.length)
                callback({
                    draw: data.draw,
                    recordsTotal: res.data.quotes.total,
                    recordsFiltered: res.data.quotes.total,
                    data: res.data.quotes.data
                });

            };
            var onError = function(error) {
                console.log(error);
                dismiss(loadingId);
            };
            var pageIndex = data.start / data.length + 1;
            getQuotationList(onResponse, onError, pageIndex, data.length);
        },
        buttons: [{
                extend: 'csv',
                titleAttr: 'CSV export.',
                text: 'CSV',
                extension: '.csv'
            },
            {
                extend: 'pdf',
                titleAttr: 'Copy table data.',
                text: 'PDF'
            }
        ],
        columns: [
            {
                "title": "Date",
                render: function(data, type, row, meta) {
                    // console.log(JSON.stringify(row,null,2))
                    return safeAccess(['created_at', ], row, "").match(/([^T]+)/)[0].split("-").reverse().join("/");
                }
            },
            {
                "title": "Quote Id",
                render: function(data, type, row, meta) {
                    return safeAccess(['id'], row, "")
                }
            },

            {
                "title": "Company Name",
                render: function(data, type, row, meta) {
                    return safeAccess(['company_name'], row['user']['customer']['customer_master'], "")
                }
            },
            {
                "title": "Customer Name",
                render: function(data, type, row, meta) {
                    return safeAccess(['first_name'], row['user'], "")
                }
            },


            {
                "title": "Items",
                render: function(data, type, row) {
                    return safeAccess(['quote_line', ], row, []).length;
                }
            },
            {
                "title": "Price",
                render: function(data, type, row) {
                    return "$" + safeAccess(['total'], row, "-").toLocaleString("en-AU");
                }
            },
            {
                "title": "Product Details",
                render: function(data, type, row) {
                    // if(row.status != "cancelled"){
                    return "<button type=\"button\" id='btnDetails' class=\"btn btn-default btn-sm\"><span class=\"fa fa-bars\" style=\"white-space: nowrap;\"> Details</span></button>"
                    // }
                }
            },
            {
                "title": " <input type=\"checkbox\" class=\"checkall\" id =\"checkall\" >",
                render: function(data, type, row, meta) {
                    // console.log(JSON.stringify(row,null,2))
                    return "<input type=\"checkbox\" style=\"margin-left:10px\" value=" + row.id + " class=\"delete_check\">";
                }
            },

        ]
    })

}

$(document).ready(function() {
    // alert("sdad")
    showOrders();

    $('#tableOrders').on('click', '#btnDetails', function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableOrders').dataTable().api().row(RowIndex).data();

        showQuoteDetails(data.id, data.quote_line);
    });


    $('#tableOrders').on('click', '#btnTrackOrder', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableOrders').dataTable().api().row(RowIndex).data();
        notifyInfo("Please wait");
        trackOrder(data.id, function(res) {
            showOrderTrackingDetails(res.data.track_items);
        })

    });
    $('#selectBulkUpdate').on('change', function(){
        var deleteids_arr = [];
        $("input:checkbox[class=delete_check]:checked").each(function() {
            deleteids_arr.push($(this).val());
        });
        if (deleteids_arr.length > 0) {
            // deleteQuotation(deleteids_arr,onResponse,onError);
            var onError = function(error) {
                notifyError("Failed to Delete Quotation");
            };
            var onResponse = function(response) {
                if (response.data.status == true) {
                    notifySuccess("Quotation Deleted Successfully");
                    location.reload();
                } else {
                    notifyError(response.data.message);
                }
            };
            if (confirm("Proceed to  Delete Quotation ?")) {
                bulkDeleteQuotation(deleteids_arr, onResponse, onError);
            }
        } else {
            alert('Please select quatation')
        }
    });

    // $('#tableOrders').on('click', '#delete_record', async function() {
    //     var deleteids_arr = [];
    //     $("input:checkbox[class=delete_check]:checked").each(function() {
    //         deleteids_arr.push($(this).val());
    //     });
    //     if (deleteids_arr.length > 0) {
    //         // deleteQuotation(deleteids_arr,onResponse,onError);
    //         var onError = function(error) {
    //             notifyError("Failed to Delete Quotation");
    //         };
    //         var onResponse = function(response) {
    //             if (response.data.status == true) {
    //                 notifySuccess("Quotation Deleted Successfully");
    //                 location.reload();
    //             } else {
    //                 notifyError(response.data.message);
    //             }
    //         };
    //         if (confirm("Proceed to  Delete Quotation ?")) {
    //             deleteQuotation(deleteids_arr, onResponse, onError);
    //         }
    //     } else {
    //         alert('Please select quatation')
    //     }
    // });

    $('#tableOrders').on('click', '#checkall', async function() {

        if ($(this).is(':checked')) {
            $('.delete_check').prop('checked', true);
        } else {
            $('.delete_check').prop('checked', false);
        }

    });
    $('#tableOrders').on('click', '#btnCancelOrder', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableOrders').dataTable().api().row(RowIndex).data();
        console.log("this id data  : ", data)
        var order_item_arr = []
        for (i = 0; i < data["order_line"].length; i++) {
            order_item_arr.push(data["order_line"][i]["id"])
        }
        var orderId = data["id"]
        var orderLineIds = order_item_arr.toString()
        deleteOrderLineItem(orderId, orderLineIds)
    });
});



async function showOrderTrackingDetails(items) {
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

    for (i = 0; i < items.length; i++) {
        const item = items[i];

        orderDetailsHTML += '<tr>'
        orderDetailsHTML += '<th scope="row">' + (i + 1) + '</th>'
        orderDetailsHTML += '<td>' + safeAccess(["item_part_number"], item, "-") + '</td>'
        orderDetailsHTML += '<td>' + safeAccess(["quantity"], item, "-") + '</td>'
        orderDetailsHTML += '<td>' + safeAccess(["status"], item, "-") + '</td>'
        orderDetailsHTML += '<td>' + safeAccess(["awb"], item, "-") + '</td>'
        orderDetailsHTML += '</tr>'
    }


    orderDetailsHTML += '</tbody>'
    orderDetailsHTML += '</table>'


    $("#orderTrackingDetails").append(orderDetailsHTML);
    $('#modal_tracking').modal('show');
}

async function showQuoteDetails(orderId, quoteLine) {

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

    for (i = 0; i < quoteLine.length; i++) {
        const quoteItem = quoteLine[i];

        console.log("quoteItem : ", quoteItem)

        orderDetailsHTML += '<tr>'
        orderDetailsHTML += '<th scope="row">' + (i + 1) + '</th>'
        orderDetailsHTML += '<td><img src="../assets/img/s-product/product.jpg" alt=""></td>'
        orderDetailsHTML += '<td>' + safeAccess(["item", "code"], quoteItem, "-") + '</td>'
        orderDetailsHTML += '<td>' + safeAccess(["item", "name"], quoteItem, "-") + '</td>'
        orderDetailsHTML += '<td>$' + safeAccess(["price"], quoteItem, "-") + '</td>'
        orderDetailsHTML += '<td>' + safeAccess(["qty"], quoteItem, "-") + '</td>'
        orderDetailsHTML += '<td>$' + safeAccess(["total"], quoteItem, "-") + '</td>'
        orderDetailsHTML += '<td>' + safeAccess(["expected_delivery_date"], quoteItem, "-") + '</td>'
        if (quoteItem.status == "cancelled") {
            orderDetailsHTML += '<td>Archived</td>'
        } else {

            orderDetailsHTML += '<td><a ><i onclick="deleteOrderLineItem(' + orderId + ',' + quoteItem.id + ')" class="fa fa-trash-o" style="width: 30px;font-size:17px"></i></a></td>'
        }
    }
    orderDetailsHTML += '</tr>'

    orderDetailsHTML += '</tbody>'
    orderDetailsHTML += '</table>'


    $("#orderDetails").append(orderDetailsHTML);
    $('#modal_orderDetails').modal('show');
}


async function deleteOrderLineItem(orderId, orderLineIds) {
    notifyInfo("Please wait");
    var onResponse = function(response) {
        notifySuccess("Deleted successfully");
        window.location.reload();
    };
    var onError = function(error) {
        notifyError("Failed to delete!");
    };
    if (confirm("Delete this item?")) {
        deleteOrderItem(orderId, orderLineIds, onResponse, onError);
    }

}



async function cancelOrder(order) {
    console.log("this is order : ".order)
}