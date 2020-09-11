// const BASE_URL = "http://54.252.24.196/v1/api/";
// const BASE_URL = "http://3.106.30.129/v1/api/";
const BASE_URL = "http://54.252.24.196/v1/api/";

async function updateItem(
  item_id,
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
    url:BASE_URL+'item/'+item_id,
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



function getItemDetail(onResponse,onError,item_id){
  var data = new FormData();

var config = {
  method: 'get',
  url: BASE_URL + "item/"+item_id,
  headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
  data : data
};

  axios(config)
  .then(onResponse)
  .catch(onError);  

}

async function getItems(onResponse,onError,page,page_size){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'item?page='+page+'&page_size='+page_size,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(onResponse)
  .catch(onError);  

}

async function bulkUploadItems(onResponse,onError,file){

  var data = new FormData();
  data.append("file",file);


  var config = {
    method: 'post',
    url: BASE_URL+'upload/inventory',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(onResponse)
  .catch(onError);  

}


async function getGroupsWithPaging(onResponse,onError,page,page_size){
  var config = {
    method: 'get',
    url: BASE_URL+'group?page='+page+'&page_size='+page_size,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}

async function getFamilyDescWithPaging(onResponse,onError,page,page_size){
  var config = {
    method: 'get',
    url: BASE_URL+'family-desc?page='+page+'&page_size='+page_size,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}


async function getParentsWithPaging(onResponse,onError,page,page_size){
  var config = {
    method: 'get',
    url: BASE_URL+'parent?page='+page+'&page_size='+page_size,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  

}

async function getTypesWithPaging(onResponse,onError,page,page_size){
  var config = {
    method: 'get',
    url: BASE_URL+'type?page='+page+'&page_size='+page_size,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  

}
async function getFamiliesWithPaging(onResponse,onError,page,page_size){
  var config = {
    method: 'get',
    url: BASE_URL+'family?page='+page+'&page_size='+page_size,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  

}

async function deleteGroup(onResponse,onError,groupid){

  var config = {
    method: 'delete',
    url: BASE_URL+'group/'+groupid,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}
async function deleteFamily(onResponse,onError,familyid){

  var config = {
    method: 'delete',
    url: BASE_URL+'family/'+familyid,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}
async function deleteFamilyDesc(onResponse,onError,familyDescId){

  var config = {
    method: 'delete',
    url: BASE_URL+'family-desc/'+familyDescId,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}

async function deleteType(onResponse,onError,typeid){

  var config = {
    method: 'delete',
    url: BASE_URL+'type/'+typeid,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}
async function deleteParent(onResponse,onError,parentid){

  var config = {
    method: 'delete',
    url: BASE_URL+'parent/'+parentid,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}

async function getGroups(onResponse,onError){

  var config = {
    method: 'get',
    url: BASE_URL+'group',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}

async function updateGroup(onResponse,onError,groupid,newGroupName,newGroupDesc){

  var data = new FormData();
  if(newGroupName!=null){
    data.append('name', newGroupName);
  }
  if(newGroupDesc!=null){
    data.append('desc', newGroupDesc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'group/'+groupid,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}


async function addGroup(onResponse,onError,newGroupName,newGroupDesc){

  var data = new FormData();
  if(newGroupName!=null){
    data.append('name', newGroupName);
  }
  if(newGroupDesc!=null){
    data.append('desc', newGroupDesc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'group',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}

async function addType(onResponse,onError,name,desc){

  var data = new FormData();
  if(name!=null){
    data.append('name', name);
  }
  if(desc!=null){
    data.append('desc', desc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'type',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}
async function addParent(onResponse,onError,name,desc){

  var data = new FormData();
  if(name!=null){
    data.append('name', name);
  }
  if(desc!=null){
    data.append('desc', desc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'parent',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}
async function addFamily(onResponse,onError,code,desc){

  var data = new FormData();
  if(code!=null){
    data.append('code', code);
  }
  if(desc!=null){
    data.append('desc', desc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'family',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}

async function addFamilyDesc(onResponse,onError,code,desc){

  var data = new FormData();
  if(code!=null){
    data.append('code', code);
  }
  if(desc!=null){
    data.append('desc', desc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'family-desc',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}

async function getFamilies(onResponse,onError){

  var config = {
    method: 'get',
    url: BASE_URL+'family',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };
  
  axios(config)
  .then(onResponse)
  .catch(onError);  
}


async function updateFamily(onResponse,onError,id,name,desc){

  var data = new FormData();
  if(name!=null){
    data.append('code', name);
  }
  if(desc!=null){
    data.append('desc', desc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'family/'+id,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}


async function updateFamilyDesc(onResponse,onError,id,name,desc){

  var data = new FormData();
  if(name!=null){
    data.append('code', name);
  }
  if(desc!=null){
    data.append('desc', desc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'family-desc/'+id,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}


async function getTypes(onResponse,onError){

  var config = {
    method: 'get',
    url: BASE_URL+'type',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };
  
  axios(config)
  .then(onResponse)
  .catch(onError);  
}


async function updateType(onResponse,onError,id,name,desc){

  var data = new FormData();
  if(name!=null){
    data.append('name', name);
  }
  if(desc!=null){
    data.append('desc', desc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'type/'+id,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(onResponse)
  .catch(onError);  
}


async function getParents(onResponse,onError){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'parent',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    }
  };
  
  axios(config)
  .then(onResponse)
  .catch(onError);  
}


async function updateParent(onResponse,onError,id,name,desc){

  var data = new FormData();
  if(name!=null){
    data.append('name', name);
  }
  if(desc!=null){
    data.append('desc', desc);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'parent/'+id,
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
    },
    data : data
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

async function getSearchResults(onResponse,onError,url){

  var data = new FormData();
  if(url==null){
    url = BASE_URL+'item?page=1';
  }

  var config = {
    method: 'get',
    url:url,
    headers: {
      'Content-Type': 'multipart/form-data',
    'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
    data : data
  };

  axios(config).then(onResponse).catch(onError);
}


async function getMappingsMain(onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'mapping/main',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
  };
  axios(config).then(onResponse).catch(onError);
}

async function getMappingsMachine(onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'mapping/machine',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
  };
  axios(config).then(onResponse).catch(onError);
}
