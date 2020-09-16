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

		sidebarHTML += '<article class="filter-group">'
		// sidebarHTML += '<header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside'+i+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
		sidebarHTML += '<header class="card-header"> <a data-toggle="collapse" data-target="#collapse_aside_machine'+i+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
		sidebarHTML += '<h4 class="title">'+machineList[i]["code"]+' </h4>'
		sidebarHTML += '</a> </header>'
		sidebarHTML += '<div class="filter-content collapse" id="collapse_aside_machine'+i+'" style="">'
		sidebarHTML += '<div class="card-body">'



		for(j=0; j<machineList[i]["machines"].length;j++){ 

			sidebarHTML += '<label class="custom-control">'
			sidebarHTML += '<input type="checkbox"  class="custom-control-input">'
			sidebarHTML += '<div class="custom-control-label">'+machineList[i]["machines"][j]["code"]+' </div>'
			sidebarHTML += '</label>'

		}	


		sidebarHTML += ' </div>'
		sidebarHTML += '</div>'
		sidebarHTML += '</article> '
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

	for(i=0; i<groupList.length ;i++){

		const item = groupList[i];

		sidebarHTML += '<article class="filter-parent">'
		// sidebarHTML += '<header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside'+i+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
		sidebarHTML += '<header class="card-header"> <a data-toggle="collapse" data-target="#collapse_aside_group'+i+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
		sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
		sidebarHTML += '</a> </header>'
		sidebarHTML += '<div class="filter-content collapse" id="collapse_aside_group'+i+'" style="">'
		sidebarHTML += '<div class="card-body">'



		for(j=0; j<item["machines"].length;j++){ 

			const inneritem = groupList[i]["machines"][j];

			sidebarHTML += '<article class="filter-parent">'
			// sidebarHTML += '<header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside'+i+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
			sidebarHTML += '<header class="card-header"> <a data-toggle="collapse" data-target="#collapse_aside_group_'+j+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
			sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
			sidebarHTML += '</a> </header>'
			sidebarHTML += '<div class="filter-content collapse" id="collapse_aside_group_'+j+'" style="">'
			sidebarHTML += '<div class="card-body" style="overflow: auto;height: 400px; overflow-y: auto;">'

			for(k=0; k<inneritem["groups"].length;k++){ 

					const innerMostitem = inneritem["groups"][k];
					sidebarHTML += '<label class="custom-control">'
					sidebarHTML += '<input type="checkbox"  class="custom-control-input">'
					sidebarHTML += '<div class="custom-control-label">'+innerMostitem["name"]+' </div>'
					sidebarHTML += '</label>'
			}

			sidebarHTML += ' </div>'
			sidebarHTML += '</div>'
			sidebarHTML += '</article> '
		}	


		sidebarHTML += ' </div>'
		sidebarHTML += '</div>'
		sidebarHTML += '</article> '
	}

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

		sidebarHTML += '<article class="filter-parent">'
		// sidebarHTML += '<header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside'+i+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
		sidebarHTML += '<header class="card-header"> <a data-toggle="collapse" data-target="#collapse_aside_parent'+i+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
		sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
		sidebarHTML += '</a> </header>'
		sidebarHTML += '<div class="filter-content collapse" id="collapse_aside_parent'+i+'" style="">'
		sidebarHTML += '<div class="card-body">'



		for(j=0; j<item["machines"].length;j++){ 

			const inneritem = familyList[i]["machines"][j];

				sidebarHTML += '<article class="filter-parent">'
			// sidebarHTML += '<header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside'+i+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
			sidebarHTML += '<header class="card-header"> <a data-toggle="collapse" data-target="#collapse_aside_parent_'+j+'" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>'
			sidebarHTML += '<h4 class="title">'+item["code"]+' </h4>'
			sidebarHTML += '</a> </header>'
			sidebarHTML += '<div class="filter-content collapse" id="collapse_aside_parent_'+j+'" style="">'
			sidebarHTML += '<div class="card-body" style="overflow: auto;height: 400px; overflow-y: auto;">'

			for(k=0; k<inneritem["parents"].length;k++){ 

					const innerMostitem = inneritem["parents"][k];
					sidebarHTML += '<label class="custom-control">'
					sidebarHTML += '<input type="checkbox"  class="custom-control-input">'
					sidebarHTML += '<div class="custom-control-label">'+innerMostitem["name"]+' </div>'
					sidebarHTML += '</label>'
			}

			sidebarHTML += ' </div>'
			sidebarHTML += '</div>'
			sidebarHTML += '</article> '
		}	


		sidebarHTML += ' </div>'
		sidebarHTML += '</div>'
		sidebarHTML += '</article> '
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
