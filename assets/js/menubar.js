
var categoryArr = {
				    Categories: [
				        {
				            "name": "Commercial Machines",
				            "family": [{
				                    "name" : "Linea",
				                    "type" : [  
				                                {
				                                    "name" : "linea pb x"
				                                },
				                                {
				                                    "name" : "linea pb"
				                                },
				                                {
				                                    "name" : "linea classic"
				                                }

				                    ]
				                },
				                {
				                    "name" : "Leva",
				                    "type" : [  
				                                {
				                                    "name" : "leva x"
				                                },
				                                {
				                                    "name" : "leva s"
				                                }
				                    ]
				                },
				                {
				                    "name" : "Strada",
				                    "type" : [  
				                                {
				                                    "name" : "strada av"
				                                },
				                                {
				                                    "name" : "strada ep"
				                                }
				                    ]
				                },
				                {
				                    "name" : "Strada",
				                    "type" : [  
				                                {
				                                    "name" : "strada av"
				                                },
				                                {
				                                    "name" : "strada ep"
				                                }
				                    ]
				                }
				            ],
				        },
				        {
				            "name": "Grinders",
				            "family": [{
				                    "name" : "Grinders",
				                    "type" : [  
				                                {
				                                    "name" : "Swift"
				                                },
				                                {
				                                    "name" : "Vulcano"
				                                },
				                                {
				                                    "name" : "Lux d"
				                                }

				                    ]
				                },
				                
				            ],
				        },
				        {
				            "name": "Modbar",
				            "family": [{
				                    "name" : "Modbar",
				                    "type" : [  
				                                {
				                                    "name" : "Modbar 1"
				                                },
				                                {
				                                    "name" : "Modbar 2"
				                                },
				                                {
				                                    "name" : "Modbar 3"
				                                }

				                    ]
				                },
				                
				            ],
				        },
				        {
				            "name": "GS3",
				            "family": [{
				                    "name" : "GS3",
				                    "type" : [  
				                                {
				                                    "name" : "GS3 1"
				                                },
				                                {
				                                    "name" : "GS3 2"
				                                },
				                                {
				                                    "name" : "GS3 3"
				                                }

				                    ]
				                },
				                
				            ],
				        },
				        {
				            "name": "LM Home",
				            "family": [{
				                    "name" : "LM Home",
				                    "type" : [  
				                                {
				                                    "name" : "LM Home 1"
				                                },
				                                {
				                                    "name" : "LM Home 2"
				                                },
				                                {
				                                    "name" : "LM Home 3"
				                                }

				                    ]
				                },
				                
				            ],
				        },
				    ]
				}


var newsletterArr = [{
						"newsletterName" : "Jan 2020",
						"pdfURL" : "https://www.careerpower.in/2020/The-Hindu-Review-June-2020.pdf"
					},
					{
						"newsletterName" : "Feb 2020",
						"pdfURL" : "https://www.careerpower.in/2020/The-Hindu-Review-June-2020.pdf"
					},
					{
						"newsletterName" : "Mar 2020",
						"pdfURL" : "https://www.careerpower.in/2020/The-Hindu-Review-June-2020.pdf"
					}]


function showMenubarCommercialMachine(data){
	var category = "Commercial";
	var categoryArr = { Categories: data.mapping};
	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["families"].length; j++){
				var family = categoryArr["Categories"][i]["families"][j]["code"]
				menuBarHTML += '<li><strong>'+family+'</strong></a>'
				menuBarHTML += '<ul>'

				categoryArr["Categories"][i]["families"][j]["machines"].sort(function(a, b) {
			   	 var textA = a.name;
			   	 var textB = b.name;
			   	 return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});


				for(k=0; k< categoryArr["Categories"][i]["families"][j]["machines"].length ; k++){
					var type = categoryArr["Categories"][i]["families"][j]["machines"][k]["name"]
					menuBarHTML += '<li><a href="product-details.html?item='+categoryArr["Categories"][i]["families"][j]["machines"][k]["id"]+'">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';
	// Image
	// menuBarHTML += '<div class="banner_static_menu">'
	// menuBarHTML += '<a href="shop.html"><img src="https://au.lamarzocco.com/wp-content/uploads/2018/06/Leva-X-1.jpg" alt="" style="height: 400px ; width: 100%"></a>'
	// menuBarHTML += '</div>'

	$("#commercial_machine_menu").append(menuBarHTML)
}


function showCanvasMenubarCommercialMachine(data){
	var category = "Commercial";
	var categoryArr = { Categories: data.mapping};
	var menuBarHTML = ""


	menuBarHTML += '<ul class="sub-menu" style="display:none">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["families"].length; j++){
				var family = categoryArr["Categories"][i]["families"][j]["code"]

				menuBarHTML += '<li class="menu-item-has-children menuopen">'
				menuBarHTML += '<span class="menu-expand"><i class="fa fa-angle-down"></i></span>'
				menuBarHTML += '<a href="#">'+family+'</a>'
				menuBarHTML += '<ul class="sub-menu" style="display: none;">'

				categoryArr["Categories"][i]["families"][j]["machines"].sort(function(a, b) {
			   	 var textA = a.name;
			   	 var textB = b.name;
			   	 return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});

				for(k=0; k< categoryArr["Categories"][i]["families"][j]["machines"].length ; k++){
					var type = categoryArr["Categories"][i]["families"][j]["machines"][k]["name"]

					menuBarHTML += '<li><a href="product-details.html?item='+categoryArr["Categories"][i]["families"][j]["machines"][k]["id"]+'">'+type+'</a></li>'
				}
				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'
			}
		}
	}

	menuBarHTML += '</ul>'


	$("#canvasCommercialMachineMenu").append(menuBarHTML)
}


function showMenubarGrinders(data){

	var category = "Grinder";
	var categoryArr = { Categories: data.mapping};
	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["families"].length; j++){
				var family = categoryArr["Categories"][i]["families"][j]["code"]
				menuBarHTML += '<li><strong>'+family+'</strong></a>'
				menuBarHTML += '<ul>'

				categoryArr["Categories"][i]["families"][j]["machines"].sort(function(a, b) {
			   	 var textA = a.name;
			   	 var textB = b.name;
			   	 return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});


				for(k=0; k< categoryArr["Categories"][i]["families"][j]["machines"].length ; k++){
					var type = categoryArr["Categories"][i]["families"][j]["machines"][k]["name"]
					menuBarHTML += '<li><a href="product-details.html?item='+categoryArr["Categories"][i]["families"][j]["machines"][k]["id"]+'">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';

	$("#grinders_menu").append(menuBarHTML)
}

function showCanvasMenubarGrinders(data){

	var category = "Grinder";
	var categoryArr = { Categories: data.mapping};
	var menuBarHTML = ""
	menuBarHTML += '<ul class="sub-menu" style="display:none">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["families"].length; j++){
				var family = categoryArr["Categories"][i]["families"][j]["code"]
				menuBarHTML += '<li class="menu-item-has-children menuopen">'
				menuBarHTML += '<span class="menu-expand"><i class="fa fa-angle-down"></i></span>'
				menuBarHTML += '<a href="#">'+family+'</a>'
				menuBarHTML += '<ul class="sub-menu" style="display: none;">'

				categoryArr["Categories"][i]["families"][j]["machines"].sort(function(a, b) {
			   	 var textA = a.name;
			   	 var textB = b.name;
			   	 return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});


				for(k=0; k< categoryArr["Categories"][i]["families"][j]["machines"].length ; k++){
					var type = categoryArr["Categories"][i]["families"][j]["machines"][k]["name"]
					menuBarHTML += '<li><a href="product-details.html?item='+categoryArr["Categories"][i]["families"][j]["machines"][k]["id"]+'">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';

	$("#canvasGrinderMenu").append(menuBarHTML)
}


function showMenubarModbar(data){

	var category = "Modbar";
	var categoryArr = { Categories: data.mapping};
	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["families"].length; j++){
				var family = categoryArr["Categories"][i]["families"][j]["code"]
				menuBarHTML += '<li><strong>'+family+'</strong></a>'
				menuBarHTML += '<ul>'

				categoryArr["Categories"][i]["families"][j]["machines"].sort(function(a, b) {
			   	 var textA = a.name;
			   	 var textB = b.name;
			   	 return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});



				for(k=0; k< categoryArr["Categories"][i]["families"][j]["machines"].length ; k++){
					var type = categoryArr["Categories"][i]["families"][j]["machines"][k]["name"]
					menuBarHTML += '<li><a href="product-details.html?item='+categoryArr["Categories"][i]["families"][j]["machines"][k]["id"]+'">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';

	$("#modbar_menu").append(menuBarHTML)
}


function showCanvasMenubarModbar(data){

	var category = "Modbar";
	var categoryArr = { Categories: data.mapping};
	var menuBarHTML = ""
	menuBarHTML += '<ul class="sub-menu" style="display: none;">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["families"].length; j++){
				var family = categoryArr["Categories"][i]["families"][j]["code"]
				menuBarHTML += '<li class="menu-item-has-children menuopen">'
				menuBarHTML += '<span class="menu-expand"><i class="fa fa-angle-down"></i></span>'
				menuBarHTML += '<a href="#">'+family+'</a>'
				menuBarHTML += '<ul class="sub-menu" style="display: none;">'

				categoryArr["Categories"][i]["families"][j]["machines"].sort(function(a, b) {
			   	 var textA = a.name;
			   	 var textB = b.name;
			   	 return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});


				for(k=0; k< categoryArr["Categories"][i]["families"][j]["machines"].length ; k++){
					var type = categoryArr["Categories"][i]["families"][j]["machines"][k]["name"]
					menuBarHTML += '<li><a href="product-details.html?item='+categoryArr["Categories"][i]["families"][j]["machines"][k]["id"]+'">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';

	$("#canvasModbarMenu").append(menuBarHTML)
}







function val2key(val,array){
    for (var key in array) {
        if(array[key] == val){
            return key;
        }
    }
 return false;
}


function showNewsletter(newsletterData){

	var months = {
		'January' : 1,
		'February' : 2,
		'March' : 3,
		'April' : 4,
		'May' : 5,
		'June' : 6,
		'July' : 7,
		'August' : 8,
		'September' : 9,
		'October' : 10,
		'November' : 11,
		'December' : 12
	}


	var newsletter = newsletterData.newsletters.data
	// console.log("newsletter ", newsletter)

	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	menuBarHTML += '<li><a href="#">Newsletter</a>'
	menuBarHTML += '<ul>'

	for(item of newsletter){
		item.timestamp = item.year.toString() + "" + item.month.toString().padStart(2, "0");
	}

	newsletter.sort(function(a, b) {
			   	 var textA = a.timestamp;
			   	 var textB = b.timestamp;
			   	 return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
				});



	for(i=0; i< newsletter.length; i++){
				// menuBarHTML += '<li><a href="'+newsletterArr[i]["pdfURL"]+'">'+newsletterArr[i]["newsletterName"]+'</a></li>'
				menuBarHTML += '<li><a href="'+newsletter[i]["name"]+'"> Newsletter: '+val2key(newsletter[i]["month"],months)+' '+newsletter[i]["year"]+'</a></li>'
	}
	menuBarHTML += '</ul>'
	menuBarHTML += '</li>'


	menuBarHTML += '</ul>';
	// Image
	// menuBarHTML += '<div class="banner_static_menu">'
	// menuBarHTML += '<a href="shop.html"><img src="https://au.lamarzocco.com/wp-content/uploads/2018/06/Leva-X-1.jpg" alt="" style="height: 400px ; width: 100%"></a>'
	// menuBarHTML += '</div>'

	$("#newsletter").append(menuBarHTML)
}



function showCanvasNewsletter(newsletterData){

	var months = {
		'January' : 1,
		'February' : 2,
		'March' : 3,
		'April' : 4,
		'May' : 5,
		'June' : 6,
		'July' : 7,
		'August' : 8,
		'September' : 9,
		'October' : 10,
		'November' : 11,
		'December' : 12
	}


	var newsletter = newsletterData.newsletters.data

	var menuBarHTML = ""
	menuBarHTML += '<ul class="sub-menu" style="display: none;">'

	menuBarHTML += '<li class="menu-item-has-children menuopen">'
	// menuBarHTML += '<span class="menu-expand"><i class="fa fa-angle-down"></i></span>'
	// menuBarHTML += '<a href="#">Newsletter</a>'
	// menuBarHTML += '<ul class="sub-menu" style="display: none;">'
	for(i=0; i< newsletter.length; i++){


				// menuBarHTML += '<li><a href="'+newsletterArr[i]["pdfURL"]+'">'+newsletterArr[i]["newsletterName"]+'</a></li>'
				menuBarHTML += '<li><a href="'+newsletter[i]["name"]+'"> Newsletter: '+val2key(newsletter[i]["month"],months)+' '+newsletter[i]["year"]+'</a></li>'

	}
	// menuBarHTML += '</ul>'
	menuBarHTML += '</li>'


	menuBarHTML += '</ul>';
	// Image
	// menuBarHTML += '<div class="banner_static_menu">'
	// menuBarHTML += '<a href="shop.html"><img src="https://au.lamarzocco.com/wp-content/uploads/2018/06/Leva-X-1.jpg" alt="" style="height: 400px ; width: 100%"></a>'
	// menuBarHTML += '</div>'

	$("#canvasNewsletterMenu").append(menuBarHTML)
}



// function showNewsletter(newsletterArr){
// 	var newsletterHTML = ""
// 	for(i=0 ; i<newsletterArr.length;i++){
// 		newsletterHTML += '<li><a href="'+newsletterArr[i]["pdfURL"]+'">'+newsletterArr[i]["newsletterName"]+'</a></li>'
// 	}

// 	$("#newsletter").append(newsletterHTML)

// }



// showMenubarCommercialMachine("Commercial Machines")
// showMenubarGrinders("Grinders")
// showMenubarModbar("Modbar")
// showMenubarGS3("GS3")
// showMenubarLMHome("LM Home")
// showNewsletter(newsletterArr)



$(document).ready(function(){
	var onResponse = function(response){
		// console.log(JSON.stringify(response,null,2))
		showMenubarCommercialMachine(response.data);
		showMenubarModbar(response.data)
		showMenubarGrinders(response.data)
		// showCanvasMenubarCommercialMachine(response.data);
		showCanvasMenubarCommercialMachine(response.data);
		showCanvasMenubarGrinders(response.data);
		showCanvasMenubarModbar(response.data);
// showNewsletter(newsletterArr)

		showMenubarGrinders()
		showMenubarGS3()
		showMenubarLMHome()


	};
	var onError =function(error){
		// notifyError("Failed to");
	};

	getMappingsMain(onResponse,onError);




	getNewsletter(function(response){
		showNewsletter(response.data)
		showCanvasNewsletter(response.data)
	},onError);



});