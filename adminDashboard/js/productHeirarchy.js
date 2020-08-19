function populateGroup(){
	$('#productGroup').dataTable( {

		processing: true,
		serverSide: true,
		pageLength: 10,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			const loadingId = notifyInfo("Please wait");
			console.log(JSON.stringify(data,null,2));

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
				for (var key of Object.keys(error.response.data.message)) {
					notifyError(error.response.data.message[key][0]);
				}
				notifyError(error.response.data.message);
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
	});

}
function populateFamily(){
$('#productFamily').dataTable( {

		processing: true,
		serverSide: true,
		pageLength: 10,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			const loadingId = notifyInfo("Please wait");
			console.log(JSON.stringify(data,null,2));

			var onResponse = function(res){
				dismiss(loadingId);
				callback({
					draw:data.draw,
					recordsTotal: res.data.families.total,
					recordsFiltered: res.data.families.total,
					data: res.data.families.data
				});
			};
			var onError =function(error){
				dismiss(loadingId);
				for (var key of Object.keys(error.response.data.message)) {
					notifyError(error.response.data.message[key][0]);
				}
				notifyError(error.response.data.message);
			};
			var pageIndex = data.start / data.length + 1 ;
			getFamiliesWithPaging(onResponse,onError,pageIndex,data.length);

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
			"title":"ID",
			render: function(data, type, row){
				return row.id ;
			}
		},
		{
			"title":"Family",
			render: function(data, type, row){
	            return row.code ;
	        }
	    },
	    {
	    	"title":"Description",
	    	render: function(data, type, row){
	           return row.desc;
	       }
	   }
	   ]
	});

}
function populateType(){

$('#productType').dataTable( {

		processing: true,
		serverSide: true,
		pageLength: 10,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			const loadingId = notifyInfo("Please wait");
			console.log(JSON.stringify(data,null,2));

			var onResponse = function(res){
				dismiss(loadingId);
				callback({
					draw:data.draw,
					recordsTotal: res.data.types.total,
					recordsFiltered: res.data.types.total,
					data: res.data.types.data
				});
			};
			var onError =function(error){
				dismiss(loadingId);
				for (var key of Object.keys(error.response.data.message)) {
					notifyError(error.response.data.message[key][0]);
				}
				notifyError(error.response.data.message);
			};
			var pageIndex = data.start / data.length + 1 ;
			getTypesWithPaging(onResponse,onError,pageIndex,data.length);

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
	});


}
function populateParent(){

$('#productParent').dataTable( {

		processing: true,
		serverSide: true,
		pageLength: 10,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			const loadingId = notifyInfo("Please wait");
			console.log(JSON.stringify(data,null,2));

			var onResponse = function(res){
				dismiss(loadingId);
				callback({
					draw:data.draw,
					recordsTotal: res.data.parents.total,
					recordsFiltered: res.data.parents.total,
					data: res.data.parents.data
				});
			};
			var onError =function(error){
				console.log(error)
				dismiss(loadingId);
				for (var key of Object.keys(error.response.data.message)) {
					notifyError(error.response.data.message[key][0]);
				}
				notifyError(error.response.data.message);
			};
			var pageIndex = data.start / data.length + 1 ;
			getParentsWithPaging(onResponse,onError,pageIndex,data.length);

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
			"title":"Name",
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
	});



}




$(document).ready(function(){

	populateGroup();
	populateFamily();
	populateType();
	populateParent();


});