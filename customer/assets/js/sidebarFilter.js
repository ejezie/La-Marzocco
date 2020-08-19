var machineList = [{
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




async function showMachines(){
	var sidebarHTML = ""

	for(i=0; i<machineList.length ;i++){

		sidebarHTML += '<li class="menu_item_children">'
		sidebarHTML += '<div class="widget_list widget_categories">'
		sidebarHTML += '<h2>'+machineList[i]["family"]+'</h2>'
		sidebarHTML += '<ul>'

		for(j=0; j<machineList[i]["machines"].length;j++){

			sidebarHTML += '<li><input type="checkbox"><a href="#">'+machineList[i]["machines"][j]+'</a><span class="checkmark"></span></li>'
		}
		sidebarHTML += '</ul>'
		sidebarHTML += '</div>'
		sidebarHTML += '</li>'
	}

	$("#sidebarMachineFilter").append(sidebarHTML)

}


showMachines(machineList)

