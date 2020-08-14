const BASE_URL = "http://3.106.131.179/api/";

async function createItem(
    code,
    name,
    short_code,
    desc,
    parent_item_id,
    super_session_item_id,
    manage_serial_number,
    item_group_id,
    item_type_id,
    item_family_id,
    length,
    length_uom,
    width,
    width_uom,
    height,
    height_uom,
    weight,
    weight_uom,
    volume,
    volume_uom,
    is_consumable,
    is_recommended,
    is_slow_moving,
    is_active,
    onResponse,
    onError){

    var data = new FormData();

    data.append('item_parent_id',parent_item_id);
    data.append('item_group_id',item_group_id);
    data.append('item_family_id',item_family_id);
    data.append('item_type_id',item_type_id);

    data.append('code',code);
    data.append('name',name);
    data.append('short_code',short_code);
    data.append('desc',desc);
    data.append('super_session_item_id',super_session_item_id);
    data.append('manage_serial_number',manage_serial_number);

    data.append('length',length);
    data.append('length_uom',length_uom);
    data.append('width',width);
    data.append('width_uom',width_uom);
    data.append('height',height);
    data.append('height_uom',height_uom);
    data.append('weight',weight);
    data.append('weight_uom',weight_uom);
    data.append('volume',volume);
    data.append('volume_uom',volume_uom);
    data.append('is_consumable',is_consumable);
    data.append('is_recommended',is_recommended);
    data.append('is_slow_moving',is_slow_moving);
    data.append('is_active',is_active);

    var config = {
      method: 'post',
      url:BASE_URL+'item',
      headers: { 
        'Authorization': getAPIToken(), 
        'Accept': 'application/json', 
        'Content-Type': 'multipart/form-data' 
      },
      data : data
    };

    axios(config)
    .then(onResponse)
    .catch(onError);

}

async function getGroups(onResponse,onError){

    var config = {
      method: 'get',
      url: BASE_URL+'item/groups',
      headers: { 
        'Authorization': getAPIToken(), 
        'Accept': 'application/json'
      }
    };

    axios(config)
    .then(onResponse)
    .catch(onError);  
}

async function getFamilies(onResponse,onError){

    var config = {
      method: 'get',
      url: BASE_URL+'item/families',
      headers: { 
        'Authorization': getAPIToken(), 
        'Accept': 'application/json'
      }
    };
    
    axios(config)
    .then(onResponse)
    .catch(onError);  
}

async function getTypes(onResponse,onError){

    var config = {
      method: 'get',
      url: BASE_URL+'item/types',
      headers: { 
        'Authorization': getAPIToken(), 
        'Accept': 'application/json'
      }
    };
    
    axios(config)
    .then(onResponse)
    .catch(onError);  
}


async function forgotPassword(email,onResponse,onError){
  var data = new FormData();
  data.append('email', email);

  var config = {
    method: 'post',
    url: BASE_URL+'user/forgot-password',
    headers: {'Content-Type': 'multipart/form-data' },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);

}


async function login(email,pass,onResponse,onError){

  var data = new FormData();
  data.append('password', pass);
  data.append('email', email);

  var config = {
    method: 'post',
    url: BASE_URL+'auth/login',
    headers: {'Content-Type': 'multipart/form-data' },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);

}