function populateGroup(){
	var productGroupTable = $('#productGroup').dataTable( {
		searching: false,
		processing: true,
		serverSide: true,
		pageLength: 10,
		autoWidth: false,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			// const loadingId = notifyInfo("Loading groups");
			// console.log(JSON.stringify(data,null,2));

			var onResponse = function(res){
				// dismiss(loadingId);
				callback({
					draw:data.draw,
					recordsTotal: res.data.groups.total,
					recordsFiltered: res.data.groups.total,
					data: res.data.groups.data
				});
			};
			var onError =function(error){
				// dismiss(loadingId);
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
		},
	   {
	    	"title":"Edit",
	    	render: function(data, type, row){
	           return '<button type="button" id="btnEdit" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-edit">'
	       }
	   },
	   {
	    	"title":"Delete",
	    	render: function(data, type, row){
	           return '<button type="button"  id="btnDelete" class="btn btn-default btn-sm"><span class=" 	glyphicon glyphicon-trash">'
	       }
	   }
		]
	});


	$('#productGroup').on('click', '#btnEdit', function () {
		var RowIndex = $(this).closest('tr');
		var data = productGroupTable.api().row(RowIndex).data();

		$("#inputEditGroupId").val(data.id);
		$("#inputEditGroupName").val(data.name);
		$("#inputEditGroupDesc").val(data.desc);


		$("#inputEditGroupName").trackChanges();
		$("#inputEditGroupDesc").trackChanges();
		
		$('#cancelEditGroupModal').click(function () {
			$('#editGroupModal').modal('hide');
		});


		
		$('#submitEditGroupModal').click(function () {
			const name = $("#inputEditGroupName").getChanged();
			const desc = $("#inputEditGroupDesc").getChanged();
			var onResponse = function(response){
				notifySuccess("Updated successfully");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to update");
			};
			updateGroup(onResponse,onError, data.id,name,desc);
		});
		

		$('#editGroupModal').modal('show');




	});

		$('#confirmAddGroup').click(function () {
			var desc = $("#inputAddGroupDesc").val();
			var name = $("#inputAddGroupName").val();
			var onResponse = function(response){
				notifySuccess("Added successfully");
				// productGroupTable.api().clear();
				// populateGroup();
				window.location.reload();
			};
			var onError =function(error){
				console.log(error);
				notifyError("Failed to add");
			};
			addGroup(onResponse,onError,name,desc);
		});
			
		
	$('#productGroup').on('click', '#btnDelete', function () {
		var RowIndex = $(this).closest('tr');
		var data = productGroupTable.api().row(RowIndex).data();
		var r = confirm("Delete this group?");
		if (r == true) {
			var onResponse = function(response){
				notifySuccess("Group deleted");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to delete thr group");
			};
			deleteGroup(onResponse,onError,data.id);
		}
	});



}

function populateFamilyDesc(){
	var productGroupTable = $('#productFamilyDesc').dataTable( {
		searching: false,
		processing: true,
		serverSide: true,
		pageLength: 10,
		autoWidth: false,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			// const loadingId = notifyInfo("Loading groups");

			var onResponse = function(res){
				// dismiss(loadingId);

				callback({
					draw:data.draw,
					recordsTotal: res.data.families.total,
					recordsFiltered: res.data.families.total,
					data: res.data.families.data
				});
			};
			var onError =function(error){
				// dismiss(loadingId);
			};
			var pageIndex = data.start / data.length + 1 ;
			getFamilyDescWithPaging(onResponse,onError,pageIndex,data.length);

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
			console.log("family Desc",row);
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
		},
	   {
	    	"title":"Edit",
	    	render: function(data, type, row){
	           return '<button type="button" id="btnEdit" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-edit">'
	       }
	   },
	   {
	    	"title":"Delete",
	    	render: function(data, type, row){
	           return '<button type="button"  id="btnDelete" class="btn btn-default btn-sm"><span class=" 	glyphicon glyphicon-trash">'
	       }
	   }
		]
	});


	$('#productFamilyDesc').on('click', '#btnEdit', function () {
		var RowIndex = $(this).closest('tr');
		var data = productGroupTable.api().row(RowIndex).data();

		$("#inputEditFamilyDescId").val(data.id);
		$("#inputEditFamilyDescName").val(data.name);
		$("#inputEditFamilyDescDesc").val(data.desc);


		$("#inputEditFamilyDescName").trackChanges();
		$("#inputEditFamilyDescDesc").trackChanges();
		
		$('#cancelEditFamilyDescModal').click(function () {
			$('#editFamilyDescModal').modal('hide');
		});


		
		$('#submitEditFamilyDescModal').click(function () {
			const name = $("#inputEditFamilyDescName").getChanged();
			const desc = $("#inputEditFamilyDescDesc").getChanged();
			var onResponse = function(response){
				notifySuccess("Updated successfully");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to update");
			};
			updateFamilyDesc(onResponse,onError, data.id,name,desc);
		});

		$('#editFamilyDescModal').modal('show');
	});

		$('#confirmAddFamilyDesc').click(function () {
			var desc = $("#inputAddFamilyDescDesc").val();
			var name = $("#inputAddFamilyDescName").val();
			var onResponse = function(response){
				notifySuccess("Added successfully");
				// productGroupTable.api().clear();
				// populateGroup();
				window.location.reload();
			};
			var onError =function(error){
				console.log(error);
				notifyError("Failed to add");
			};
			addFamilyDesc(onResponse,onError,name,desc);
		});
			
		
	$('#productFamilyDesc').on('click', '#btnDelete', function () {
		var RowIndex = $(this).closest('tr');
		var data = productFamilyDescTable.api().row(RowIndex).data();
		var r = confirm("Delete this family desc?");
		if (r == true) {
			var onResponse = function(response){
				notifySuccess("Item deleted");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to delete");
			};
			deleteFamilyDesc(onResponse,onError,data.id);
		}
	});



}




function populateFamily(){
	const tableFamily = $('#productFamily').dataTable( {
		searching: false,
		processing: true,
		serverSide: true,
		autoWidth: false,
		pageLength: 10,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			// const loadingId = notifyInfo("Loading family");
			// console.log("Family", JSON.stringify(data,null,2));

			var onResponse = function(res){
				// dismiss(loadingId);
				callback({
					draw:data.draw,
					recordsTotal: res.data.families.total,
					recordsFiltered: res.data.families.total,
					data: res.data.families.data
				});
			};
			var onError =function(error){
				// dismiss(loadingId);
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
		},
	  {
	    	"title":"Edit",
	    	render: function(data, type, row){
	           return '<button type="button" id="btnEdit" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-edit">'
	       }
	   },
	   {
	    	"title":"Delete",
	    	render: function(data, type, row){
	           return '<button type="button"  id="btnDelete" class="btn btn-default btn-sm"><span class=" 	glyphicon glyphicon-trash">'
	       }
	   }
		]
	});


	$('#productFamily').on('click', '#btnEdit', function () {
		var RowIndex = $(this).closest('tr');
		var data = tableFamily.api().row(RowIndex).data();

		$("#inputEditFamilyId").val(data.id);
		$("#inputEditFamilyCode").val(data.code);
		$("#inputEditFamilyDesc").val(data.desc);


		$("#inputEditFamilyCode").trackChanges();
		$("#inputEditFamilyDesc").trackChanges();
		
		$('#cancelEditFamilyModal').click(function () {
			$('#editFamilyModal').modal('hide');
		});

			

		$('#submitEditFamilyModal').click(function () {
			const name = $("#inputEditFamilyCode").getChanged();
			const desc = $("#inputEditFamilyDesc").getChanged();
			var onResponse = function(response){
				notifySuccess("Updated successfully");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to update");
			};
			updateFamily(onResponse,onError, data.id,name,desc);
		});

		$('#editFamilyModal').modal('show');


	});

	


		$('#confirmAddFamily').click(function () {
			var desc = $("#inputAddFamilyDesc").val();
			var code = $("#inputAddFamilyCode").val();
			var onResponse = function(response){
				notifySuccess("Added successfully");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to add");
			};
			addFamily(onResponse,onError,code,desc);
		});
			
		
		
	$('#productFamily').on('click', '#btnDelete', function () {
		var RowIndex = $(this).closest('tr');
		var data = tableFamily.api().row(RowIndex).data();
		var r = confirm("Delete this group?");
		if (r == true) {
			var onResponse = function(response){
				notifySuccess("Family deleted");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to delete the Family");
			};
			deleteFamily(onResponse,onError,data.id);
		}
	});
}

function populateType(){

	const typeTable = $('#productType').dataTable( {
		searching: false,
		processing: true,
		serverSide: true,
		autoWidth: false,
		pageLength: 10,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			// const loadingId = notifyInfo("Loading types");
			// console.log(JSON.stringify(data,null,2));

			var onResponse = function(res){
				// dismiss(loadingId);
				callback({
					draw:data.draw,
					recordsTotal: res.data.types.total,
					recordsFiltered: res.data.types.total,
					data: res.data.types.data
				});
			};
			var onError =function(error){
				// dismiss(loadingId);
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
		},
	 {
	    	"title":"Edit",
	    	render: function(data, type, row){
	           return '<button type="button" id="btnEdit" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-edit">'
	       }
	   },
	   {
	    	"title":"Delete",
	    	render: function(data, type, row){
	           return '<button type="button"  id="btnDelete" class="btn btn-default btn-sm"><span class=" 	glyphicon glyphicon-trash">'
	       }
	   }
		]
	});

	$('#productType').on('click', '#btnEdit', function () {
		var RowIndex = $(this).closest('tr');
		var data = typeTable.api().row(RowIndex).data();

		$("#inputEditTypeId").val(data.id);
		$("#inputEditTypeName").val(data.name);
		$("#inputEditTypeDesc").val(data.desc);


		$("#inputEditTypeName").trackChanges();
		$("#inputEditTypeDesc").trackChanges();
		
		$('#cancelEditTypeModal').click(function () {
			$('#editTypeModal').modal('hide');
		});


		$('#submitEditTypeModal').click(function () {
			const name = $("#inputEditTypeName").getChanged();
			const desc = $("#inputEditTypeDesc").getChanged();
			var onResponse = function(response){
				notifySuccess("Updated successfully");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to update");
			};
			updateType(onResponse,onError, data.id,name,desc);
		});

		$('#editTypeModal').modal('show');
	});

		$('#productType').on('click', '#btnDelete', function () {
		var RowIndex = $(this).closest('tr');
		var data = typeTable.api().row(RowIndex).data();
		var r = confirm("Delete this Type?");
		if (r == true) {
			var onResponse = function(response){
				notifySuccess("Type deleted");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to delete the Type");
			};
			deleteType(onResponse,onError,data.id);
		}
	});




		$('#confirmAddType').click(function () {
			var desc = $("#inputAddTypeDesc").val();
			var name = $("#inputAddTypeName").val();
			var onResponse = function(response){
				notifySuccess("Added successfully");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to add");
			};
			addType(onResponse,onError,name,desc);
		});
			

		
}


function populateParent(){

	const tableParent = $('#productParent').dataTable( {
		searching: false,
		processing: true,
		serverSide: true,
		autoWidth: false,
		pageLength: 10,
		bSort : false,
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		ajax: function(data, callback, settings) {
			// const loadingId = notifyInfo("Loading parents");
			// console.log(JSON.stringify(data,null,2));

			var onResponse = function(res){
				// dismiss(loadingId);
				callback({
					draw:data.draw,
					recordsTotal: res.data.parents.total,
					recordsFiltered: res.data.parents.total,
					data: res.data.parents.data
				});
			};
			var onError =function(error){
				console.log(error)
				// dismiss(loadingId);
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
		},
	 {
	    	"title":"Edit",
	    	render: function(data, type, row){
	           return '<button type="button" id="btnEdit" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-edit">'
	       }
	   },
	   {
	    	"title":"Delete",
	    	render: function(data, type, row){
	           return '<button type="button"  id="btnDelete" class="btn btn-default btn-sm"><span class=" 	glyphicon glyphicon-trash">'
	       }
	   }
		]
	});


	$('#productParent').on('click', '#btnEdit', function () {
		var RowIndex = $(this).closest('tr');
		var data = tableParent.api().row(RowIndex).data();

		$("#inputEditParentId").val(data.id);
		$("#inputEditParentName").val(data.name);
		$("#inputEditParentDesc").val(data.desc);


		$("#inputEditParentName").trackChanges();
		$("#inputEditParentDesc").trackChanges();
		
		$('#cancelEditParentModal').click(function () {
			$('#editParentModal').modal('hide');
		});



		$('#submitEditParentModal').click(function () {
			const name = $("#inputEditParentName").getChanged();
			const desc = $("#inputEditParentDesc").getChanged();
			var onResponse = function(response){
				notifySuccess("Updated successfully");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to update");
			};
			updateParent(onResponse,onError, data.id,name,desc);
		});

		$('#editParentModal').modal('show');


	});



		$('#confirmAddParent').click(function () {
			var desc = $("#inputAddParentDesc").val();
			var name = $("#inputAddParentName").val();
			var onResponse = function(response){
				notifySuccess("Added successfully");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to add");
			};
			addParent(onResponse,onError,name,desc);
		});
			
		
			
		
	$('#productParent').on('click', '#btnDelete', function () {
		var RowIndex = $(this).closest('tr');
		var data = tableParent.api().row(RowIndex).data();
		var r = confirm("Delete this Type?");
		if (r == true) {
			var onResponse = function(response){
				notifySuccess("Parent deleted");
				window.location.reload();
			};
			var onError =function(error){
				notifyError("Failed to delete the Parent");
			};
			deleteParent(onResponse,onError,data.id);
		}
	});

}


$(document).ready(function(){

	$.fn.extend({
		trackChanges: function() {
			//this.off('change');
			this.removeData("changed");
			this.change(function() {
				// alert($(this).val())
				$(this).data("changed", $(this).val());
			});
		}
		,
		getChanged: function() { 
			return this.data("changed"); 
		}
	});

	populateGroup();
	populateFamily();
	populateType();
	populateParent();
	populateFamilyDesc();
			$('#btnAddNew').click(function () {
				$('#addTypeModal').modal('show');
			});

		$('#nav-group-tab').click(function () {
			$('#btnAddNew').unbind();
			$('#btnAddNew').click(function () {
				$('#addGroupModal').modal('show');
			});
		});
		$('#nav-family-tab').click(function () {
			$('#btnAddNew').unbind();
			$('#btnAddNew').click(function () {
				$('#addFamilyModal').modal('show');
			});
		});
		$('#nav-familyDesc-tab').click(function () {
			$('#btnAddNew').unbind();
			$('#btnAddNew').click(function () {
				$('#addProductFamilyDescModal').modal('show');
			});
		});
		$('#nav-parent-tab').click(function () {
			$('#btnAddNew').unbind();
			$('#btnAddNew').click(function () {
				$('#addParentModal').modal('show');
			});
		});
		$('#nav-type-tab').click(function () {
			$('#btnAddNew').unbind();
			$('#btnAddNew').click(function () {
				$('#addTypeModal').modal('show');
			});
		});

});