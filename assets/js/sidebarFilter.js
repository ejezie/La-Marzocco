var machineLists = [{
						"family" : "LINEA",
						"machines" : [
										"Linea 1",
										"Linea 2", 
										"Linea 3", 
										"Linea 4",
										"Linea 5",
										"Linea 6",
										"Linea 7",
										"Linea 8",
										"Linea 9",
										"Linea 10",
										"Linea 11"
									]

					},
					{
						"family" : "Modbar",
						"machines" : [
										"Modbar 1",
										"Modbar 2", 
										"Modbar 3", 
										"Modbar 4",
										"Modbar 5",
										"Modbar 6",
										"Modbar 7",
										"Modbar 8",
										"Modbar 9",
										"Modbar 10",
										"Modbar 11"
									]

					},
					{
						"family" : "GS3",
						"machines" : [
										"GS3 1",
										"GS3 2", 
										"GS3 3", 
										"GS3 4",
										"GS3 5",
										"GS3 6",
										"GS3 7",
										"GS3 8",
										"GS3 9",
										"GS3 10",
										"GS3 11"
									]

					},
					{
						"family" : "Vulcano",
						"machines" : [
										"Vulcano 1",
										"Vulcano 2", 
										"Vulcano 3", 
										"Vulcano 4",
										"Vulcano 5",
										"Vulcano 6",
										"Vulcano 7",
										"Vulcano 8",
										"Vulcano 9",
										"Vulcano 10",
										"Vulcano 11"
									]

					}
				]

var groupList = ["Commercial Machines","Panels and external parts","Group1","Group2"]

var familyList = ["LINEA","MODBAR","ESPRESSO MACHINES"]



// async function showMachinesSideFilter(machineList){
// 	var sidebarHTML = ""

// 	for(i=0; i<machineList.length ;i++){

// 		sidebarHTML += '<li class="menu_item_children">'
// 		sidebarHTML += '<div class="widget_list widget_categories">'
// 		sidebarHTML += '<h2>'+machineList[i]["family"]+'</h2>'
// 		sidebarHTML += '<ul>'

// 		for(j=0; j<machineList[i]["machines"].length;j++){

// 			sidebarHTML += '<li><input type="checkbox"><a href="#">'+machineList[i]["machines"][j]+'</a><span class="checkmark"></span></li>'
// 		}
// 		sidebarHTML += '</ul>'
// 		sidebarHTML += '</div>'
// 		sidebarHTML += '</li>'
// 	}

// 	$("#sidebarMachineFilter").append(sidebarHTML)

// }


// async function showGroupSideFilter(groupList){
// 	var sidebarHTML = ""

// 	sidebarHTML += '<li class="menu_item_children">'
// 	sidebarHTML += '<div class="widget_list widget_categories">'
// 	sidebarHTML += '<h2>Group</h2>'
// 	sidebarHTML += '<ul>'

// 	for(i=0; i<groupList.length ;i++){

// 		sidebarHTML += '<li><input type="checkbox"><a href="#">'+groupList[i]+'</a><span class="checkmark"></span></li>'
// 		// sidebarHTML += '<li class="menu_item_children"><input type="checkbox"><a href="#">'+groupList[i]+'</a>'
// 		// sidebarHTML += '<li class="menu_item_children"><a href="#">'+groupList[i]+'</a>'
// 	}

// 	sidebarHTML += '</ul>'
// 	sidebarHTML += '</div>'
// 	sidebarHTML += '</li>'

// 	$("#sidebarGroupFilter").append(sidebarHTML)

// }


// async function showFamilySideFilter(familyList){
// 	var sidebarHTML = ""

// 	sidebarHTML += '<li class="menu_item_children">'
// 	sidebarHTML += '<div class="widget_list widget_categories">'
// 	sidebarHTML += '<h2>Family</h2>'
// 	sidebarHTML += '<ul>'

// 	for(i=0; i<familyList.length ;i++){
// 		sidebarHTML += '<li><input type="checkbox"><a href="#">'+familyList[i]+'</a><span class="checkmark"></span></li>'
// 		// sidebarHTML += '<li class="menu_item_children"><a href="#">'+familyList[i]+'</a>'
// 	}

// 	sidebarHTML += '</ul>'
// 	sidebarHTML += '</div>'
// 	sidebarHTML += '</li>'

// 	$("#sidebarFamilyFilter").append(sidebarHTML)

// }


// 





async function showMachinesSideFilter(machineList){

	var sidebarHTML = ""

	for(i=0; i<machineList.length ;i++){

		// sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
		sidebarHTML += '<a href="#"> '+machineList[i]["code"]+' <i class="fa fa-angle-right"></i></a>'
		sidebarHTML += '<ul class="categories_mega_menu" style="width : max-content;white-space: nowrap;overflow-y: scroll;height: 500px;">'

		// sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
		sidebarHTML += '<li class="menu_item_children"><a href="#">'+machineList[i]["code"]+'</a>'
		sidebarHTML += '<div class="categorie_sub_menu">'
		sidebarHTML += '<ul>'

		for(k=0; k<machineList[i]["machines"].length;k++){

		console.log(">>>>>>>>>>",machineList[i]["machines"]) 

				sidebarHTML += '<li><label class="custom-control"> <input type="checkbox"  class="custom-control-input"><div class="custom-control-label">'+machineList[i]["machines"][k]["code"]+' </div></label></li>'
		}
		sidebarHTML += '</ul>'
		sidebarHTML += '</div>'
		sidebarHTML += '</li>'



		sidebarHTML += '</ul>'
	}


	$("#sidebarMachineFilter").append(sidebarHTML);
	$('#sidebarMachineFilter input[type="checkbox"]').on('change', function() {
   		$('input[type="checkbox"]').not(this).prop('checked', false);
   		showSearchResults();
	});

}


function refreshCatalog(){
	var machines = getCheckedMachines();
	var groups = getCheckedGroups();
}

function getCheckedMachine(){
	    $('#sidebarMachineFilter input:checked').each(function(){
	        return this.value;
	    });        
	return null;
}

function getCheckedMachines(){
	var machines = [];
	    $('#sidebarMachineFilter input:checked').each(function(){
	        machines.push(this.value);
	    });        
	console.log(machines);
	return machines;
}



function getCheckedGroup(){
	    $('#sidebarGroupFilter input:checked').each(function(){
	        return this.value;
	    });        
	return null;
}

function getCheckedGroups(){
	var groups = [];
	    $('#sidebarGroupFilter input:checked').each(function(){
	        groups.push(this.value);
	    });        
	console.log(groups);
	return groups;
}



function getCheckedParent(){
	    $('#sidebarParentFilter input:checked').each(function(){
	        return this.value;
	    });        
	return null;
}


async function showGroupSideFilter(groupList){
	var sidebarHTML = ""

	// for(i=0; i<groupList.length ;i++){

	// 	const item = groupList[i];

	// 	// sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
	// 	sidebarHTML += '<a href="#"> '+item["code"]+' <i class="fa fa-angle-right"></i></a>'
	// 	sidebarHTML += '<ul class="categories_mega_menu" style="width : max-content;white-space: nowrap;overflow-y: scroll;height: 500px;">'



	// 	for(j=0; j<item["machines"].length;j++){ 

	// 		const inneritem = groupList[i]["machines"][j];

	// 		console.log("inneritem : ", inneritem)

	// 		// sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
	// 		sidebarHTML += '<li class="menu_item_children"><a href="#">'+inneritem["code"]+'</a>'
	// 		sidebarHTML += '<div class="categorie_sub_menu">'
	// 		sidebarHTML += '<ul>'

	// 		for(k=0; k<inneritem["groups"].length;k++){ 

	// 				const innerMostitem = inneritem["groups"][k];
	// 				sidebarHTML += '<li><label class="custom-control"> <input type="checkbox"  class="custom-control-input"><div class="custom-control-label">'+innerMostitem["name"]+' </div></label></li>'
	// 		}
	// 		sidebarHTML += '</ul>'
	// 		sidebarHTML += '</div>'
	// 		sidebarHTML += '</li>'

	// 	}


	// 	sidebarHTML += '</ul>'
	// }

	sidebarHTML += '<a href="#">Brake Parts js<i class="fa fa-angle-right"></i></a>'
	sidebarHTML += '<ul class="categories_mega_menu">'
	sidebarHTML += '<li class="menu_item_children"><a href="#">Wheel Bearings</a>'
	sidebarHTML += '<ul class="categorie_sub_menu">'
	sidebarHTML += '<li><a href="">Bower</a></li>'
	sidebarHTML += '<li><a href="">Flipbac</a></li>'
	sidebarHTML += '<li><a href="">Gary Fong</a></li>'
	sidebarHTML += '<li><a href="">GigaPan</a></li>'
	sidebarHTML += '</ul>'
	sidebarHTML += '</li>'
	sidebarHTML += '<li class="menu_item_children"><a href="#">Wheel Rim Screws</a>'
	sidebarHTML += '<ul class="categorie_sub_menu">'
	sidebarHTML += '<li><a href="">Accessories</a></li>'
	sidebarHTML += '<li><a href="">2-Stroke</a></li>'
	sidebarHTML += '<li><a href="">Handbag</a></li>'
	sidebarHTML += '<li><a href="">Clothing</a></li>'
	sidebarHTML += '</ul>'
	sidebarHTML += '</li>'
	sidebarHTML += '<li class="menu_item_children last_child"><a href="#">Wheel Simulators</a>'
	sidebarHTML += '<ul class="categorie_sub_menu">'
	sidebarHTML += '<li><a href="">Bags & Cases</a></li>'
	sidebarHTML += '<li><a href="">Binoculars & Scopes</a></li>'
	sidebarHTML += '<li><a href="">Film Photography</a></li>'
	sidebarHTML += '<li><a href="">Lighting & Studio</a></li>'
	sidebarHTML += '</ul>'
	sidebarHTML += '<div class="categorie_banner">'
	sidebarHTML += '<a href="#"><img src="assets/img/bg/banner2.jpg" alt=""></a>'
	sidebarHTML += '</div>'
	sidebarHTML += '</li>'
	sidebarHTML += ''
	sidebarHTML += '</ul>'


	$("#sidebarGroupFilter").append(sidebarHTML);
	$('#sidebarGroupFilter input[type="checkbox"]').on('change', function() {
   		$('input[type="checkbox"]').not(this).prop('checked', false);
   		showSearchResults();
	});
}


async function showParentSideFilter(familyList){
	var sidebarHTML = ""


	for(i=0; i<familyList.length ;i++){

		const item = familyList[i];

		// sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
		sidebarHTML += '<a href="#"> '+item["code"]+' <i class="fa fa-angle-right"></i></a>'
		sidebarHTML += '<ul class="categories_mega_menu" style="width : max-content;white-space: nowrap;overflow-y: scroll;height: 500px;">'



		for(j=0; j<item["machines"].length;j++){ 

			const inneritem = familyList[i]["machines"][j];

			console.log("inneritem : ", inneritem)

			// sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
			sidebarHTML += '<li class="menu_item_children"><a href="#">'+inneritem["code"]+'</a>'
			sidebarHTML += '<div class="categorie_sub_menu">'
			sidebarHTML += '<ul>'

			for(k=0; k<inneritem["parents"].length;k++){ 

					const innerMostitem = inneritem["parents"][k];
					sidebarHTML += '<li><label class="custom-control"> <input type="checkbox"  class="custom-control-input"><div class="custom-control-label">'+innerMostitem["name"]+' </div></label></li>'
			}
			sidebarHTML += '</ul>'
			sidebarHTML += '</div>'
			sidebarHTML += '</li>'

		}


		sidebarHTML += '</ul>'
	}

	$("#sidebarParentFilter").append(sidebarHTML);
	$('#sidebarParentFilter input[type="checkbox"]').on('change', function() {
   		$('input[type="checkbox"]').not(this).prop('checked', false);
   		showSearchResults();
	});
}


// showMachinesSideFilter(machineList)
// showGroupSideFilter(groupList)
// showFamilySideFilter(familyList)


$(document).ready(function(){
	var onError =function(error){
		// notifyError("Failed to");
	};

	getMappingsMachine(function(response){
		showMachinesSideFilter(response.data.mapping)
	},onError);
	
	getMappingParent(function(response){
		showParentSideFilter(response.data.mapping)
	},onError);


	getMappingGroup(function(response){
		showGroupSideFilter(response.data.mapping)
	},onError);

	

});



/*----------  Group SideFilter  ----------*/
$(".categories_menu_toggle li.hidden_group").hide();
   $("#more-btn-group").on('click', function (e) {

	e.preventDefault();
	$(".categories_menu_toggle li.hidden_group").toggle(500);
	var htmlAfter = 'Group <i class="icon-control fa fa-chevron-up"></i>';
	var htmlBefore = 'Group <i class="icon-control fa fa-chevron-down"></i>';


	if ($(this).html() == htmlBefore) {
		$(this).html(htmlAfter);
	} else {
		$(this).html(htmlBefore);
	}
});


/*----------  Catalog SideFilter  ----------*/
$(".categories_menu_toggle li.hidden_catalog").hide();
   $("#more-btn-catalog").on('click', function (e) {

	e.preventDefault();
	$(".categories_menu_toggle li.hidden_catalog").toggle(500);
	var htmlAfter = 'Catalog <i class="icon-control fa fa-chevron-up"></i>';
	var htmlBefore = 'Catalog <i class="icon-control fa fa-chevron-down"></i>';


	if ($(this).html() == htmlBefore) {
		$(this).html(htmlAfter);
	} else {
		$(this).html(htmlBefore);
	}
});



/*----------  Machine SideFilter  ----------*/
$(".categories_menu_toggle li.hidden_machine").hide();
   $("#more-btn-machine").on('click', function (e) {

	e.preventDefault();
	$(".categories_menu_toggle li.hidden_machine").toggle(500);
	var htmlAfter = 'Machine <i class="icon-control fa fa-chevron-up"></i>';
	var htmlBefore = 'Machine <i class="icon-control fa fa-chevron-down"></i>';


	if ($(this).html() == htmlBefore) {
		$(this).html(htmlAfter);
	} else {
		$(this).html(htmlBefore);
	}
});





$('.child').hide(); //Hide children by default
$('.parent').children().click(function () {
	event.preventDefault();
	$(this).children('.child').slideToggle('slow');
	$(this).find('span').toggle();
});