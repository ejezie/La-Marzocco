var item = {	
				"name" : "la marzocco linea mini",
				"price" : "$700.00",
				"description" : "You have the choice of coffee beans from three incredible Australian roasters, tailored to your liking and delivered to your door. Choose from our roasters in the tabs below. Based on our iconic Linea Classic coffee machine, the Linea Mini lets you brew coffee and steam milk to create your favourite drinks at home. Each Linea Mini is hand-crafted at our headquarters in Italy, then tested at our workshop in Melbourne so that it delivers perfection in every cup. Our coffee machines all come with La Marzocco Home connectivity as standard, so that you can use our app to control your machine and contact our experts. Everything you need to make your first drink comes in the box. High-powered steam, professional-grade components, and no plumbing or installation means you can enjoy coffee immediately. Each machine has a 24-month warranty and comes with the full support of our Australian team to assist with queries, advice and tips. ",
				"family" : "Linea",
				"image" : "https://au.lamarzoccohome.com/wp-content/uploads/2017/01/linea-mini_steel_front-400px.png",
				"specification" : [
									{
										"Boiler Type" : "Dual Boiler",
										"PID Temperature Controller" : "Yes",
										"Pump Type" : "Single Internal Rotary Pump",
										"Indicator Lights" : "Heating and Water Level Lights",
										"Height" : "377mm",
										"Width" : "357mm",
										"Depth" : "530mm",
										"Weight" : "30kgs (machine only)",
										"Voltage" : "220-240v" ,
										"Steam Boiler" : "3.5 litres",
										"Water Reservoir capacity" : "2.5 litres"
									}
								]
			}



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
	detailsHTML += '<h1>la marzocco linea mini</h1>'
	// detailsHTML += '<div class="product_nav">'
	// detailsHTML += '<ul>'
	// detailsHTML += '<li class="prev"><a href="product-details.html"><i class="fa fa-angle-left"></i></a></li>'
	// detailsHTML += '<li class="next"><a href="variable-product.html"><i class="fa fa-angle-right"></i></a></li>'
	// detailsHTML += '</ul>'
	// detailsHTML += '</div>'
	detailsHTML += '<div class="price_box">'
	detailsHTML += '<span class="current_price">'+item["price"]+'</span>'
	detailsHTML += ''
	detailsHTML += '</div>'
	detailsHTML += '<div class="product_desc">'
	detailsHTML += '<p>'+item["description"]+'</p>'
	detailsHTML += '</div>'
	detailsHTML += '<div class="product_meta">'
	detailsHTML += '<span>Family : <a href="#">'+item["family"]+'</a></span>'
	detailsHTML += '</div>'
	detailsHTML += '<div class="product_variant quantity">'
	detailsHTML += '<label>quantity</label>'
	detailsHTML += '<input min="1" max="100" value="1" type="number">'
	detailsHTML += '<button class="button" type="submit">add to cart</button>'
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

	$("#productInfo").append(infoHTML)
}




showProductDetails(item)
showProductInfo(item)








