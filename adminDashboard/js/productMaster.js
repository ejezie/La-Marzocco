    var itemMasterTable;
    function populateGroup(currentVal) {
        var groupDropdown = $("#input_item_group");
        groupDropdown.empty();
        var onResponse = function(response) {
            for (var i = 0; i < response.data.groups.data.length; i++) {
                const group = response.data.groups.data[i];
                groupDropdown.append($("<option>").text(group.name + "   " + ((group.desc != null) ? group.desc : "")).val(group.id));
            }
            groupDropdown.val(currentVal);
            groupDropdown.trackChanges()
        };
        var onError = function(error) {
            notifyError("Failed to load groups");
        };
        getGroups(onResponse, onError);
    }

    function populateFamily(currentVal) {
        var familyDropdown = $("#input_item_family");
        familyDropdown.empty();
        var onResponse = function(response) {
            for (var i = 0; i < response.data.families.data.length; i++) {
                const group = response.data.families.data[i];
                familyDropdown.append($("<option>").text(group.code + "   " + ((group.desc != null) ? group.desc : "")).val(group.id));
            }
            familyDropdown.val(currentVal);
            familyDropdown.trackChanges()
        };
        var onError = function(error) {
            notifyError("Failed to load families");
        };
        getFamilies(onResponse, onError);
    }

    function populateType(currentVal) {
        var typeDropdown = $("#input_item_type");
        typeDropdown.empty();
        var onResponse = function(response) {
            for (var i = 0; i < response.data.types.data.length; i++) {
                const group = response.data.types.data[i];
                typeDropdown.append($("<option>").text(group.name + "   " + ((group.desc != null) ? group.desc : "")).val(group.id));
            }
            typeDropdown.val(currentVal);
            typeDropdown.trackChanges()
        };
        var onError = function(error) {
            console.log(error)
            notifyError("Failed to load types");
        };
        getTypes(onResponse, onError);
    }

    function populateParent(currentVal) {
        var parentDropdown = $("#input_item_parent");
        parentDropdown.empty();
        var onResponse = function(response) {
            for (var i = 0; i < response.data.parents.data.length; i++) {
                const group = response.data.parents.data[i];
                parentDropdown.append($("<option>").text(group.name + "   " + ((group.desc != null) ? group.desc : "")).val(group.id));
            }
            parentDropdown.val(currentVal);
            parentDropdown.trackChanges()
        };
        var onError = function(error) {
            console.log(error)
            notifyError("Failed to load parents");
        };
        getParents(onResponse, onError);
    }

    function loadProducts(beatdata) {
        itemMasterTable = $('#items_master').DataTable({
            dom: 'Blfrtip',
            destroy: true,
            processing: true,
            serverSide: true,
            pageLength: 10,
            lengthMenu: [
                [10, 20, 500, 1000, -1],
                [10, 20, 500, 1000, "All"]
            ],
            columnDefs: [{
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 0
                },
                {
                    'targets': [3, 6, 8, , 9, 10], // column index (start from 0)
                    'orderable': false, // set orderable false for selected columns
                },
                {
                    targets: '_all',
                    defaultContent: '-'
                },
            ],
            select: {
                style: 'multi',
                selector: 'td:first-child'
            },
            order: [
                [1, 'asc']
            ],
            // columnDefs: [{
            //              targets: 0,
            //              data: 6,
            //              'checkboxes': {
            //                  'selectRow': true
            //              }
            //          },
            //         {
            //           targets: '_all',
            //           defaultContent: '-'
            //          },
            //          // { "visible": false, "targets": 1 }
            //          ],
            //          select: {
            //              style: 'multi'
            //          },
            ajax: function(data, callback, settings) {
                const loadingId = notifyInfo("Please wait");
                // console.log(JSON.stringify(data,null,2));


                var onResponse = function(res) {
                    dismiss(loadingId);
                    console.log("recordsTotal " + res.data.items.data.length)
                    // notifySuccess("sucess");
                    callback({
                        draw: data.draw,
                        recordsTotal: res.data.items.total,
                        recordsFiltered: res.data.items.total,
                        data: res.data.items.data
                    });

                };

                var onError = function(error) {
                    console.log(error);
                    dismiss(loadingId);
                };

                var sort_key;
                if (data.order && data.order.length > 0) {
                    columnIndex = data.order[0].column; //alert(columnIndex)
                    if (columnIndex == 1) {
                        sort_key = "sort_by_code";
                    } else
                    if (columnIndex == 2) {
                        sort_key = "sort_by_name";
                    } else
                    if (columnIndex == 7) {
                        sort_key = "sort_by_price";
                    } else
                    if (columnIndex == 4) {
                        sort_key = "sort_by_family_code";
                    } else
                    if (columnIndex == 5) {
                        sort_key = "sort_by_group_name";
                    }
                
                }
                const searchQuery = data.search.value;
                if (searchQuery && searchQuery.length < 3) {
                    notifyError("The search text must be at least 3 characters");
                    return;
                }
                var pageIndex = data.start / data.length + 1;
                console.log("apgedinnnnnnnnnnndex  " + JSON.stringify(data, null, 2))
                getItems(onResponse, onError, pageIndex, data.length, searchQuery, sort_key, safeAccess(["order", 0, "dir"], data, ""));
            },

            buttons: [
                'selectAll',
                'selectNone',
            ],
            columns: [{

                }, {
                    "title": "Item Code",
                    render: function(data, type, row) {
                        return row.code;
                    }
                },
                {
                    "title": "Item Name",
                    render: function(data, type, row) {
                        // console.log("row.salesperson.fullname",row.salesPerson.fullName)
                        return row.name;
                    }
                }, {
                    "title": "Type",
                    render: function(data, type, row) {
                        return safeAccess(['type', 'name'], row, "");
                    }
                },
                {
                    "title": "Family",
                    render: function(data, type, row) {
                        return safeAccess(['item_family', 0, 'code'], row, "");
                    }
                },
                {
                    "title": "Group Description",
                    render: function(data, type, row, meta) {
                        // console.log(JSON.stringify(row,null,2))
                        return safeAccess(['item_group', 'desc'], row, "-");
                    }
                },
                {
                    "title": "Price",
                    render: function(data, type, row) {
                        return safeAccess(['price'], row) == null ? "-" : ("$" + safeAccess(['price'], row));
                    }
                },


                {
                    "title": "Weight",
                    render: function(data, type, row) {
                        // console.log("row.salesperson.fullname",row.salesPerson.fullName)
                        return (row.weight != null ? (row.weight + " " + row.weight_uom) : "-");
                    }
                },
                {
                    "title": "Active",
                    render: function(data, type, row) {
                        // console.log("row.salesperson.fullname",row.salesPerson.fullName)
                        return (row.is_active == 0 ? "Inactive" : "Active");
                    }
                },
                {
                    "title": "Recommended",
                    render: function(data, type, row) {
                        // console.log("row.salesperson.fullname",row.salesPerson.fullName)
                        return (row.is_recommended == 0 ? "Not Recommended" : "Recommended");
                    }
                },
                {
                    "title": "Images",
                    render: function(data, type, row) {
                        return ("<button id=\"btnImages\" type=\"button\" class=\"btn\">Images</button>");
                    }
                },
                {
                    "title": "Edit",
                    render: function(data, type, row) {
                        // console.log("row.salesperson.fullname",row.salesPerson.fullName)
                        return "<button type=\"button\"  id=\"btEditProduct\" class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-edit\"></span></button>"
                        // return "EDIT";
                    }
                }
            ]
        })

        // Handle form submission event 
        $('#frm-example').on('submit', function(e) {
            var form = this;

            var rows_selected = itemMasterTable.column(0).checkboxes.selected();

            // Iterate over all selected checkboxes
            $.each(rows_selected, function(index, rowId) {
                // Create a hidden element 
                $(form).append(
                    $('<input>')
                    .attr('type', 'hidden')
                    .attr('name', 'id[]')
                    .val(rowId)
                );
            });

            // FOR DEMONSTRATION ONLY
            // The code below is not needed in production
            // Output form data to a console     
            $('#example-console-rows').text(rows_selected.join(","));

            // Output form data to a console     
            $('#example-console-form').text($(form).serialize());

            // Remove added elements
            $('input[name="id\[\]"]', form).remove();

            // Prevent actual form submission
            e.preventDefault();
        });



        // $('<div class="pull-right">' +
        //  '<select class="form-control">'+
        //  '<option value="volvo">Bulk Update</option>'+
        //  '<option value="saab">Recommend</option>'+
        //  '<option value="opel">Active</option>'+
        //  '</select>' + 
        //  '</div>').appendTo("#items_master_wrapper .dataTables_filter");

        // $(".dataTables_filter label").addClass("pull-right");



    }


    $('#selectBulkUpdate').on('change', function() {
        // alert( this.value );

        var tblData = itemMasterTable.rows('.selected').data();
        var tmpData;
        var idArray = []
        $.each(tblData, function(i, val) {
            tmpData = tblData[i];
            idArray.push(tmpData.id)
            console.log(" >>>>>>>>> ___", tmpData);
            console.log(" idArray ___", idArray);
        });

        if (!idArray.length > 0) {
            notifyError("No items selected")
            $('#selectBulkUpdate').prop('selectedIndex', 0);
            return false
        }
        var ids = idArray.toString()

        var bulkUpdateAction = this.value

        var bulkUpdateObj = {}

        var onResponse = function(response) {
            notifySuccess("Item updated");
            // window.location.href = 'productMaster.html';
            loadProducts();
            $('#selectBulkUpdate').prop('selectedIndex', 0);
        };
        var onError = function(error) {
            notifyError("Failed to update item")
        };

        if (bulkUpdateAction == "Price") {

            $('#bulkUpdatePrice').modal('toggle');
        } else if (bulkUpdateAction == "Recommended") {
            // bulkUpdateObj["is_recommended"] = "1"
            // bulkUpdateItems(onResponse,onError,ids,is_consumable,is_recommended,is_slow_moving,is_active,price)
            bulkUpdateItems(onResponse, onError, ids, null, is_recommended = "1", null, null, null)
        } else if (bulkUpdateAction == "Not Recommended") {
            // bulkUpdateObj["is_recommended"] = "0"
            bulkUpdateItems(onResponse, onError, ids, null, is_recommended = "0", null, null, null)
        } else if (bulkUpdateAction == "Is Consumable") {
            // bulkUpdateObj["is_consumable"] = "1"
            bulkUpdateItems(onResponse, onError, ids, is_consumable = "1", null, null, null, null)
        } else if (bulkUpdateAction == "Not Consumable") {
            // bulkUpdateObj["is_consumable"] = "0"
            bulkUpdateItems(onResponse, onError, ids, is_consumable = "0", null, null, null, null)
        } else if (bulkUpdateAction == "Slow Moving") {
            // bulkUpdateObj["is_slow_moving"] = "1"
            bulkUpdateItems(onResponse, onError, ids, null, null, is_slow_moving = "1", null, null)
        } else if (bulkUpdateAction == "Fast Moving") {
            // bulkUpdateObj["is_slow_moving"] = "0"
            bulkUpdateItems(onResponse, onError, ids, null, null, is_slow_moving = "0", null, null)
        } else if (bulkUpdateAction == "Active") {
            // bulkUpdateObj["is_active"] = "1"
            bulkUpdateItems(onResponse, onError, ids, null, null, null, is_active = "1", null)
        } else if (bulkUpdateAction == "Inactive") {
            // bulkUpdateObj["is_active"] = "0"
            bulkUpdateItems(onResponse, onError, ids, null, null, null, is_active = "0", null)
        }



        $("#submitBulkPrice").click(function() {

            var price = $("#bulk_update_price").val();

            if (price > 0) {
                bulkUpdateItems(onResponse, onError, ids, null, null, null, null, price = price)
                $('#bulkUpdatePrice').modal('toggle');
            } else {
                notifyError("Enter valid price")
            }
        })


    });




    //  $("#submit").click(function(){
    //   var tblData = itemMasterTable.rows('.selected').data();
    //   var tmpData;
    //   $.each(tblData, function(i, val) {
    //     tmpData = tblData[i];
    //     console.log(" >>>>>>>>> ___",tmpData);
    //   }); 
    // }); 



    function getSelected() {
        var selectedIds = $('#items_master').DataTable().columns().checkboxes.selected()[0];
        console.log(selectedIds)

        selectedIds.forEach(function(selectedId) {
            // alert(selectedId);
        });
    }



    function showItemEditModal(data) {

        $('#editItemModal').modal('show');
    }

    async function submitEditItemModal(data) {


        var item_group_id = $("#input_item_group").getChanged()
        var item_type_id = $("#input_item_type").getChanged()
        var item_family_id = $("#input_item_family").getChanged()
        var code = $("#input_code").getChanged()
        var name = $("#input_name").getChanged()
        var short_code = $("#input_short_code").getChanged()
        var desc = $("#input_desc").getChanged()
        var super_session_item_id = $("#input_super_session_item_id").getChanged()
        var manage_serial_number = $("#input_manage_serial_no").getChanged()
        var weight = $("#input_weight").getChanged()
        var is_consumable = $("#input_is_consumable").getChanged()
        var is_recommended = $("#input_is_recommended").getChanged()
        var is_slow_moving = $("#input_is_slow_moving").getChanged()
        var is_active = $("#input_is_active").getChanged()
        var price = $("#input_price").getChanged()

        var onResponse = function(response) {
            data = ''
            notifySuccess("Item updated");
            // window.location.href = 'productMaster.html';
            // $('#editItemModal').modal('hide');
            location.reload();
            // loadProducts();
        };
        var onError = function(error) {
            notifyError("Failed to update item")
        };
        updateItem(
            data.id,
            code,
            name,
            short_code,
            desc,
            // parent_item_id,
            super_session_item_id,
            manage_serial_number,
            item_group_id,
            item_type_id,
            item_family_id,
            // length,
            // "cm",
            // width,
            // "cm",
            // height,
            // "cm",
            weight,
            "grams",
            // volume,
            // "ml",
            is_consumable,
            is_recommended,
            is_slow_moving,
            is_active,
            price,
            onResponse,
            onError
        );

    }

    $(document).ready(function() {



        $.fn.extend({
            trackChanges: function() {
                //this.off('change');
                this.removeData("changed");
                this.change(function() {
                    // alert($(this).val())
                    $(this).data("changed", $(this).val());
                });
            },
            getChanged: function() {
                return this.data("changed");
            }
        });
        loadProducts();
        // $('#items_master tbody').on( 'click', 'button', function () {
        //   var data = $('#items_master').dataTable().row( $(this).parents('tr') ).data();
        //   alert( data[0] +"'s salary is: "+ data[ 5 ] );
        // });

        // $('#items_master').dataTable().on('click', 'button.edit-task', function () {
        //     var closestRow = $(this).closest('tr');
        //     var data = $table.row(closestRow).data();
        //     var taskID = data[0];
        // });



        $('#items_master ').on('click', '#btnImages', function() {
            var RowIndex = $(this).closest('tr');
            var data = $('#items_master').dataTable().api().row(RowIndex).data();
            var images = data.item_images;

            // images = [
            //       {
            //           "id": 448,
            //           "item_id": 361,
            //           "parent_id": null,
            //           "image_id": 50,
            //           "is_active": 1,
            //           "image": {
            //               "id": 50,
            //               "name": "IMG_20191005_140040.jpg",
            //               "type": "image/jpeg",
            //               "is_active": 1,
            //               "main": "https://b2becommbucket.s3-ap-southeast-2.amazonaws.com/image/IMG_20191005_140040.jpg",
            //               "thumbnail": "https://b2becommbucket.s3-ap-southeast-2.amazonaws.com/image/thumb_IMG_20191005_140040.jpg"
            //           }
            //       }
            //   ]

            var manageImagesTable = $('#manageImagesTable').DataTable({
                dom: 'Blfrtip',
                processing: true,
                bDestroy: true,
                pageLength: 10,
                searching: false,
                paging: false,
                data: images,
                bSort: false,
                columnDefs: [{
                        orderable: false,
                        className: 'select-checkbox',
                        targets: 0
                    },
                    {
                        targets: '_all',
                        defaultContent: '-'
                    },
                ],
                order: [
                    [1, 'asc']
                ],

                buttons: [],
                columns: [{

                    },
                    {
                        "title": "Name",
                        render: function(data, type, row, meta) {
                            return safeAccess(['image', 'name'], row, "");
                        }
                    },
                    {
                        "title": "Color",
                        render: function(data, type, row, meta) {
                            return safeAccess(['color'], row, 0);
                        }
                    },
                    {
                        "title": "Active",
                        render: function(data, type, row, meta) {
                            return safeAccess(['image', 'is_active'], row, 0) == 0 ? "No" : "Yes";
                        }
                    },
                    {
                        "title": "Main",
                        render: function(data, type, row) {
                            return row.image.image ? "<button type=\"button\" id=\"btViewMainImage\" class=\"btn btn-default btn-sm\">View</span></button>" : "-";
                        }
                    },
                    {
                        "title": "Thumb",
                        render: function(data, type, row) {
                            return row.image.thumbnail ? "<button type=\"button\" id=\"btViewThumbImage\" class=\"btn btn-default btn-sm\">View</span></button>" : "-";
                        }
                    },
                    {
                        "title": "Delete",
                        render: function(data, type, row) {
                            return "<button type=\"button\" id=\"btDeleteImage\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-trash\"></span></button>"
                        }
                    }
                ]
            })


            $("#saveImageChanges").unbind('click');
            $("#saveImageChanges").click(function() {

                notifyInfo("Please wait");
                var formData = new FormData();

                var i = 0;
                for (image of images) {
                    if (image.file) {
                        formData.append('images[' + i + '][color]', image.color);
                        formData.append('images[' + i + '][image]', image.file);
                    }
                    i++;
                }

                updateItemImages(data.id, formData, function() {
                    notifySuccess("Item updated")
                    $('#items_master').DataTable().draw(false);
                })

                $("#manageImagesModal").modal().hide();
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();


            })


            $("#addImage").unbind('click');
            $("#addImage").click(function() {
                var name = $("#newImageColor").val();
                var file = $("#newImageFile").prop('files')[0];
                if (name.length > 0 && file) {
                    images.push({
                        image: {
                            name: file.name,
                            is_active: 1
                        },
                        color: name,
                        file: file
                    });
                    $('#manageImagesTable').dataTable().fnClearTable();
                    $('#manageImagesTable').dataTable().fnAddData(images);
                    refreshImagesTable(images);
                } else {
                    notifyError("Invalid data");
                }

            });

            $("#manageImagesTable").unbind('click');
            $('#manageImagesTable').on('click', '#btViewMainImage', function() {
                var RowIndex = $(this).closest('tr');
                var data = $('#manageImagesTable').dataTable().api().row(RowIndex).data();
                window.location.href = data.image.image;

            })

            $('#manageImagesTable').on('click', '#btDeleteImage', function() {
                var RowIndex = $(this).closest('tr');
                var row = $('#manageImagesTable').dataTable().api().row(RowIndex).data();
                if (confirm("Delete this image?")) {
                    deleteItemImage(data.id, row.image.id, function() {
                        notifySuccess("Image Deleted")
                        // alert("Image Deleted")
                        // location.reload();
                        // $('#items_master').DataTable().draw($('#items_master').DataTable().page.info().page);
                        $('#items_master').DataTable().draw(false);
                        $("#manageImagesModal").modal().hide();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    })
                }

            })
            $('#manageImagesTable').on('click', '#btViewThumbImage', function() {
                var RowIndex = $(this).closest('tr');
                var data = $('#manageImagesTable').dataTable().api().row(RowIndex).data();
                window.location.href = data.image.thumbnail;
            })

            $("#manageImagesModal").modal().show();

        })

        function refreshImagesTable(images) {

        }

        $('#items_master').on('click', '#btEditProduct', function() {

            var RowIndex = $(this).closest('tr');
            var data = $('#items_master').dataTable().api().row(RowIndex).data();

            console.log("data :", data)
            populateGroup(data.item_group.id);
            populateFamily(data.item_family[0].id);
            populateType(data.type.id);
            // populateParent(data.parent.id);

            $("#input_code").val(data.code);
            $("#input_name").val(data.name);
            $("#input_short_code").val(data.short_code);
            $("#input_desc").val(data.desc);
            $("#input_super_session_item_id").val(data.super_session_item_id);
            $("#input_manage_serial_no").val(data.manage_serial_number);
            $("#input_length").val(data.length);
            $("#input_width").val(data.width);
            $("#input_height").val(data.height);
            $("#input_weight").val(data.weight);
            $("#input_volume").val(data.volume);
            $("#input_is_consumable").val(data.is_consumable);
            $("#input_is_recommended").val(data.is_recommended);
            $("#input_is_slow_moving").val(data.is_slow_moving);
            $("#input_is_active").val(data.is_active);
            $("#input_price").val(data.price);



            $("#input_code").trackChanges()
            $("#input_name").trackChanges()
            $("#input_short_code").trackChanges()
            $("#input_desc").trackChanges()
            $("#input_super_session_item_id").trackChanges()
            $("#input_manage_serial_no").trackChanges()
            $("#input_length").trackChanges()
            $("#input_width").trackChanges()
            $("#input_height").trackChanges()
            $("#input_weight").trackChanges()
            $("#input_volume").trackChanges()
            $("#input_is_consumable").trackChanges()
            $("#input_is_recommended").trackChanges()
            $("#input_is_slow_moving").trackChanges()
            $("#input_is_active").trackChanges()
            $("#input_price").trackChanges()


            $('#cancelEditItemModal').click(function() {
                $('#editItemModal').modal('hide');
            });


            $('#submitEditItemModal').click(function() {
                submitEditItemModal(data);
            });


            showItemEditModal(data);

            console.log(JSON.stringify(data, null, 2));
        });


        $('#uploadFile').click(function() {
            $("#uploadFile").prop('disabled', true);
            var xlsx = document.querySelector('#excelfile');
            var onResponse = function(response) {
                $('#bulkUploadModal').modal('hide');
                if (response.data.is_valid) {
                    notifySuccess("File uploaded!");
                } else {
                    notifyError(response.data.message);
                }
            };
            var onError = function(error) {
                notifyError("Failed to upload file");
            };
            bulkUploadItems(onResponse, onError, xlsx.files[0]);
        });
    });