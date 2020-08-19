
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


function showMenubarCommercialMachine(category){
	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["family"].length; j++){
				var family = categoryArr["Categories"][i]["family"][j]["name"]
				menuBarHTML += '<li><a href="#">'+family+'</a>'
				menuBarHTML += '<ul>'


				for(k=0; k< categoryArr["Categories"][i]["family"][j]["type"].length ; k++){
					var type = categoryArr["Categories"][i]["family"][j]["type"][k]["name"]
					menuBarHTML += '<li><a href="#">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';
	// Image
	menuBarHTML += '<div class="banner_static_menu">'
	menuBarHTML += '<a href="shop.html"><img src="https://au.lamarzocco.com/wp-content/uploads/2018/06/Leva-X-1.jpg" alt="" style="height: 400px ; width: 100%"></a>'
	menuBarHTML += '</div>'

	$("#commercial_machine_menu").append(menuBarHTML)
}


function showMenubarGrinders(category){
	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["family"].length; j++){
				var family = categoryArr["Categories"][i]["family"][j]["name"]
				menuBarHTML += '<li><a href="#">'+family+'</a>'
				menuBarHTML += '<ul>'


				for(k=0; k< categoryArr["Categories"][i]["family"][j]["type"].length ; k++){

					var type = categoryArr["Categories"][i]["family"][j]["type"][k]["name"]
					menuBarHTML += '<li><a href="#">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';
	// Image
	menuBarHTML += '<div class="banner_static_menu">'
	menuBarHTML += '<a href="shop.html"><img src="https://au.lamarzocco.com/wp-content/uploads/2018/06/Leva-X-1.jpg" alt="" style="height: 400px ; width: 100%"></a>'
	menuBarHTML += '</div>'

	$("#grinders_menu").append(menuBarHTML)
}


function showMenubarModbar(category){
	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["family"].length; j++){
				var family = categoryArr["Categories"][i]["family"][j]["name"]
				menuBarHTML += '<li><a href="#">'+family+'</a>'
				menuBarHTML += '<ul>'


				for(k=0; k< categoryArr["Categories"][i]["family"][j]["type"].length ; k++){

					var type = categoryArr["Categories"][i]["family"][j]["type"][k]["name"]
					menuBarHTML += '<li><a href="#">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';
	// Image
	menuBarHTML += '<div class="banner_static_menu">'
	menuBarHTML += '<a href="shop.html"><img src="https://au.lamarzocco.com/wp-content/uploads/2018/06/Leva-X-1.jpg" alt="" style="height: 400px ; width: 100%"></a>'
	menuBarHTML += '</div>'

	$("#modbar_menu").append(menuBarHTML)
}

function showMenubarGS3(category){
	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["family"].length; j++){
				var family = categoryArr["Categories"][i]["family"][j]["name"]
				menuBarHTML += '<li><a href="#">'+family+'</a>'
				menuBarHTML += '<ul>'


				for(k=0; k< categoryArr["Categories"][i]["family"][j]["type"].length ; k++){

					var type = categoryArr["Categories"][i]["family"][j]["type"][k]["name"]
					menuBarHTML += '<li><a href="#">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';
	// Image
	menuBarHTML += '<div class="banner_static_menu">'
	menuBarHTML += '<a href="shop.html"><img src="https://au.lamarzocco.com/wp-content/uploads/2018/06/Leva-X-1.jpg" alt="" style="height: 400px ; width: 100%"></a>'
	menuBarHTML += '</div>'

	$("#gs3_menu").append(menuBarHTML)
}


function showMenubarLMHome(category){
	var menuBarHTML = ""
	menuBarHTML += '<ul class="mega_menu_inner">'

	for(i=0; i< categoryArr["Categories"].length; i++){
		categoryName = categoryArr["Categories"][i]["name"]
		if(categoryName == category){
			for(j=0; j < categoryArr["Categories"][i]["family"].length; j++){
				var family = categoryArr["Categories"][i]["family"][j]["name"]
				menuBarHTML += '<li><a href="#">'+family+'</a>'
				menuBarHTML += '<ul>'


				for(k=0; k< categoryArr["Categories"][i]["family"][j]["type"].length ; k++){

					var type = categoryArr["Categories"][i]["family"][j]["type"][k]["name"]
					menuBarHTML += '<li><a href="#">'+type+'</a></li>'
				}

				menuBarHTML += '</ul>'
				menuBarHTML += '</li>'

			}
		}
	}

	menuBarHTML += '</ul>';
	// Image
	menuBarHTML += '<div class="banner_static_menu">'
	menuBarHTML += '<a href="shop.html"><img src="https://au.lamarzocco.com/wp-content/uploads/2018/06/Leva-X-1.jpg" alt="" style="height: 400px ; width: 100%"></a>'
	menuBarHTML += '</div>'

	$("#lmHome_menu").append(menuBarHTML)
}




function showNewsletter(newsletterArr){
	var newsletterHTML = ""
	for(i=0 ; i<newsletterArr.length;i++){
		newsletterHTML += '<li><a href="'+newsletterArr[i]["pdfURL"]+'">'+newsletterArr[i]["newsletterName"]+'</a></li>'
	}

	$("#newsletter").append(newsletterHTML)

}

showMenubarCommercialMachine("Commercial Machines")
showMenubarGrinders("Grinders")
showMenubarModbar("Modbar")
showMenubarGS3("GS3")
showMenubarLMHome("LM Home")
showNewsletter(newsletterArr)


