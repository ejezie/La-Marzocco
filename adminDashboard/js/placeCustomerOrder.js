var itemArr = [
                    {
                        "ItemCode" : "levas123",
                        "productName" : "Leva s",
                        "productPrice" : "$1000"
                    },
                    {
                        "ItemCode" : "lineamini123",
                        "productName" : "Linea Mini",
                        "productPrice" : "$980"
                    }
                ]





// Upload Excel Data function
function ExportToTable(action) {

    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
    /*Checks whether the file is a valid excel file*/  
    if (regex.test($("#excelfile").val().toLowerCase())) {
        var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
        if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
            xlsxflag = true;  
        }  
         /*Checks whether the browser supports HTML5*/  
        if (typeof (FileReader) != "undefined") {  
            var reader = new FileReader();  
            reader.onload = function (e) {  
                var data = e.target.result;
     
             /*Converts the excel data in to object*/  
            if (xlsxflag) {  
                var workbook = XLSX.read(data, { type: 'binary' });  
            }  
            else{  
                var workbook = XLS.read(data, { type: 'binary' });  
            }  


            /*Gets all the sheetnames of excel in to a variable*/  
            var sheet_name_list = workbook.SheetNames;  

            var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
            sheet_name_list.forEach(async function (y) { /*Iterate through all sheets*/  
                 /*Convert the cell value to Json*/  
                if (xlsxflag) {  
                     var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]); 
                      
                      
                     // Column names
                     var keys = Object.keys(exceljson[1]);
                     excel_column_names = keys;
                     console.log(keys)
                }  
                else{  
                    var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                      // Column names
                    var keys = Object.keys(exceljson[1]);
                    excel_column_names = keys;
                }  

                 // Ckeck if the uploaded excel contains all required columns
                let requiredcolumns = ["ItemCode","Quantity"],
                     uploadedcolumns = keys;
                let checker = (arr, target) => target.every(v => arr.includes(v));

                console.log(checker(uploadedcolumns, requiredcolumns));
                 
                  // if (checker(uploadedcolumns, requiredcolumns)== true) {
                if (uploadedcolumns.length >0) {
                    // For preview of the uploaded data
                    if (action == 'Preview'){
                        console.log("exceljson :  ",exceljson)
                        var excelDataWithQty = exceljson.filter(function(item){return parseInt(item.Quantity) > 0;});
                        showBulkOrders(excelDataWithQty)
                    } 
                }else {
                    alert("Enter Valid Data ")
                }
        
            });  

        }  
        if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
            reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
        }  
        else {  
            reader.readAsBinaryString($("#excelfile")[0].files[0]);     
        }  
    }  
    else {  
        alert("Sorry! Your browser does not support HTML5!");  
    }  
    }  
    else {  
     alert("Please upload a valid Excel file!");  
    }  

} 


$(document).ready(function(){

    var customerDropdown = $("#targetCustomer");
    customerDropdown.empty();

      var onResponse = function(response){
        for(var i=0; i< response.data.customers.data.length; i++){
          const customer = response.data.customers.data[i];
          // customerDropdown.append($("<option>").text(safeAccess(["first_name"],customer,"") +" "+ safeAccess(["last_name"],customer,"") ).val(customer.id));
          customerDropdown.append($("<option>").text(safeAccess(["company_name"],customer,"")+" ("+safeAccess(["email"],customer,"")+")").val(customer.id));
        }
        setCurrentManagedUser($("#targetCustomer").val());

      };
      var onError =function(error){
        notifyError("Failed to load customers.Please reload page");
      };
    getConnectedCustomers(onResponse,onError)

        $("#uploadFile").click(function(){
            uploadCart();
        })
})


async function showBulkOrders(bulkOrderData){

    console.log(bulkOrderData)

    $("#bulkOrders").empty(bulkOrdersHTML)


    var bulkOrdersHTML = ""

    bulkOrdersHTML += '<div class="cart_page table-responsive" >'
    bulkOrdersHTML += '<table  class="table table-striped jambo_table">'
    bulkOrdersHTML += '<thead>'
    bulkOrdersHTML += '<tr>'
    bulkOrdersHTML += '<th class="product_thumb">Product</th>'
    bulkOrdersHTML += '<th class="product_name">Name</th>'
    bulkOrdersHTML += '<th class="product-price">Price</th>'
    bulkOrdersHTML += '<th class="product_quantity">Quantity</th>'
    bulkOrdersHTML += '<th class="product_total">Total</th>'
    bulkOrdersHTML += '</tr>'
    bulkOrdersHTML += '</thead>'
    bulkOrdersHTML += '<tbody>'

    for(i=0; i<bulkOrderData.length;i++){

        var ItemCode = bulkOrderData[i]["ItemCode"]
        var orderItem = itemArr.filter(function(item){return item.ItemCode == ItemCode;});

        bulkOrdersHTML += '<tr>'
        bulkOrdersHTML += '<td class="product_thumb"><a href="#"><img src="../assets/img/s-product/product.jpg" alt=""></a></td>'
        bulkOrdersHTML += '<td class="product_name"><a href="#">'+orderItem[0]["productName"]+'</a></td>'
        bulkOrdersHTML += '<td class="product-price">'+orderItem[0]["productPrice"]+'</td>'
        bulkOrdersHTML += '<td class="product_quantity">'+bulkOrderData[i]["Quantity"]+'</td>'

        var productPrice = orderItem[0]["productPrice"].substr(1)

        bulkOrdersHTML += '<td class="product_total">$'+parseInt(productPrice)* parseInt(bulkOrderData[i]["Quantity"])+'</td>'
        bulkOrdersHTML += '</tr>'
    }

                                        

    bulkOrdersHTML += '</tbody>'
    bulkOrdersHTML += '</table>'
    bulkOrdersHTML += '</div>'
    bulkOrdersHTML += '<div class="cart_submit">'
    bulkOrdersHTML += '<!-- <button type="submit">update cart</button> -->'
    bulkOrdersHTML += '<button type="button" onclick="uploadCart()">Add to Cart </button>'
    bulkOrdersHTML += '</div>'

    $("#bulkOrders").append(bulkOrdersHTML)
}




$(document).ready(function(){
  
   clearCart(function(res){
              notifySuccess("Cart Cleared")
            })
  $("#downloadCatalog").click(function(){
    exportCatalog(function(res){
       var fileUrl = safeAccess(["data","file"],res);
       if(fileUrl){
        var a = document.createElement('A');
        a.href = fileUrl;
        a.download = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
       }else{
        notifyError("Something went wrong")
       }
    })
  })
  $("#targetCustomer").change(function(){
    setCurrentManagedUser($("#targetCustomer").val());
  })

});
 function uploadCart() {
    notifyInfo("Please wait")
      var xlsx = document.querySelector('#excelfile');
      var onResponse = function(response){
            notifySuccess("File uploaded!");
            window.location.href = "cart.html"
      };
      var onError =function(error){
        var errorMessage = safeAccess(["response","data","message"],error,"Failed to upload");
        if(!errorMessage.includes("Please remove your old cart entries")){
          notifyError(errorMessage);
        }else{
          if(confirm("Cart must be emptied first")){
            clearCart(function(res){
              notifySuccess("Cart Cleared!")
            })
          }
        }
      };
            bulkUploadCartItems($("#targetCustomer").val(),xlsx.files[0],onResponse,onError);
}