function populateGroup(){
	itemMasterTable = $('#productGroup').dataTable( {

		processing: true,
		serverSide: true,
		pageLength: 10,
		bSort : false,
		lengthMenu: [[10, 20, 500, 1000, -1], [10, 20, 500, 1000, "All"]],
		ajax: function(data, callback, settings) {
			const loadingId = notifyInfo("Loading groups");

			var onResponse = function(res){
				dismiss(loadingId);
				callback({
					draw:data.draw,
					recordsTotal: res.data.groups.total,
					recordsFiltered: res.data.groups.total,
					data: res.data.groups.data
				});
			};
			var onError =function(error){
				dismiss(loadingId);
			};
			var pageIndex = data.start / data.length + 1 ;
			getGroupsWithPaging(onResponse,onError,pageIndex,data.length);

		},
		columns: [
		{
			"title":"Sr No",
			render: function(data, type, row, meta){
				var row_index = meta.row+1
				return row_index
			}
		},
		{
			"title":"Code",
			render: function(data, type, row){
				return row.id ;
			}
		},
		{
			"title":"Type",
			render: function(data, type, row){
	            return row.name ;
	        }
	    },
	    {
	    	"title":"Description",
	    	render: function(data, type, row){
	           return row.desc;
	       }
	   }
	   ]
	};

}
function populateFamily(){

	var familyDropdown = $("#input_item_family");
	var onResponse = function(response){
		for(var i=0; i< response.data.families.data.length; i++){
			const group = response.data.families.data[i];
			familyDropdown.append($("<option>").text(group.code +"   "+((group.desc != null)? group.desc : "")).val(group.id));
		}
	};
	var onError =function(error){
		notifyError("Failed to load families");
	};

	getFamilies(onResponse,onError);

}
function populateType(){

	var typeDropdown = $("#input_item_type");
	var onResponse = function(response){
		for(var i=0; i< response.data.types.data.length; i++){
			const group = response.data.types.data[i];
			typeDropdown.append($("<option>").text(group.name +"   "+((group.desc != null)? group.desc : "")).val(group.id));
		}
	};
	var onError =function(error){
		console.log(error)
		notifyError("Failed to load types");
	};

	getTypes(onResponse,onError);

}
function populateParent(){

	var typeDropdown = $("#input_item_parent");
	var onResponse = function(response){
		for(var i=0; i< response.data.parents.data.length; i++){
			const group = response.data.parents.data[i];
			typeDropdown.append($("<option>").text(group.name +"   "+ ((group.desc != null)? group.desc : "")).val(group.id));
		}
	};
	var onError =function(error){
		console.log(error)
		notifyError("Failed to load parents");
	};

	getParents(onResponse,onError);

}




$(document).ready(function(){

	populateGroup();
	populateFamily();
	populateType();
	populateParent();


});