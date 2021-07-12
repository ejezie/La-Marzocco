var machineLists = [{
        "family": "LINEA",
        "machines": [
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
        "family": "Modbar",
        "machines": [
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
        "family": "GS3",
        "machines": [
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
        "family": "Vulcano",
        "machines": [
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

var groupList = ["Commercial Machines", "Panels and external parts", "Group1", "Group2"]

var familyList = ["LINEA", "MODBAR", "ESPRESSO MACHINES"]

async function showMachinesSideFilter(machineList) {

    var sidebarHTML = ""
    for (i = machineList.length - 1; i >= 0; i--) {

        sidebarHTML += '<li class="dropdown dropdown-large">'
        sidebarHTML += '<a class="dropdown-toggle dropdown1" data-toggle="dropdown" style="white-space: nowrap;font-size:14px; font-weight:500;color:#333">' + machineList[i]["code"] + ' </a>'
        sidebarHTML += '<ul id="machine-menu" class="dropdown-menu dropdown-menu-large row" style="width: 500px">'
        sidebarHTML += '<li class="col-sm-3">'
        sidebarHTML += '<ul>'
        for (k = 0; k < machineList[i]["machines"].length; k++) {
            sidebarHTML += '<li><form><p><input class="example" type="checkbox" value="' + machineList[i]["machines"][k]["id"] + '" id="' + machineList[i]["machines"][k]["id"] + '"  /><label for="' + machineList[i]["machines"][k]["id"] + '" style="white-space: nowrap;font-size:14px; font-weight:500 ; ">' + machineList[i]["machines"][k]["name"] + '</label></p></form></li>'
        }
        sidebarHTML += '</ul>'
        sidebarHTML += '</li>'
        sidebarHTML += '</ul>'
        sidebarHTML += '</li>'
    }
    $("#sidebarMachineFilter").append(sidebarHTML);
    $('#sidebarMachineFilter input[type="checkbox"]').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false);
        $('#sidebarGroupFilter input[type="checkbox"]').not(this).prop('checked', false);
        $('#sidebarCatalogFilter input[type="checkbox"]').not(this).prop('checked', false);
        resultController = machineResultController;
        machineResultController.currentPage = 1;
        resultController.loadResults(getCheckedMachine());
        var label = $(this).prop("labels"),
            text = $(label).text()
        $("#shopTitle").empty()
        var shopTitleHTML = ''
        shopTitleHTML += '<h1>Product Details : Machine - ' + text + '</h1>'
        $("#shopTitle").append(shopTitleHTML)
    });

}

$("#more-btn-machines").on("click", function() {
    $('.catalog-collapse').removeClass("show");
    $('.group-collapse').removeClass("show");
});

$("#more-btn-catalogs").on("click", function() {
    $('.machine-collapse').removeClass("show");
    $('.group-collapse').removeClass("show");
});

$("#more-btn-groups").on("click", function() {
    $('.catalog-collapse').removeClass("show");
    $('.machine-collapse').removeClass("show");
});
$('input.example').on('change', function() {
    $('input.example').not(this).prop('checked', false);
});

async function refreshCatalog() {
    resultController = basicResultController;
    basicResultController.currentPage = 1;

    basicResultController.filterParentId = null;
    var group_id = await getCheckedGroup();
    var groupFamily = await getCheckedGroupFamily();
    resultController.loadResults(group_id, groupFamily);
}

function getCheckedMachine() {
    var returnValue = null;
    $('#sidebarMachineFilter input:checked').each(function() {
        $('.dropdown-menu').removeClass("show");
        console.log(">>>>>>>>>>>>>>>> :this.value  ", this.value)

        returnValue = this.value;
    });
    return returnValue;
}

function getCheckedMachines() {
    var machines = [];
    $('#sidebarMachineFilter input:checked').each(function() {
        machines.push(this.value);
    });
    console.log(machines);
    return machines;
}



async function getCheckedGroup() {
    var returnValue = null;
    $('#sidebarGroupFilter input:checked').each(function() {
        $('.dropdown-menu').removeClass("show");
        returnValue = this.value;
    });
    return returnValue;
}

async function getCheckedGroupFamily() {
    var returnValue = null;
    $('#sidebarGroupFilter input:checked').each(function() {
        returnValue = ($(this).data("family"))
    });
    return returnValue;
}

function getCheckedGroups() {
    var groups = [];
    $('#sidebarGroupFilter input:checked').each(function() {
        groups.push(this.value);
    });
    console.log(groups);
    return groups;
}



function getCheckedParent() {
    var returnValue = null;

    $('#sidebarCatalogFilter input:checked').each(function() {
        $('.dropdown-menu').removeClass("show");

        returnValue = this.value;
    });
    return returnValue;
}


async function showGroupSideFilter(groupList) {
    var sidebarHTML = ""


    console.log("groupList >>>>>>>>>>------------- ", groupList)

    for (i = groupList.length - 1; i >= 0; i--) {

        const item = groupList[i];

        sidebarHTML += '<li class="dropdown dropdown-large">'
        sidebarHTML += '<a class="dropdown-toggle" data-toggle="dropdown" style="font-size:14px; font-weight:500 ;color:#333">' + item["code"] + ' </a>'
        sidebarHTML += '<ul id="group-menu" class="dropdown-menu dropdown-menu-large row" style="width: 500px">'

        sidebarHTML += '<li class="col-sm-3">'
        sidebarHTML += '<ul>'
        const inneritem = groupList[i]["machines"][0];

        for (k = 0; k < inneritem["groups"].length; k++) {

            const innerMostitem = inneritem["groups"][k];
            sidebarHTML += '<li><form><p><input class="example" type="checkbox" data-family="' + groupList[i].id + '" value="' + innerMostitem["id"] + '" id="' + innerMostitem["desc"] + '" /><label for="' + innerMostitem["desc"] + '" style="white-space: nowrap;font-size:14px; font-weight:500;">' + innerMostitem["desc"] + '</label></p></form></li>'
        }
        sidebarHTML += '</ul>'
        sidebarHTML += '</li>'

        sidebarHTML += '</ul>'
        sidebarHTML += '</li>'

    }


    $("#sidebarGroupFilter").append(sidebarHTML);
    $('#sidebarGroupFilter input[type="checkbox"]').on('change', function() {
        $('#sidebarGroupFilter input[type="checkbox"]').not(this).prop('checked', false);
        $('#sidebarMachineFilter input[type="checkbox"]').not(this).prop('checked', false);
        $('#sidebarCatalogFilter input[type="checkbox"]').not(this).prop('checked', false);
        refreshCatalog();
        var selectedOption = this.id
        $("#shopTitle").empty()
        var shopTitleHTML = ''
        shopTitleHTML += '<h1>Product Details : Group - ' + selectedOption + '</h1>'
        $("#shopTitle").append(shopTitleHTML)

    });

}


// async function showParentSideFilter(familyList) {
//     var sidebarHTML = ""
//     for (i = familyList.length - 1; i >= 0; i--) {

//         const item = familyList[i];

//         sidebarHTML += '<li class="dropdown dropdown-large">'
//         sidebarHTML += '<a class="dropdown-toggle" data-toggle="dropdown" style="font-size:14px; font-weight:500;color:#333">' + item["code"] + ' </a>'
//         sidebarHTML += '<ul id="catalog-menu" class="dropdown-menu dropdown-menu-large row" style="width: 500px">'

//         sidebarHTML += '<li class="col-sm-3">'
//         sidebarHTML += '<ul>'
//         for (j = 0; j < item["machines"].length; j++) {

//             const inneritem = familyList[i]["machines"][j];
//             sidebarHTML += '<li><form><p><input type="checkbox" value="' + inneritem["id"] + '" id="' + inneritem["name"] + '"  /><label for="' + inneritem["name"] + '" style="white-space: nowrap;font-size:14px; font-weight:500;">' + inneritem["name"] + '</label></p></form></li>'
//         }


//         sidebarHTML += '</ul>'
//         sidebarHTML += '</li>'

//         sidebarHTML += '</ul>'
//         sidebarHTML += '</li>'

//     }

//     $("#sidebarCatalogFilter").append(sidebarHTML);
//     $('#sidebarCatalogFilter input[type="checkbox"]').on('change', function() {
//         $('#sidebarGroupFilter input[type="checkbox"]').not(this).prop('checked', false);
//         $('#sidebarMachineFilter input[type="checkbox"]').not(this).prop('checked', false);
//         $('#sidebarCatalogFilter input[type="checkbox"]').not(this).prop('checked', false);
//         resultController = catalogResultController;
//         catalogResultController.currentPage = 1;

//         resultController.loadResults(getCheckedParent());
//         var label = $(this).prop("labels"),
//             text = $(label).text()
//         $("#shopTitle").empty()
//         var shopTitleHTML = ''
//         shopTitleHTML += '<h1>Product Details : Catalogue - ' + text + '</h1>'
//         $("#shopTitle").append(shopTitleHTML)
//     });
// }

$(document).ready(function() {
    var onError = function(error) {};


    getMappingsMachine(function(response) {
        showMachinesSideFilter(response.data.mapping)
    }, onError);

    getMappingParent(function(response) {
        showParentSideFilter(response.data.mapping)
    }, onError);


    getMappingGroup(function(response) {
        showGroupSideFilter(response.data.mapping)
    }, onError);



});
$(".categories_menu_toggle li.hidden_group").hide();
$("#more-btn-group").on('click', function(e) {

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
$("#more-btn-catalog").on('click', function(e) {

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
$("#more-btn-machine").on('click', function(e) {

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
$('.parent').children().click(function() {
    event.preventDefault();
    $(this).children('.child').slideToggle('slow');
    $(this).find('span').toggle();
});