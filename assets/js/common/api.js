// const BASE_URL = "http://54.252.24.196/v1/api/";
// const BASE_URL = "http://3.106.30.129/v1/api/";
const BASE_URL = "http://54.252.24.196/v1/api/";

const safeAccess =  (props, object,defaultValue) => props.reduce((prefix, val) => (prefix && prefix[val]) ? prefix[val] : defaultValue, object);


function errorResponseHandler(error) {
  console.log(error);
  console.log(JSON.stringify(error));
     // check for errorHandle config
     if( error.config.url.includes("logout") || (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) ) {
         return Promise.reject(error);
     }

     // if9 has response show the error
     if (error.response) {
        if(error.response.status==401){
            window.location = '/login.html', true;
             // window.location.pathname   = "/login.html";
        }else if(error.response.data.message){
                if(typeof error.response.data.message === 'string' || error.response.data.message instanceof String){
                    notifyError(error.response.data.message);
                }else if(typeof error.response.data.message === 'object'){
                    var longMessage="";
                    var duration = 1000;
                    for (var key of Object.keys(error.response.data.message)) {
                        longMessage+=(error.response.data.message[key][0]);
                        longMessage+="\n\n";
                        duration += 3000;
                    }

                    new Notyf().error({
                      message: longMessage,
                      duration: duration,
                      icon: false,
                      dismissible: true
                    })
                }
            }else{
             notifyError("Something went wrong...");
            }
        }else{
            notifyError("Please check your connection!");
      }

        return Promise.reject(error);
 }

// apply interceptor on response
axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);

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

function appendIfNotNull(data,key,val){
  if(val || val == false){
      data.append(key,val);
  }
}

async function updateCustomer(
  onResponse,onError,id,
        short_code,
        industry_id,
        first_name,
        middle_name,
        last_name,
        company_name,
        deposit_required
        ){

  var data = new FormData();

  appendIfNotNull(data,'short_code',short_code);
  appendIfNotNull(data,'industry_id',industry_id);
  appendIfNotNull(data,'first_name',first_name);
  appendIfNotNull(data,'middle_name',middle_name);
  appendIfNotNull(data,'last_name',last_name);
  appendIfNotNull(data,'company_name',company_name);
  appendIfNotNull(data,'deposit_required',deposit_required);

  var config = {
    method: 'post',
    url:BASE_URL+'customer-master/'+id,
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


async function createCustomer(
    industry_id,
    short_code,
    first_name,
    middle_name,
    last_name,
    company_name,
    deposit_required,
    onResponse,
    onError){

  var data = new FormData();
  data.append('industry_id',industry_id);
  data.append('short_code',short_code);
  data.append('first_name',first_name);
  data.append('middle_name',middle_name);
  data.append('last_name',last_name);
  data.append('company_name',company_name);
  data.append('deposit_required',deposit_required);

  var config = {
    method: 'post',
    url:BASE_URL+'customer-master',
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
async function createAddress(
    type,
    name,
    zip_code,
    address,
    landmark,
    phone,
    area_code_id,
    city_id,
    state_id,
    country_id,
    onResponse){

  var data = new FormData();

  data.append('is_billable',(type == 1 || type == 3)?1:0);
  data.append('is_shippable',(type == 2 || type == 3)?1:0);

  data.append('name',name);
  data.append('zip_code',zip_code);
  data.append('address',address);
  appendIfNotNull(data,"landmark",landmark);
  data.append('phone',phone);

  data.append('area_code_id',area_code_id);
  data.append('city_id',city_id);
  data.append('state_id',state_id);
  data.append('country_id',country_id);

  var config = {
    method: 'post',
    url:BASE_URL+'address',
    headers: { 
      'Authorization': getAPIToken(), 
      'Accept': 'application/json', 
      'Content-Type': 'multipart/form-data' 
    },
    data : data
  };

  axios(config)
  .then(onResponse)
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
async function getQuotationList(onResponse,onError,page,page_size){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'quotation/list?page='+page+'&page_size='+page_size,
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
async function getOrderList(onResponse,onError,page,page_size){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'order/list?page='+page+'&page_size='+page_size,
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
async function getCustomerList(onResponse,onError,page,page_size){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'customer-master?page='+page+'&page_size='+page_size,
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
async function bulkUploadCustomers(onResponse,onError,file){

  var data = new FormData();
  data.append("file",file);


  var config = {
    method: 'post',
    url: BASE_URL+'upload/customers',
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

async function bulkUploadEmployees(onResponse,onError,file){

  var data = new FormData();
  data.append("file",file);

  var config = {
    method: 'post',
    url: BASE_URL+'upload/employees',
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

async function deleteCustomer(onResponse,onError,id){

  var config = {
    method: 'delete',
    url: BASE_URL+'customer-master/'+id,
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

async function getIndustryList(onResponse,onError){

  var config = {
    method: 'get',
    url: BASE_URL+'industry',
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
    data : data,
    errorHandle: false
  };

  axios(config)
  .then(onResponse)
  .catch(onError);

}


async function getSearchResults(onResponse,onError,url,searchQuery,parent_id,group_id){
  console.log("url  "+url,"  parent_id  "+filterParentId+"  grp "+filterGroupId +" searchQuery: "+searchQuery)
  var data = new FormData();
  appendIfNotNull(data,"name",searchQuery);
  appendIfNotNull(data,"parent_id",filterParentId);
  appendIfNotNull(data,"group_id",filterGroupId);
  data.append("key","val");


  if(url==null){
    url = BASE_URL+'item?page=1' ;
  }

  if(filterGroupId){
    url+='&group_id='+filterGroupId;
  }

  if(filterParentId){
    url+='&parent_id='+filterParentId;
  }
  
  if(searchQuery){
    url+='&name='+searchQuery;
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

async function logout(){
  var config = {
    method: 'post',
    url: BASE_URL+'auth/logout',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json',
       errorHandle: false
     },
  };
  axios(config);
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
async function getMappingGroup(onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'mapping/group',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
  };
  axios(config).then(onResponse).catch(onError);
}

async function getMappingParent(onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'mapping/parent',
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

async function cartAddItem(itemId,qty,userId,desc,onResponse,onError){
  var data = new FormData();
  console.log("id "+itemId +" qty "+qty);
  // data.append('item_id', itemId);
  // data.append('qty', qty);
  // alert(data.)
  console.log("data=" + JSON.stringify(data));
  appendIfNotNull(data,'item_id',itemId);
  appendIfNotNull(data,'qty',qty);
  appendIfNotNull(data,'user_id',userId);
  appendIfNotNull(data,'desc',desc);

  var config = {
    method: 'post',
    url: BASE_URL+'cart',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
     data :data
  };
  axios(config).then(onResponse).catch(onError);
}

async function cartUpdateItem(itemId,qty,userId,desc,onResponse,onError){
  var data = new FormData();
  data.append('item_id', itemId);
  data.append('qty', qty);
  appendIfNotNull(data,'user_id',userId);
  appendIfNotNull(data,'desc',desc);

  var config = {
    method: 'post',
    url: BASE_URL+'cart',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
     data :data
  };
  axios(config).then(onResponse).catch(onError);
}

async function cartDeleteItem(itemId,onResponse,onError){
  
  var config = {
    method: 'delete',
    url: BASE_URL+'cart/'+itemId,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function cartList(onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'cart',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getQuote(user_id,desc,onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'quotation/create',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}
async function getQuoteDetails(quoteId,onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'quotation/get/'+quoteId,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getMachineParentMapping(itemId,onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'machine-parent/'+itemId,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getItemParentImages(parent_id,main_item_id,onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'item-parent-image?parent_id='+parent_id+"&main_item_id="+main_item_id,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}
async function getItemParentImagesForMachineDropdown(main_item_id,onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'item-parent-image?main_item_id='+main_item_id,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getMachineParentMapping(itemParentId,onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'machine-parent/'+itemParentId,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getMachineParentList(onResponse,onError,machineId){
  var config = {
    method: 'get',
    url: BASE_URL+'machine-parent?page=2&page_size=10&item_id='+machineId,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getQuoteList(itemId,onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'quotation/list',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getQuoteList(itemId,onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'quotation/list',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getAddressesList(onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'address',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function createOrder(quoteId,po,shippingAddrId,billingAddrId,desc,onResponse,onError){
  var data = new FormData();
  data.append('quote_id', quoteId);
  appendIfNotNull(data,"po",po)
  data.append('shipping_address_id', shippingAddrId);
  data.append('billing_address_id', billingAddrId);
  data.append('desc', desc);

  var config = {
    method: 'post',
    url: BASE_URL+'order/create',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
     data :data
  };
  axios(config).then(onResponse).catch(onError);
}

async function getCountries(onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'countries',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getStates(countryId,onResponse,onError){
  
  var config = {
    method: 'get',
    url: BASE_URL+'states/'+countryId,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}
async function getCities(keyid,onResponse,onError){
 
  var config = {
    method: 'get',
    url: BASE_URL+'cities/'+keyid,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getAreas(city_id,onResponse,onError){
   var data = new FormData();
  data.append('city_id', city_id);

  var config = {
    method: 'get',
    url: BASE_URL+'area-codes?city_id='+city_id,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
     data:data
  };
  axios(config).then(onResponse).catch(onError);
}

async function updateCartItemSpec(itemId,qty,specs_file,onResponse,onError){
   var data = new FormData();
  data.append('qty', qty);
  data.append('specs_file', specs_file);

  var config = {
    method: 'post',
    url: BASE_URL+'cart/update/'+itemId,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     },
     data:data
  };
  axios(config).then(onResponse).catch(onError);
}

async function trackOrder(id,onResponse,onError){

  var config = {
    method: 'get',
    url: BASE_URL+'order/track/'+id,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(), 
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}