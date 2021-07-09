
function itemIdExists(id,arr) {
	
  return arr.some(function(el) {
    return el.item_id === id;
  }); 
}
	async function showProductDetails(item, cart){

		getFavouriteItemList	=	favouriteItemList
		
		console.log("getFavouriteItemList ", getFavouriteItemList)

		var detailsHTML = ""
		detailsHTML += '<div class="container">'
		detailsHTML += '<div class="row">'
		detailsHTML += '<div class="col">'
		detailsHTML += '<div class="row">'
		detailsHTML += '<div class="col-lg-6 col-md-6">'
		detailsHTML += '<div class="product-details-tab">'
		detailsHTML += ''
		detailsHTML += '<div id="img-1" class="zoomWrapper single-zoom">'
		detailsHTML += '<a href="#">'
		detailsHTML += '<img id="productImage" alt="No image" onerror="this.src=`assets/img/lma_catalog_img.png`;" />'
		detailsHTML += '</a>'
		detailsHTML += '</div>'
		detailsHTML += '<button class="button fa fa-arrow-left" id="btPrevImage" type="button"></button>'
		detailsHTML += '<button class="button fa fa-arrow-right" id="btNextImage" type="button"></button>'
		detailsHTML += '</div>'
		detailsHTML += '</div>'
		detailsHTML += '<div class="col-lg-6 col-md-6">'
		detailsHTML += '<div class="product_d_right">'
		detailsHTML += '<form action="#">'
		detailsHTML += ''
		detailsHTML += '<h1>'+item["name"]+'</h1>'
		detailsHTML += '<div class="price_box">'
		detailsHTML += '<span class="current_price">'+item["price"]+'</span>'
		detailsHTML += ''
		detailsHTML += '<div class="product_variant quantity">'
	
		detailsHTML += '<label>quantity</label>'
		if(cart.length > 0){

			var cartItem = cart.filter(function(cartItem){return cartItem.item_id == item.id;});
    if(cartItem.length > 0){
      detailsHTML += '<input id="inputQuantity" onchange="changeQuantity('+item["id"]+',this.value)" min="1" max="100" value="'+cartItem[0].qty+'" type="number">'
			detailsHTML += '<button class="button"  id="btAddToCart" type="button">added to cart</button>'
					if(itemIdExists(Number(item.id),getFavouriteItemList)) {
			detailsHTML += '<span class="productImageDelete"  value="'+item.id+'" style="background-color:#fff;float:right" id='+item.id+'  ><img src="assets/img/Favorite/changed.jpg" style="width:50px;height:50px;text-align:right"></span>'
		}else{
			detailsHTML += '<span class="topSellingProducts" id="btAddToFav"  value="'+item.id+'" style="background-color:#fff;float:right" id='+item.id+'  ><img src="assets/img/Favorite/favorite.jpg" style="width:50px;height:50px;text-align:right"></span>'
		}
			// detailsHTML += '<button class="button"  id="btAddToFav" type="button">added to Fav</button>'
   }else {
      detailsHTML += '<input id="inputQuantity" onchange="changeQuantity('+item["id"]+',this.value)" min="1" max="100" value="1" type="number">'
			detailsHTML += '<button class="button" id="btAddToCart" type="button">add to cart</button>'
			if(itemIdExists(Number(item.id),getFavouriteItemList)) {
					detailsHTML += '<span class="productImageDelete"  value="'+item.id+'" style="background-color:#fff;float:right" id='+item.id+'  ><img src="assets/img/Favorite/changed.jpg" style="width:50px;height:50px;text-align:right"></span>'
				}else{
					detailsHTML += '<span class="topSellingProducts"  id="btAddToFav" value="'+item.id+'" style="background-color:#fff;float:right" id='+item.id+'  ><img src="assets/img/Favorite/favorite.jpg" style="width:50px;height:50px;text-align:right"></span>'
				}
			// detailsHTML += '<button class="button"  id="btAddToFav" type="button">added to Fav</button>'
    }
		}else{
			detailsHTML += '<input id="inputQuantity" onchange="changeQuantity('+item["id"]+',this.value)" min="1" max="100" value="1" type="number">'
			detailsHTML += '<button class="button" id="btAddToCart" type="button">add to cart</button>'
					if(itemIdExists(Number(item.id),getFavouriteItemList)) {
			detailsHTML += '<span class="productImageDelete"  value="'+item.id+'" style="background-color:#fff;float:right" id='+item.id+'  ><img src="assets/img/Favorite/changed.jpg" style="width:50px;height:50px;text-align:right"></span>'
		}else{
			detailsHTML += '<span class="topSellingProducts" id="btAddToFav" value="'+item.id+'" style="background-color:#fff;float:right" id='+item.id+'  ><img src="assets/img/Favorite/favorite.jpg" style="width:50px;height:50px;text-align:right"></span>'
		}
			// detailsHTML += '<button class="button"  id="btAddToFav" type="button">added to Fav</button>'
		}
		detailsHTML += ''
		detailsHTML += '</div>'
		// detailsHTML += '<button class="button" style="display:none;" id="btCustomize" type="button">CUSTOMIZE</button>'
		
		detailsHTML += '</form>'
		detailsHTML += '</div>'
		detailsHTML += '</div>'
		detailsHTML += '<div>'
		detailsHTML += ' <select id="input_color" class="form-control">'
		
		// if(item.item_images){
		// 	for(color of item.item_images){
		// 		detailsHTML += '<button onclick="showImage(`'+color.image.image+'`)" class="button btn-sm" type="button">'+color.color+'</button>'
		// 	}
		// }

		detailsHTML += ''
		detailsHTML += '</div>'
		detailsHTML += '<p>'+safeAccess(["desc"],item,"")+'</p>'

		detailsHTML += '</div>'

		detailsHTML += '</div>'

		if(item["description"]){detailsHTML += '<div class="col-lg-6 col-md-6">xxxxxxxxxxxxxxxxxxxxxxxx</div>'}
		detailsHTML += '</div>'

		detailsHTML += '</div>'


		// if(item["description"]){detailsHTML += '<div><p>'+item["description"]+'</p></div>'}

		$("#productDetails").append(detailsHTML);

		 var colorDropdown = $("#input_color");
     	 colorDropdown.empty();
     	 
     	 var colors = _.groupBy(item.item_images, function(val){ return val.color });
     	 		console.log("COLORS   ++======= "+JSON.stringify(colors,null,2));

     	 for (var prop in colors) {
		    if (Object.prototype.hasOwnProperty.call(colors, prop)) {
		    	(console.log(colors[prop]))
		         colorDropdown.append($("<option>").text(prop).val(prop));
		         		  // console.log(JSON.stringify(colors[prop]));
		    }
		}


	$(".productImageDelete").click(async function() { 	
		var	data	=		$(this).attr("value");
		var onError =function(error){
			notifyError("Failed to Added Removed Item");
    };
   var onResponse = function(response){
      if(response.data.status == true){
        notifySuccess("Favourite Item Removed Successfully");
        window.location.reload();
      }else{
        notifyError(response.data.message);
      }
    };
     removeFavourite(data,onResponse,onError);
	});

     	 // Object.keys(obj).forEach(e => {console.log(`key=${e}  value=${obj[e]}`);
     	 // 		 colorDropdown.append($("<option>").text(`${e}`).val(`${obj[e]})`);
     	 // 	});

        // for(color of colors){
        //   colorDropdown.append($("<option>").text(color.color).val(color.image.image));
        // }

        $('#input_color').change(function(){
		  var data= colors[($(this).val())];
		  currentImageIndex = 0;
		  if(data.length>0){
		   $('#productImage').attr('src',data[0].image.image);
		}else{
			notifyInfo("No images found");
		}
		});

		  $('#btPrevImage').unbind();
        $('#btPrevImage').click(function(){
        	var arr = colors[$('#input_color').val()];
        	var checkIndex = currentImageIndex-1;
        	if(typeof arr[checkIndex] === 'undefined'){
        		notifyInfo("No more images")
        	}else{
				currentImageIndex = checkIndex;
        		$('#productImage').attr('src',arr[checkIndex].image.image);
        	}
       //  	if(currentIndex<(arr.length-1)){
       //  		$('#productImage').data('imageIndex',currentIndex+1);
		   		// $('#productImage').attr('src',arr[currentIndex+1].image.image);
       //  	}else{
       //  		notifyInfo("No more images")
       //  	}
        });

          $('#btNextImage').unbind();
        $('#btNextImage').click(function(){
        	var arr = colors[$('#input_color').val()];
        	console.log(arr);
        	var checkIndex = currentImageIndex+1;
        	console.log("chkidx "+checkIndex)
        	if(typeof arr[checkIndex] === 'undefined'){
        		notifyInfo("No more images")
        	}else{
        		currentImageIndex = checkIndex;
        		$('#productImage').attr('src',arr[checkIndex].image.image);
        	}
        });


		if(item.item_images && item.item_images.length>0){
			showImage(item.item_images[0].image.image);
		}else if(item.parent_image){
			showImage(item.parent_image);
		}else if(item.parent_images&&item.parent_images.lenght>0){
			showImage(item.parent_images[0].image.image);
		}
	}


	function showImage(url){
		 $('#productImage').attr('src',url);
	}
	async function showProductInfo(item){

		var infoHTML = ""

		infoHTML += '<div class="container">'
		infoHTML += '<div class="row">'
		infoHTML += '<div class="col-12">'
		infoHTML += '<div class="product_d_inner">'
		infoHTML += '<div class="product_info_button">'
		infoHTML += '<ul class="nav" role="tablist">'
		infoHTML += '<li>'
		infoHTML += '<a class="active" data-toggle="tab" href="#sheet" role="tab" aria-controls="sheet" aria-selected="false">Specification</a>'
		infoHTML += '</li>'
		infoHTML += '<li>'
		infoHTML += '<a data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Description</a>'
		infoHTML += '</li>'
		infoHTML += '<li>'
		infoHTML += '<a data-toggle="tab" style="display:none;" id="customizationTab" href="#customization" role="tab" aria-controls="info" aria-selected="false">Customization</a>'
		infoHTML += '</li>'
		infoHTML += ''
		infoHTML += '</ul>'
		infoHTML += '</div>'
		infoHTML += '<div class="tab-content">'
		infoHTML += ''
		infoHTML += '<div class="tab-pane fade show active" id="sheet" role="tabpanel">'
		infoHTML += '<div class="product_d_table">'
		infoHTML += '<form action="#">'
		infoHTML += '<table>'
		infoHTML += '<tbody>'

		Object.keys(item["specification"][0]).forEach(function(key) {
		  // console.table('Key : ' + key + ', Value : ' + data[key])
		  infoHTML += '<tr>'
		  infoHTML += '<td class="first_child">'+key+'</td>'
		  infoHTML += '<td>'+item["specification"][0][key]+'</td>'
		  infoHTML += '</tr>'
		})

		infoHTML += '</tbody>'
		infoHTML += '</table>'
		infoHTML += '</form>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '<div class="tab-pane fade " id="info" role="tabpanel">'
		infoHTML += '<div class="product_info_content">'
		infoHTML += '<p>'+item["description"]+' </p>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '<div class="tab-pane fade " id="customization" role="tabpanel">'
		infoHTML += '<div id="customizationTable" class="product_info_content">'
		// infoHTML += '<p>'+item["description"]+' </p>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '</div>'

		$("#productInfo").append(infoHTML);
		
		$("#btAddToFav").click(async function(){	
			var data = item.id;
			console.log("id:",data)
			var onError =function(error){
			notifyError("Failed to Delete Quotation");
      	};
      var onResponse = function(response){
        	if(response.data.status == true){
            notifySuccess("Favourite Item Added Successfully");
						location.reload();
        	}else{
            	notifyError(response.data.message);
        	}
      	};
      	addFavourite(data,onResponse,onError);	
		 });


		$("#btAddToCart").click(async function(){

			// alert("1")
			const newQty = $("#inputQuantity").val();
			if(newQty>0){
			$("#btAddToCart").html("Added to Cart");
			shoppingCart.modify(itemId,newQty,function(){reloadMiniCart();});
			
		}else{
			notifyError("Amount not valid!");
		}

		});

		getKitsForItem(item["id"],function(res){
			var kits = safeAccess(["data","items","data"],res,[]);

			if(kits.length>0){
				$("#customizationTab").toggle();
					showOrderDetails(kits)
			}
		})
		

	}



async function showOrderDetails(quoteLine){

	var orderDetailsHTML = ""



                            
                            
	orderDetailsHTML += '<div class="table_desc">'
	orderDetailsHTML += '<div class="cart_page " >'
	orderDetailsHTML += '<table >'
	orderDetailsHTML += '<thead>'
	orderDetailsHTML += '<tr>'
	orderDetailsHTML += '<th class="product_thumb">Product</th>'
	orderDetailsHTML += '<th class="product_code">Code</th>'
	orderDetailsHTML += '<th class="product_name">Name</th>'
	orderDetailsHTML += '<th class="product-name">Details</th>'
	orderDetailsHTML += '<th></th>'
	orderDetailsHTML += '</tr>'
	orderDetailsHTML += '</thead>'
	orderDetailsHTML += '<tbody>'


	for(i=0;i<quoteLine.length;i++){
		const item = quoteLine[i];


		orderDetailsHTML += '<tr>'
		if(item.item_images[0]){
		orderDetailsHTML += '<td class="product_thumb"><a href="#"><img src="'+item.item_images[0]["image"]["image"]+'" alt=""></a></td>'
		}else{

		orderDetailsHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/lma_catalog_img.png" alt=""></a></td>'
		}
		orderDetailsHTML += '<td class="product_name"><a href="#">'+safeAccess(["code"],item,"-")+'</a></td>'
		orderDetailsHTML += '<td class="product_name"><a href="#">'+safeAccess(["name"],item,"-")+'</a></td>'
		orderDetailsHTML += '<td class="product_name"><a href=product-details.html?item='+item.id+'>Go To Details</a></td>'

		// orderDetailsHTML += '<td class="product-price">$'+safeAccess(["price"],quoteItem,"-").toLocaleString("en-AU")+'</td>'
		// orderDetailsHTML += '<td class="product_quantity">'+safeAccess(["qty"],quoteItem,"-")+'</td>'
		// orderDetailsHTML += '<td class="product_total">$'+safeAccess(["total"],quoteItem,"-").toLocaleString("en-AU")+'</td>'
		// orderDetailsHTML += '<td class="product_total">'+safeAccess(["expected_delivery_date"],quoteItem,"-")+'</td>'
		orderDetailsHTML += '</tr>'
	}


	orderDetailsHTML += '</tbody>'
	orderDetailsHTML += '</table>'
	orderDetailsHTML += '</div>'
	orderDetailsHTML += '</div>'

	$("#customizationTable").html(orderDetailsHTML);

}



async function showKits(kits){

	var html = ""
	// $("#modalKits").empty()


	html += '<table style="width:inherit">'
	html += '<thead>'
	html += '<tr>'
	html += '<th class="product_name">Name</th>'
	html += '<th class="product-namee">Details</th>'
	html += '<th></th>'
	html += '</tr>'
	html += '</thead>'
	html += '<tbody>'


	for(i=0;i<kits.length;i++){
		const kit = kits[i];
		html += '<tr>'
		html += '<td class="product_name"><a >'+safeAccess(["name"],kit,"-")+'</a></td>'
		html += '<td class="product_name"><a href=product-details.html?item='+kit.id+'>Go To Details</a></td>'
		html += '</tr>'
	}


	html += '</tbody>'
	html += '</table>'


    $("#customizationTable").html(html);
    // $('#modalKits').modal('show');
}


	function changeQuantity(id,quantity){
		// if(shoppingCart.getItemFromCart(id)!=null){
			$("#btAddToCart").html("Update")
		// }else{
		// 	$("#btAddToCart").html("Update")
		// }
	}


	var itemId;
	var i;
	function initProductDetails() {
		
		var loadingNotification = notifyInfo("Loading");
		var onResponse = function(response){
			dismiss(loadingNotification);
			
			i = response.data.item;
			var itemFamilyObj = response.data.item.item_family
			var itemFamilyArr = []
			for(k=0;k<itemFamilyObj.length;k++){
				itemFamilyArr.push(itemFamilyObj[k]["code"])

			}
			var itemFamily = itemFamilyArr.toString()

			console.log("i : ", i)
			const element = {
				"name" : i.name,
				"id" : i.id,
				"price" : "$"+ safeAccess(['price'],i,"-").toLocaleString("en-AU"),
				"description": splitSentences(i.desc),
				"family" : safeAccess(['i', 'item_family', 0, 'code'],i,null),
				// "image" : safeAccess(['i', 'images', 0, 'main'],i,null),
				"item_images" : i.item_images,
				"parent_image" : safeAccess(["item_parent_images",0,"image","image"],i),
			};    
			if(!safeAccess(['type', 'name'],i,"").includes("Machine")){
				element["specification"] = [
				{
					"Name" : safeAccess(['name'],i,"-"),
					"Code": safeAccess(['code'],i,"-"),
					"Short Code" : safeAccess(['short_code'],i,"-"),
					"Group" : safeAccess(['item_group', 'name'],i,"") + " - " + safeAccess([ 'item_group', 'desc'],i,"") ,
					// "Family" : safeAccess(['item_family', 'code'],i,"") + " - " + safeAccess([ 'item_family', 'desc'],i,"") ,
					// "Family" : itemFamily ,
					"Family" : itemFamily ,
					"Type" :safeAccess(['type', 'name'],i,"") + " - " + safeAccess(['type', 'desc'],i,"") ,
					// "Parent" : safeAccess(['parent', 'name'],i,"") + " - " + safeAccess([ 'parent', 'desc'],i,"") ,
					// "Lenght" : safeAccess(['length'],i,"") + " - " + safeAccess(['lenght_uom'],i,"") ,
					// "Height" : safeAccess(['height'],i,"") + " - " + safeAccess([ 'height_uom'],i,"") ,
					// "Width" : safeAccess(['width'],i,"") + " - " + safeAccess([ 'width_uom'],i,"") ,
					"Weight" : safeAccess(['weight'],i,"")  + safeAccess([ 'weight_uom'],i,"") ,
					"Volume" : safeAccess(['volume'],i,"")  + safeAccess([ 'volume_uom'],i,"") ,
				}
				]
			}else{

				element["specification"] = [
				{
					"Name" : safeAccess(['name'],i,"-"),
					"Code": safeAccess(['code'],i,"-"),
					"Short Code" : safeAccess(['short_code'],i,"-"),
					"Group" : safeAccess(['item_group', 'name'],i,"") + " - " + safeAccess([ 'item_group', 'desc'],i,"") ,
					// "Family" : safeAccess(['item_family', 'code'],i,"") + " - " + safeAccess([ 'item_family', 'desc'],i,"") ,
					"Family" : itemFamily ,
					"Type" :safeAccess(['type', 'name'],i,"") + " - " + safeAccess(['type', 'desc'],i,"") ,
					// "Parent" : safeAccess(['parent', 'name'],i,"") + " - " + safeAccess([ 'parent', 'desc'],i,"") ,
					// "Lenght" : safeAccess(['length'],i,"") + " - " + safeAccess(['lenght_uom'],i,"") ,
					// "Height" : safeAccess(['height'],i,"") + " - " + safeAccess([ 'height_uom'],i,"") ,
					// "Width" : safeAccess(['width'],i,"") + " - " + safeAccess([ 'width_uom'],i,"") ,
					"Weight" : safeAccess(['weight'],i,"")  + safeAccess([ 'weight_uom'],i,"") ,
					"Volume" : safeAccess(['volume'],i,"")  + safeAccess([ 'volume_uom'],i,"") ,

					"Boiler Type" : safeAccess(['boiler_type'],i,"") ,
					"Pid Temperature Controller" : safeAccess(['pid_temperature_controller'],i,"") ,
					"Pump Type" : safeAccess(['pump_type'],i,"")  ,
					"Indicator Lights" : safeAccess(['indicator_lights'],i,"")  ,
					"Voltage" : safeAccess(['voltage'],i,"")  ,
					"Steam Boiler" : safeAccess(['steam_boiler'],i,"")  ,
					"Water Reservoir Capacity" : safeAccess(['water_reservoir_capacity'],i,"")  ,
				}
				]
			}
			var onResp = function(resp){
                // var cart = shoppingCart.listCart();
                var cart = safeAccess(['data','carts','data'],resp);
				showProductDetails(element, cart);
				showProductInfo(element);
                

            }
            cartList(onResp);
			if(!safeAccess(['type', 'name'],i,"").includes("Machine")){

				$('#input_color').hide();
				$('#btPrevImage').hide();
				$('#btNextImage').hide();
			}
			// $("#inputQuantity").val(shoppingCart.getQty(itemId));
			
		};

		var onError =function(error){
			dismiss(loadingNotification);
			console.log(error);
			notifyError("Failed to load item");
		};

		getItemDetail(onResponse,onError,itemId);
	}

	function findGetParameter(parameterName) {
		var result = null,
		tmp = [];
		location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		});
		return result;
	}

	$(document).ready(function(){
		itemId = findGetParameter("item")
		if(itemId==null || itemId == undefined ){
			notifyError("This item is not available");
		}else{
			initProductDetails();
		}
	});

	function splitSentences(str){
		var htmlContent = "";
		if(str){
			var sentences = str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
			for(sentence of sentences){
				htmlContent += sentence;
				htmlContent+= "<br>"
			}
		}
			return htmlContent;
		

	}



