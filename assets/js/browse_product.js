var searchQuery;
var resultController;
var basicResultController = (function () {
  var obj = {};
  var url;
  var itemsPerPage = 20;
  var currentPage = 1;
  var filterParentId;
  obj.loadResults = function (filterGroupId, filterFamilyId) {
    var loadingNotification = notifyInfo("Loading results");
    var onResponse = function (response) {
      dismiss(loadingNotification);
      var results = [];
      for (var i = 0; i < response.data.items.data.length; i++) {
        const item = response.data.items.data[i];
        const element = {
          productId: item.id,
          href: "product-details.html?item=" + item["id"],
          productCode: item.code,
          productName: item.name,
          productFamily: item.item_family[0].code,
          productActualPrice: "$" + safeAccess(["price"], item, "-"),
          productOfferPrice: "$999.00",
          productOffPercent: "-20%",
          productQuantityInStock: "50",
          productDescription: item.desc,
          parentImages: safeAccess(
            ["item_images", 0, "image", "thumbnail"],
            item,
            safeAccess(
              ["item_parent_images", 0, "image", "thumbnail"],
              item,
              "assets/img/Rectangle.png"
            )
          ),
        };
        results.push(element);
      }
      if (currentPage == 1) {
        history.replaceState(null, null, " ");

        $("#pagination-container").pagination({
          items: response.data.items.total,
          itemsOnPage: itemsPerPage,
          cssStyle: "dark-theme",
          onPageClick: function (pageNo) {
            currentPage = pageNo;
            obj.loadResults();
          },
        });
      }
      var onResp = function (resp) {
        var cart = safeAccess(["data", "carts", "data"], resp);
        obj.showResult(results, cart);
      };
      cartList(onResp);
      window.scroll({ top: 0, left: 0 });
    };

    var onError = function (error) {
      dismiss(loadingNotification);
      console.log(error);
    };
    getSearchResults(
      currentPage,
      itemsPerPage,
      searchQuery,
      filterParentId,
      filterGroupId,
      filterFamilyId,
      onResponse,
      onError
    );
  };

  obj.showResult = function (catalogList, cart) {
    var getFavouriteItemList = favouriteItemList;
    var catalogHTML = "";

    for (i = 0; i < catalogList.length; i++) {
      catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">';
      catalogHTML += '<div class="single_product">';
      catalogHTML += '<div class="product_name grid_name">';
      catalogHTML +=
        '<h3><strong><a href="' +
        catalogList[i]["href"] +
        '" style="text-transform: lowercase;">' +
        catalogList[i]["productName"] +
        "</a></strong></h3>";
      catalogHTML +=
        '<p style="opacity:1;">' + catalogList[i]["productCode"] + "</p>";

      catalogHTML += "</div>";
      catalogHTML += '<div class="product_thumb">';

      if (catalogList[i]["parentImages"]) {
        catalogHTML +=
          '<a class="primary_img" href="product-details.html?item=' +
          catalogList[i]["productId"] +
          '"><img   onerror="this.onerror=null;this.src=`assets/img/Rectangle.png`;" src="' +
          catalogList[i]["parentImages"] +
          '" alt=""></a>';
      } else {
        catalogHTML +=
          '<a class="primary_img" href="product-details.html?item=' +
          catalogList[i]["productId"] +
          '"><img  src="assets/img/Rectangle.png" alt=""></a>';
      }
      catalogHTML += '<div class="action_links">';

      catalogHTML += "</div>";
      catalogHTML += "</div>";
      if (cart.length > 0) {
        var cartItem = cart.filter(function (cartItem) {
          return cartItem.item_id == catalogList[i]["productId"];
        });
        if (cartItem.length > 0) {
          catalogHTML +=
            '<div class="quantity"><label>quantity </label><input id="inputQuantity_' +
            catalogList[i]["productId"] +
            '" style="height:30px; width:100%" onchange="changeQuantity(' +
            catalogList[i]["productId"] +
            ',this.value)" min="1" max="100" value="' +
            cartItem[0].qty +
            '" type="number"><button class="button" id="btnAddToCart_' +
            catalogList[i]["productId"] +
            '" onclick="funcAddToCart(' +
            catalogList[i]["productId"] +
            ')" type="button" style="width:100%">added to cart</button></div>';
        } else {
          catalogHTML +=
            '<div class="quantity"><label>quantity </label><input id="inputQuantity_' +
            catalogList[i]["productId"] +
            '" style="height:30px; width:100%" onchange="changeQuantity(' +
            catalogList[i]["productId"] +
            ',this.value)" min="1" max="100" value="1" type="number"><button class="button" id="btnAddToCart_' +
            catalogList[i]["productId"] +
            '" onclick="funcAddToCart(' +
            catalogList[i]["productId"] +
            ')" type="button" style="width:100%">add to cart</button></div>';
        }
      }
      catalogHTML += '<div class="product_content grid_content">';
      catalogHTML += '<div class="content_inner">';
      catalogHTML += '<div class="product_footer d-flex align-items-center">';
      catalogHTML += '<div class="price_box">';
      catalogHTML +=
        '<span class="current_price">' +
        catalogList[i]["productActualPrice"] +
        "</span>";
      var id = catalogList[i]["productId"];
      if (itemIdExists(Number(id), getFavouriteItemList)) {
        catalogHTML +=
          '<span  onclick=removeFunction("' +
          id +
          '")  value="' +
          id +
          '" id=' +
          id +
          '  ><img src="assets/img/Favorite/remove_favorite.PNG" style="width:50px;height:50px;margin-left:80px"></span>';
      } else {
        catalogHTML +=
          '<span   onclick=addFunction("' +
          id +
          '") value="' +
          id +
          '"  id=' +
          id +
          '  ><img src="assets/img/Favorite/add_favorite.PNG" title="Add to Favorite" style="width:50px;height:50px;margin-left:80px"></span>';
      }
      catalogHTML += "</div>";
      catalogHTML += "</div>";
      catalogHTML += "</div>";
      catalogHTML += "</div>";
      catalogHTML += "";
      catalogHTML += '<div class="product_content list_content">';
      catalogHTML += '<div class="left_caption" style="width:300px">';
      catalogHTML += '<div class="product_name">';
      catalogHTML +=
        '<h3><a href="product-details.html">' +
        catalogList[i]["productName"] +
        "</a></h3>";
      catalogHTML +=
        '<h3><a href="product-details.html">' +
        catalogList[i]["productCode"] +
        "</a></h3>";
      catalogHTML += "</div>";
      catalogHTML += "";
      catalogHTML += '<div class="product_desc">';
      if (catalogList[i]["productDescription"] == null) {
        catalogHTML += "<p></p>";
      } else {
        catalogHTML += "<p>" + catalogList[i]["productDescription"] + "</p>";
      }
      catalogHTML += "</div>";
      catalogHTML += "</div>";
      catalogHTML += '<div class="right_caption">';
      catalogHTML += '<div class="price_box">';
      catalogHTML +=
        '<span class="current_price">' +
        catalogList[i]["productActualPrice"] +
        "</span>";
      catalogHTML += "</div>";
      catalogHTML += '<div class="cart_links_btn">';
      catalogHTML += "</div>";
      catalogHTML += '<div class="action_links_btn">';
      catalogHTML += "<ul>";
      catalogHTML += "</ul>";
      catalogHTML += "</div>";
      catalogHTML += "</div>";
      catalogHTML += "</div>";
      catalogHTML += "</div>";
      catalogHTML += "</div>";
    }
    $("#resultsGrid").html("");
    $("#resultsGrid").html(catalogHTML);
  };
  return obj;
})();

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

function changeQuantity(itemId, quantity) {
  $("#btnAddToCart_" + itemId).html("Update");
}
$(document).ready(function () {
  getFavItemList();
  searchQuery = findGetParameter("q");
  resultController = basicResultController;
  resultController.loadResults();
});

function funcAddToCart(itemId) {
  const newQty = $("#inputQuantity_" + itemId).val();
  if (newQty > 0) {
    $("#btnAddToCart_" + itemId).html("Added to Cart");
    shoppingCart.modify(itemId, newQty, function () {
      reloadMiniCart();
    });
  } else {
    notifyError("Amount not valid!");
  }
}
function removeFunction(id) {
  var onError = function (error) {
    notifyError("Failed to Added Removed Item");
  };
  var onResponse = function (response) {
    if (response.data.status == true) {
      notifySuccess("Favourite Item Removed Successfully");
      window.location.reload();
    } else {
      notifyError(response.data.message);
    }
  };
  removeFavourite(id, onResponse, onError);
}

function addFunction(id) {
  var onError = function (error) {
    notifyError("Failed to Added Favourite Item");
  };
  var onResponse = function (response) {
    if (response.data.status == true) {
      notifySuccess("Favourite Item Added Successfully");
      window.location.reload();
    } else {
      notifyError(response.data.message);
    }
  };
  addFavourite(id, onResponse, onError);
}
