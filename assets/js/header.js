
$('#itemSearchBtn').click(function(){

   location.href='shop.html?q=' + document.getElementById('inputSearch').value
   return false;
})


$('#canvasItemSearchBtn').click(function(){

   location.href='shop.html?q=' + document.getElementById('canvasInputSearch').value
   return false;
})




async function showOffCanvasHeader(argument) {
	var offCanvasHeader = ""
offCanvasHeader += '<div class="container">'	
offCanvasHeader += '<div class="row">'	
offCanvasHeader += '<div class="col-12">'	
offCanvasHeader += '<div class="canvas_open">'	
offCanvasHeader += '<span>MENU</span>'	
offCanvasHeader += '<a href="javascript:void(0)"><i class="ion-navicon"></i></a>'	
offCanvasHeader += '</div>'	
offCanvasHeader += '<div class="Offcanvas_menu_wrapper">'	
offCanvasHeader += ''	
offCanvasHeader += '<div class="canvas_close">'	
offCanvasHeader += '<a href="#"><i class="ion-android-close"></i></a>'	
offCanvasHeader += '</div>'	
offCanvasHeader += ''	
offCanvasHeader += ''	
offCanvasHeader += '<div class="top_right text-right">'	
offCanvasHeader += '<ul>'	
offCanvasHeader += '<li class="top_links"><a href="#"><i class="ion-android-person"></i> My Account<i class="ion-ios-arrow-down"></i></a>'	
offCanvasHeader += '<ul class="dropdown_links">'	
offCanvasHeader += '<li><a href="my-account.html">My Account </a></li>'	
offCanvasHeader += '<li><a href="myOrders.html">My Orders </a></li>'	
offCanvasHeader += '<li><a href="getQuotation.html">Quotation </a></li>'	
offCanvasHeader += '<li><a href="cart.html">Shopping Cart</a></li>'	
offCanvasHeader += '<li><a href="login.html">Logout </a></li>'	
offCanvasHeader += '</ul>'	
offCanvasHeader += '</li>'	
offCanvasHeader += '<li class="language"><a href="#" style="color: white"><img src="assets/img/logo/aus_language.png" alt="" style="width: 30px">Aus</a> '	
offCanvasHeader += ''	
offCanvasHeader += '</li>'	
offCanvasHeader += '<li class="currency"><a href="#" style="color: white">$ AUD</a>'	
offCanvasHeader += ''	
offCanvasHeader += '</li>'	
offCanvasHeader += ''	
offCanvasHeader += ''	
offCanvasHeader += '</ul>'	
offCanvasHeader += '</div>'	
offCanvasHeader += ''	
offCanvasHeader += '<div class="search-container">'	
offCanvasHeader += '<form action="#">'	
offCanvasHeader += '<div class="search_box">'	
offCanvasHeader += '<input id="canvasInputSearch" placeholder="Search by Item Code, Item Name ..." type="text">'	
offCanvasHeader += '<button  id="canvasItemSearchBtn"   type="submit"><i class="ion-ios-search-strong"></i></button>'	
offCanvasHeader += '</div>'	
offCanvasHeader += '</form>'	
offCanvasHeader += '</div>'	
offCanvasHeader += '<div id="menu" class="text-left ">'	
offCanvasHeader += '<ul class="offcanvas_main_menu">'	
offCanvasHeader += '<li class="menu-item-has-children">'	
offCanvasHeader += ''	
offCanvasHeader += '<a href="index.html">Home</a>'	
offCanvasHeader += ''	
offCanvasHeader += '</li>'	
offCanvasHeader += '<li class="menu-item-has-children" id="canvasCommercialMachineMenu">'	
offCanvasHeader += '<span class="menu-expand"><i class="fa fa-angle-up"></i></span>'	
offCanvasHeader += '<a href="#">Commercial Machine</a>'	
offCanvasHeader += ''	
offCanvasHeader += '</li>'	
offCanvasHeader += ''	
offCanvasHeader += '<li class="menu-item-has-children">'	
offCanvasHeader += '<a href="contact.html"> Contact Us</a>'	
offCanvasHeader += '</li>'	
offCanvasHeader += '</ul>'	
offCanvasHeader += '</div>'	
offCanvasHeader += '</div>'	
offCanvasHeader += '</div>'	
offCanvasHeader += '</div>'	
offCanvasHeader += '</div>'	


$("#offCanvas").append(offCanvasHeader)
}

showOffCanvasHeader()