var favouriteItemList = []
async function getFavItemList() {
    var onError = function(error) {
        notifyError("Failed to Added Favourite Item");
    };
    var onResponse = function(response) {
        if (response.data.status == true) {
            Array.prototype.push.apply(favouriteItemList, response.data.favorite.data)
        } else {
            notifyError(response.data.message);
        }
    };
    listFavourite(onResponse, onError);
    return favouriteItemList
}
function itemIdExists(id, arr) {
    return arr.some(function(el) {
        return el.item_id === id;
    });
}