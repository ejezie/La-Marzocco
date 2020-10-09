
	async function showProductDetails(item){
		var detailsHTML = ""
		detailsHTML += '<div class="container">'
		detailsHTML += '<div class="row">'
		detailsHTML += '<div class="col-lg-6 col-md-6">'
		detailsHTML += '<div class="product-details-tab">'
		detailsHTML += ''
		detailsHTML += '<div id="img-1" class="zoomWrapper single-zoom">'
		detailsHTML += '<a href="#">'
		detailsHTML += '<img id="zoom1" src="'+item["image"]+'" data-zoom-image="'+item["image"]+'" alt="big-1">'
		detailsHTML += '</a>'
		detailsHTML += '</div>'
		detailsHTML += '</div>'
		detailsHTML += '</div>'
		detailsHTML += '<div class="col-lg-6 col-md-6">'
		detailsHTML += '<div class="product_d_right">'
		detailsHTML += '<form action="#">'
		detailsHTML += ''
		detailsHTML += '<h1>'+item["name"]+'</h1>'
		// detailsHTML += '<div class="product_nav">'
		// detailsHTML += '<ul>'
		// detailsHTML += '<li class="prev"><a href="product-details.html"><i class="fa fa-angle-left"></i></a></li>'
		// detailsHTML += '<li class="next"><a href="variable-product.html"><i class="fa fa-angle-right"></i></a></li>'
		// detailsHTML += '</ul>'
		// detailsHTML += '</div>'
		detailsHTML += '<div class="price_box">'
		detailsHTML += '<span class="current_price">'+item["price"]+'</span>'
		detailsHTML += ''
		// detailsHTML += '</div>'
		// detailsHTML += '<div class="product_desc">'
		// // detailsHTML += '<p>'+item["description"]+'</p>'
		// detailsHTML += '</div>'
		// detailsHTML += '<div class="product_meta">'
		// detailsHTML += '<span>Family : <a href="#">'+item["family"]+'</a></span>'
		// detailsHTML += '</div>'	
		detailsHTML += '<div class="product_variant quantity">'
		detailsHTML += '<label>quantity</label>'
		detailsHTML += '<input id="inputQuantity" onchange="changeQuantity('+item["id"]+',this.value)" min="1" max="100" value="1" type="number">'
		detailsHTML += '<button class="button" id="btAddToCart" type="button">add to cart</button>'
		detailsHTML += ''
		detailsHTML += '</div>'
		detailsHTML += '</form>'
		detailsHTML += '</div>'
		detailsHTML += '</div>'
		detailsHTML += '</div>'
		detailsHTML += '</div>'

		$("#productDetails").append(detailsHTML)
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
		// infoHTML += '<li>'
		// infoHTML += '<a data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Description</a>'
		// infoHTML += '</li>'
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
		  console.log("key : ",key)
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
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '</div>'
		infoHTML += '</div>'

		$("#productInfo").append(infoHTML);
		$("#btAddToCart").click(async function(){

			const newQty = $("#inputQuantity").val();
			if(newQty>0){
			$("#btAddToCart").html("Added to Cart");
			// if(!shoppingCart.itemExists(itemId)){
			// 	shoppingCart.addItemToCart(itemId,i.name,999,newQty);
			// }else{
			// 	shoppingCart.setCountForItem(itemId,newQty);
			// }

			shoppingCart.modify(itemId,newQty,function(){reloadMiniCart();});
			// reloadMiniCart();
		}else{
			notifyError("Amount not valid!");
		}

		});

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
			const element = {
				"name" : i.name,
				"id" : i.id,
				"price" : "$700.00",
				"description": i.desc,
				"family" : safeAccess(['i', 'item_family', 0, 'code'],i,null),
				"image" : safeAccess(['i', 'images', 0, 'main'],i,null),
				"specification" : [
				{
					"Name" : safeAccess(['name'],i,"-"),
					"Code": safeAccess(['code'],i,"-"),
					"Short Code" : safeAccess(['shortCode'],i,"-"),
					"Group" : safeAccess(['item_group', 'name'],i,"") + " - " + safeAccess([ 'item_group', 'desc'],i,"") ,
					"Family" : safeAccess(['item_family', 'code'],i,"") + " - " + safeAccess([ 'item_family', 'desc'],i,"") ,
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
			};    

			showProductDetails(element);
			showProductInfo(element);
			$("#inputQuantity").val(shoppingCart.getQty(itemId));
			
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





