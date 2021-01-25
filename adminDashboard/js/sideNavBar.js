function sideNavBar(){
	var sideNavBarHTML = ""

	// var 

	// var role = findCurrentLoggedUserRole()
	// var role = "Super Admin"
	var user_profile = JSON.parse(localStorage.getItem("user_profile"))

	var role = user_profile["user_role"]
	var userName = user_profile["user_name"]
	var profileImage = user_profile["user_image"]
	console.log("role : ", user_profile)
	sideNavBarHTML += '</div>'
	if (role == 5){

		sideNavBarHTML +=  '<div class="navbar nav_title" style="border: 0;">'
		sideNavBarHTML +=  '<a href="dashboard.html" class="site_title"> <img src="images/logo.png" width="200" height="60"></a>'
		sideNavBarHTML +=  '</div>'
		sideNavBarHTML +=  '<div class="clearfix"></div>'
		sideNavBarHTML +=  '<!-- menu profile quick info -->'
		sideNavBarHTML +=  '<div class="profile clearfix">'
		sideNavBarHTML +=  '<div class="profile_pic">'
		// sideNavBarHTML +=  '<!-- <img src="images/img.jpg" alt="..." class="img-circle profile_img"> -->'

		if(profileImage){
			sideNavBarHTML +=  '<img src="'+profileImage+'" alt="..." class="img-circle profile_img">'
		}else {
			sideNavBarHTML +=  '<img src="images/user.png" alt="..." class="img-circle profile_img">'
		}
		sideNavBarHTML +=  '</div>'
		sideNavBarHTML +=  '<div class="profile_info">'
		sideNavBarHTML +=  '<span>WELCOME,</span>'
		sideNavBarHTML +=  '<h2>'+userName+'</h2>'
		sideNavBarHTML +=  '</div>'
		sideNavBarHTML +=  '</div>'
		// sideNavBarHTML +=  '<!-- /menu profile quick info -->'
		sideNavBarHTML +=  '<br />'
		// sideNavBarHTML +=  '<!-- sidebar menu -->'
		sideNavBarHTML +=  '<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">'
		sideNavBarHTML +=  '<div class="menu_section">'
		sideNavBarHTML +=  '<h3>B2B Order Portal</h3>'
		sideNavBarHTML +=  '<ul class="nav side-menu">'
		sideNavBarHTML +=  '<li><a href="editProfile.html"><i class="fa fa-user"></i>PROFILE </a>'
		sideNavBarHTML +=  '<li><a href="dashboard.html"><i class="fa fa-home"></i> DASHBOARD </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a href="customerOrders.html"><i class="fa fa-shopping-cart"></i>ORDERS </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a href="enquiry.html"><i class="fa fa-info-circle"></i>ENQUIRY </a>'
		sideNavBarHTML +=  '</li>'
		
		// sideNavBarHTML +=  '<li><a href="customerQuotations.html"><i class="fa fa-shopping-cart"></i>QUOTATIONS </a>'
		// sideNavBarHTML +=  '</li>'
		// sideNavBarHTML +=  '<li><a href="placeCustomerOrder.html"><i class="fa fa-cart-plus"></i>PLACE CUSTOMER ORDER </a>'
		// sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a><i class="fa fa-bar-chart-o"></i> REPORTS <span class="fa fa-chevron-down"></span></a>'
		sideNavBarHTML +=  '<ul class="nav child_menu">'
		sideNavBarHTML +=  '<li><a href="customerOrdersReport.html">CUSTOMER ORDERS</a></li>'
		sideNavBarHTML +=  '<li><a href="regionWiseReport.html">REGION WISE REPORT</a></li>'
		sideNavBarHTML +=  '<li><a href="periodWiseSalesReport.html">PERIOD WISE REPORT</a></li>'
		sideNavBarHTML +=  '<li><a href="productWiseReport.html">PRODUCT WISE REPORT</a></li>'
		sideNavBarHTML +=  '</ul>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a><i class="fa fa-table"></i> MASTER DATA <span class="fa fa-chevron-down"></span></a>'
		sideNavBarHTML +=  '<ul class="nav child_menu">'
		sideNavBarHTML +=  '<li><a href="employeeMaster.html">EMPLOYEE MASTER</a></li>'
		sideNavBarHTML +=  '<li><a href="customerMaster.html">CUSTOMER MASTER</a></li>'
		sideNavBarHTML +=  '<li><a href="productMaster.html">PRODUCT MASTER</a></li>'
		sideNavBarHTML +=  '<li><a href="productDescription.html">PRODUCT DESCRIPTION</a></li>'
		sideNavBarHTML +=  '<li><a href="productHierarchy.html">PRODUCT METADATA</a></li>'
		sideNavBarHTML +=  '<li><a href="promotion.html">PROMOTIONS</a></li>'
		sideNavBarHTML +=  '<li><a href="newsletter.html">NEWSLETTER</a></li>'
		sideNavBarHTML +=  '</ul>'
		sideNavBarHTML +=  '</li>'
		// sideNavBarHTML +=  '<li><a href="#"><i class="fa fa-user"></i>PROFILE </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a href="../login.html"><i class="fa fa-sign-out"></i>LOGOUT </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '</ul>'

		sideNavBarHTML +=  '</div>'
		sideNavBarHTML +=  '<d>'
		sideNavBarHTML +=  '</div>'
		// sideNavBarHTML +=  '<!-- /sidebar menu -->'
		// sideNavBarHTML +=  '<!-- /menu footer buttons -->'
		// sideNavBarHTML +=  '<div class="sidebar-footer hidden-small">'
		// sideNavBarHTML +=  '<a data-toggle="tooltip" data-placement="top" title="Settings">'
		// sideNavBarHTML +=  '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>'
		// sideNavBarHTML +=  '</a>'
		// sideNavBarHTML +=  '<a data-toggle="tooltip" data-placement="top" title="FullScreen">'
		// sideNavBarHTML +=  '<span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>'
		// sideNavBarHTML +=  '</a>'
		// sideNavBarHTML +=  '<a data-toggle="tooltip" data-placement="top" title="Lock">'
		// sideNavBarHTML +=  '<span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>'
		// sideNavBarHTML +=  '</a>'
		// sideNavBarHTML +=  '<a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">'
		// sideNavBarHTML +=  '<span class="glyphicon glyphicon-off" aria-hidden="true"></span>'
		// sideNavBarHTML +=  '</a>'
		// sideNavBarHTML +=  '</div>'	
	} else {
		sideNavBarHTML +=  '<div class="navbar nav_title" style="border: 0;">'
		sideNavBarHTML +=  '<a href="dashboard.html" class="site_title"> <img src="images/logo.png" width="200" height="60"></a>'
		sideNavBarHTML +=  '</div>'
		sideNavBarHTML +=  '<div class="clearfix"></div>'
		sideNavBarHTML +=  '<!-- menu profile quick info -->'
		sideNavBarHTML +=  '<div class="profile clearfix">'
		sideNavBarHTML +=  '<div class="profile_pic">'
		// sideNavBarHTML +=  '<!-- <img src="images/img.jpg" alt="..." class="img-circle profile_img"> -->'
		if(profileImage){
			sideNavBarHTML +=  '<img src="'+profileImage+'" alt="..." class="img-circle profile_img">'
		}else {
			sideNavBarHTML +=  '<img src="images/user.png" alt="..." class="img-circle profile_img">'
		}
		sideNavBarHTML +=  '</div>'
		sideNavBarHTML +=  '<div class="profile_info">'
		sideNavBarHTML +=  '<span>WELCOME,</span>'
		sideNavBarHTML +=  '<h2>'+userName+'</h2>'
		sideNavBarHTML +=  '</div>'
		sideNavBarHTML +=  '</div>'
		// sideNavBarHTML +=  '<!-- /menu profile quick info -->'
		sideNavBarHTML +=  '<br />'
		// sideNavBarHTML +=  '<!-- sidebar menu -->'
		sideNavBarHTML +=  '<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">'
		sideNavBarHTML +=  '<div class="menu_section">'
		sideNavBarHTML +=  '<h3>B2B Order Portal</h3>'
		sideNavBarHTML +=  '<ul class="nav side-menu">'
		sideNavBarHTML +=  '<li><a href="editProfile.html"><i class="fa fa-user"></i>PROFILE </a>'
		sideNavBarHTML +=  '<li><a href="dashboard.html"><i class="fa fa-home"></i> DASHBOARD </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a href="customerOrders.html"><i class="fa fa-shopping-cart"></i>ORDERS </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a href="customerQuotations.html"><i class="fa fa-shopping-cart"></i>QUOTATIONS </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a href="placeCustomerOrder.html"><i class="fa fa-cart-plus"></i>PLACE CUSTOMER ORDER </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a href="enquiry.html"><i class="fa fa-info-circle"></i>ENQUIRY </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a><i class="fa fa-bar-chart-o"></i> REPORTS <span class="fa fa-chevron-down"></span></a>'
		sideNavBarHTML +=  '<ul class="nav child_menu">'
		sideNavBarHTML +=  '<li><a href="customerOrdersReport.html">CUSTOMER ORDERS</a></li>'
		sideNavBarHTML +=  '<li><a href="regionWiseReport.html">REGION WISE REPORT</a></li>'
		sideNavBarHTML +=  '<li><a href="periodWiseSalesReport.html">PERIOD WISE REPORT</a></li>'
		sideNavBarHTML +=  '<li><a href="productWiseReport.html">PRODUCT WISE REPORT</a></li>'
		sideNavBarHTML +=  '</ul>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '<li><a><i class="fa fa-table"></i> MASTER DATA <span class="fa fa-chevron-down"></span></a>'
		sideNavBarHTML +=  '<ul class="nav child_menu">'
		// sideNavBarHTML +=  '<li><a href="employeeMaster.html">EMPLOYEE MASTER</a></li>'
		sideNavBarHTML +=  '<li><a href="customerMaster.html">CUSTOMER MASTER</a></li>'
		// sideNavBarHTML +=  '<li><a href="productMaster.html">PRODUCT MASTER</a></li>'
		// sideNavBarHTML +=  '<li><a href="productDescription.html">PRODUCT DESCRIPTION</a></li>'
		// sideNavBarHTML +=  '<li><a href="productHierarchy.html">PRODUCT HIERARCHY</a></li>'
		sideNavBarHTML +=  '<li><a href="promotion.html">PROMOTIONS</a></li>'
		sideNavBarHTML +=  '<li><a href="newsletter.html">NEWSLETTER</a></li>'
		sideNavBarHTML +=  '</ul>'
		sideNavBarHTML +=  '</li>'
		// sideNavBarHTML +=  '<li><a href="#"><i class="fa fa-user"></i>PROFILE </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '</li>'
		
		sideNavBarHTML +=  '<li><a href="../login.html"><i class="fa fa-sign-out"></i>LOGOUT </a>'
		sideNavBarHTML +=  '</li>'
		sideNavBarHTML +=  '</ul>'

		sideNavBarHTML +=  '</div>'
		sideNavBarHTML +=  '<d>'
		sideNavBarHTML +=  '</div>'
		// sideNavBarHTML +=  '<!-- /sidebar menu -->'
		// sideNavBarHTML +=  '<!-- /menu footer buttons -->'
		// sideNavBarHTML +=  '<div class="sidebar-footer hidden-small">'
		// sideNavBarHTML +=  '<a data-toggle="tooltip" data-placement="top" title="Settings">'
		// sideNavBarHTML +=  '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>'
		// sideNavBarHTML +=  '</a>'
		// sideNavBarHTML +=  '<a data-toggle="tooltip" data-placement="top" title="FullScreen">'
		// sideNavBarHTML +=  '<span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>'
		// sideNavBarHTML +=  '</a>'
		// sideNavBarHTML +=  '<a data-toggle="tooltip" data-placement="top" title="Lock">'
		// sideNavBarHTML +=  '<span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>'
		// sideNavBarHTML +=  '</a>'
		// sideNavBarHTML +=  '<a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">'
		// sideNavBarHTML +=  '<span class="glyphicon glyphicon-off" aria-hidden="true"></span>'
		// sideNavBarHTML +=  '</a>'
		// sideNavBarHTML +=  '</div>'	
	}

	$("#accordionSidebar").append(sideNavBarHTML)
}

sideNavBar()