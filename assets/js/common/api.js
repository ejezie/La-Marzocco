// const BASE_URL = "http://54.252.24.196/v1/api/";
// const BASE_URL = "http://3.106.30.129/v1/api/";
// var BASE_URL;// = "http://54.252.24.196/v1/api/";
// const BASE_URL = "http://13.236.41.154/v1/api/";


// async function loadBaseUrl(){
//    const url = window.location.origin +'/config.json';
//    var config = {
//     method: 'get',
//     url: url,
//     headers: {
//       'Authorization': getAPIToken(),
//       'Accept': 'application/json'
//     },
//   };
 
//   var response = await axios(config);
//   if(response){
//     BASE_URL = response.data.API_BASE_URL;
//     alert(BASE_URL)
//   }
 
// }

// loadBaseUrl();


if(typeof BASE_URL == 'undefined' || BASE_URL == null){
  alert("Please reload the page")
}



const safeAccess =  (props, object,defaultValue) => props.reduce((prefix, val) => (prefix && prefix[val]) ? prefix[val] : defaultValue, object);

function updateUrlParameter(uri, key, value) {
  if(!value){return;}
    // remove the hash part before operating on the uri
    var i = uri.indexOf('#');
    var hash = i === -1 ? ''  : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);

    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";

    if (value === null) {
        // remove key-value pair if value is specifically null
        uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
        if (uri.slice(-1) === '?') {
            uri = uri.slice(0, -1);
        }
        // replace first occurrence of & by ? if no ? is present
        if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?');
    } else if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        uri = uri + separator + key + "=" + value;
    }
    return uri + hash;
}

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
          if(error.response.status == 429){return;}
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
          if(error.code && error.code != "ECONNABORTED"){
            notifyError("Please check your connection!");
          }
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
  // parent_item_id,
  super_session_item_id,
  manage_serial_number,
  item_group_id,
  item_type_id,
  item_family_id,
  // length,
  // length_uom,
  // width,
  // width_uom,
  // height,
  // height_uom,
  weight,
  weight_uom,
  // volume,
  // volume_uom,
  is_consumable,
  is_recommended,
  is_slow_moving,
  is_active,
  price,
  onResponse,
  onError){

  var data = new FormData();

  // data.append('parent_id',parent_item_id);
  data.append('group_id',item_group_id);
  data.append('family_id',item_family_id);
  data.append('type_id',item_type_id);

  data.append('code',code);
  data.append('name',name);
  data.append('short_code',short_code);
  data.append('desc',desc);
  data.append('super_session_item_id',super_session_item_id);
  data.append('manage_serial_number',manage_serial_number);

  // data.append('length',length);
  // data.append('length_uom',length_uom);
  // data.append('width',width);
  // data.append('width_uom',width_uom);
  // data.append('height',height);
  // data.append('height_uom',height_uom);
  data.append('weight',weight);
  data.append('weight_uom',weight_uom);
  // data.append('volume',volume);
  // data.append('volume_uom',volume_uom);
  data.append('is_consumable',is_consumable);
  data.append('is_recommended',is_recommended);
  data.append('is_slow_moving',is_slow_moving);
  data.append('is_active',is_active);
  data.append('price',price);

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
async function updateItemImages(
  item_id,
  formData,
  onResponse,
  onError){

  var config = {
    method: 'post',
    url:BASE_URL+'item/'+item_id,
    headers: {
      'Authorization': getAPIToken(),
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    data : formData
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
    // city_id,
    state_id,
    country_id,
    address_type,
    onResponse,user_id){

  var data = new FormData();

  data.append('is_billable',(type == 1 || type == 3)?1:0);
  data.append('is_shippable',(type == 2 || type == 3)?1:0);

  data.append('name',name);
  data.append('zip_code',zip_code);
  data.append('address',address);
  appendIfNotNull(data,"landmark",landmark);
  appendIfNotNull(data,"user_id",user_id);
  data.append('phone',phone);

  data.append('area_code_id',area_code_id);
  // data.append('city_id',city_id);
  data.append('state_id',state_id);
  data.append('country_id',country_id);
  data.append('address_type',address_type);

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
function deleteItemImage(item_id,image_id,onResponse,onError){
  var data = new FormData();

var config = {
  method: 'delete',
  url: BASE_URL + "item/"+item_id+"/image/"+image_id,
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

async function getKitsForItem(main_item_id,onResponse,onError){

  const kit_type_id = 4;
   var url = BASE_URL+'item?page_size=99999&main_item_id='+main_item_id+'&type_id='+kit_type_id;

  var config = {
    method: 'get',
    url: url,
    errorHandle: false,
    headers: {
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
    },
  };
 
  axios(config)
  .then(onResponse)
  .catch(onError);  

}

async function getItems(onResponse,onError,page,page_size,searchQuery,sort_key,sort_dir){

  var data = new FormData();
   var url = BASE_URL+'item?page='+page+'&page_size='+page_size;
   if(searchQuery){
    url+='&search_text='+searchQuery;
  }


  if(sort_key){
    var sortorder = (sort_dir === "asc") ? 0 : 1;
    url += "&"+sort_key+"="+ sortorder; 
  }

  var config = {
    method: 'get',
    url: url,
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
async function getMachineItems(onResponse,onError,page,page_size,main_item_id){

  var data = new FormData();
   var url = BASE_URL+'item?page='+page+'&page_size='+page_size+'&main_item_id='+main_item_id;

  var config = {
    method: 'get',
    url: url,
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

async function getRecommendedProducts(onResponse,onError){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'item?page_size=20&is_recommended=1',
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

async function getTopSellingProducts(onResponse,onError){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'item?page_size=20&sort_by_ordered=0',
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
async function getMostViewedProducts(onResponse,onError){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'item?page_size=20&sort_by_viewed=0',
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
    url: BASE_URL+'order/list?page='+page+'&page_size='+page_size+'&sort_by_creation=0',
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


async function updateOrderStatus(onResponse,onError,order_ids){

  var data = new FormData();
  data.append("order_ids",order_ids);


  var config = {
    method: 'post',
    url: BASE_URL+'order/status-update',
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


async function getCustomer(onResponse,onError,customer_id){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'customer-master/'+customer_id,
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


async function getEmployeeList(onResponse,onError,page,page_size){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'employee?page='+page+'&page_size='+page_size,
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


async function deleteEmployee(onResponse,onError,id){

  var config = {
    method: 'delete',
    url: BASE_URL+'employee/'+id,
    headers: {
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
    }
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

async function bulkUploadItemDescription(onResponse,onError,file){

  var data = new FormData();
  data.append("file",file);


  var config = {
    method: 'post',
    url: BASE_URL+'upload/item-desc',
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


async function bulkUpdateItems(onResponse,onError,ids,is_consumable,is_recommended,is_slow_moving,is_active,price){

  var data = new FormData();

  data.append("ids",ids);
  if(is_consumable){
    data.append("is_consumable",is_consumable);
  } else if(is_recommended){
    data.append("is_recommended",is_recommended);
  } else if(is_slow_moving){
    data.append("is_slow_moving",is_slow_moving);
  } else if(is_active){
    data.append("is_active",is_active);
  } else if(price){
    data.append("price",price);
  }

  var config = {
    method: 'post',
    url: BASE_URL+'item/bulk/update',
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


async function bulkUploadCartItems(user_id,file,onResponse,onError){

  var data = new FormData();
  appendIfNotNull(data,"user_id",user_id)
  data.append("file",file);


  var config = {
    method: 'post',
    url: BASE_URL+'cart/upload',
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
async function clearCart(onResponse,onError){

  var config = {
    method: 'delete',
    url: BASE_URL+'cart/clear',
    headers: {
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
    }
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

async function getUserProfile(onResponse,onError){

  var data = new FormData();

  var config = {
    method: 'get',
    url: BASE_URL+'user/profile',
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


async function updateProfile(first_name,last_name, onResponse,onError){

  var data = new FormData();
  appendIfNotNull(data,"first_name",first_name);
  appendIfNotNull(data,"last_name",last_name);


  var config = {
    method: 'post',
    url: BASE_URL+'user/profile',
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


async function updateMail(newMail, onResponse,onError){

  var data = new FormData();
  appendIfNotNull(data,"email",newMail);

  var config = {
    method: 'post',
    url: BASE_URL+'user/update-email',
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



async function updatePassword(old_password,new_password,new_password_confirmation,onResponse,onError){
  var data = new FormData();
  data.append('old_password', old_password);
  data.append('new_password', new_password);
  data.append('new_password_confirmation', new_password_confirmation);

  var config = {
    method: 'post',
    url: BASE_URL+'user/update-password',
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

async function userProfile(onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'user/profile',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     },
  };
  axios(config).then(onResponse).catch(onError);
}

async function exportCatalog(onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'item/export-for-cart',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     },
  };
  axios(config).then(onResponse).catch(onError);
}


async function getSearchResults(currentPage,pageSize,searchQuery,filterParentId,filterGroupId,filterFamilyId,onResponse,onError){
  console.log("url  "+url,"  parent_id  "+filterParentId+"  grp "+filterGroupId +" searchQuery: "+searchQuery)
  // var data = new FormData();
  // appendIfNotNull(data,"search_text ",searchQuery);
  // appendIfNotNull(data,"parent_id",filterParentId);
  // appendIfNotNull(data,"group_id",filterGroupId);

  var  url = BASE_URL+'item?page='+currentPage+ "&page_size="+pageSize;

  if(filterGroupId){
    url+='&group_id='+filterGroupId;
  }

  if(filterParentId){
    url+='&parent_id='+filterParentId;
  }
  if(filterFamilyId){
    url+='&family_id='+filterFamilyId;
  }
 
  if(searchQuery){
    url+='&search_text='+searchQuery;
  }

  var config = {
    method: 'get',
    url:url,
    headers: {
      'Content-Type': 'multipart/form-data',
    'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
    //  ,
    // data : data
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
  // data.append('item_id', itemId);
  data.append('qty', qty);
  appendIfNotNull(data,'user_id',userId);
  appendIfNotNull(data,'desc',desc);

  var config = {
    method: 'post',
    url: BASE_URL+'cart/update/'+itemId,
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
    url: BASE_URL+'cart?page_size=10000',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getQuote(user_id,desc,onResponse,onError){
  var url = BASE_URL+'quotation/create';

  if(user_id){
    url += "?user_id="+user_id
  }
  // updateUrlParameter(url,"user_id",user_id);
  // updateUrlParameter(url,"desc",desc);

  var config = {
    method: 'get',
    url: url,
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
    url: BASE_URL+'item-parent-image?parent_id='+parent_id+"&main_item_id="+main_item_id+"&page_size=9999",
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}
async function getItemParentImagesForMachineDropdown(currentPage,pageSize,main_item_id,onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'item-parent-image?main_item_id='+main_item_id+'&page='+currentPage+ '&page_size='+pageSize,
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

async function getMachineParentList(currentPage,pageSize,onResponse,onError,machineId){
  var config = {
    method: 'get',
    url: BASE_URL+'machine-parent?item_id='+machineId+'&page='+currentPage+ '&page_size='+pageSize,
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

async function getAddressesList(onResponse,onError,user_id){
 var url = BASE_URL+'address?page=1&page_size=1000';
 if(user_id){
  url+= ("?user_id="+user_id);
 }
  var config = {
    method: 'get',
    url: url,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}


async function getPickupAddressesList(onResponse,onError){
 // var url = BASE_URL+'address?page=1&page_size=1000';
 var url = BASE_URL+'pickup-address';

  var config = {
    method: 'get',
    url: url,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getBillableAddressesList(onResponse,onError){
 
  var config = {
    method: 'get',
    url: BASE_URL+'address?page=1&is_billable=1',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function createOrder(quoteId,po,po_number,shippingAddrId,billingAddrId,desc,sched_delivery_date,is_pickup,onResponse,onError){
  var data = new FormData();
  data.append('quote_id', quoteId);
  appendIfNotNull(data,"po",po)
  appendIfNotNull(data,"desc",desc)
  appendIfNotNull(data,"po_number",po_number)
  appendIfNotNull(data,"sched_delivery_date",sched_delivery_date)
  data.append('shipping_address_id', shippingAddrId);
  data.append('billing_address_id', billingAddrId);
  data.append('is_pickup', is_pickup);

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


async function deleteOrderItem(orderId,orderLineIds,onResponse,onError){
  var data = new FormData();

  data.append('order_id', orderId);
  data.append('order_line_ids', orderLineIds);

  var config = {
    method: 'post',
    url: BASE_URL+'order/order-line/cancel',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     },
     data : data
  };
  axios(config).then(onResponse).catch(onError);
}


async function createPayment(order_id,isEFT,onResponse,onError,amount,card_name,cart_number,cart_exp_month,cart_exp_year,card_cvc){
  var data = new FormData();
  data.append('order_id', order_id);
  if(isEFT){
    data.append('is_eft', 1);
  }else{
    data.append('amount', amount);
    data.append('card_name',card_name);
    data.append('card_number', btoa(cart_number));
    data.append('card_exp_month', btoa(cart_exp_month));
    data.append('card_exp_year', btoa(cart_exp_year));
    data.append('card_cvc', btoa(card_cvc));
  }

  var config = {
    method: 'post',
    url: BASE_URL+'order/order-payment',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     },
     data :data
  };
  axios(config).then(onResponse).catch(onError);
}

async function getConnectedCustomers(onResponse,onError){
 
  var config = {
    method: 'get',
    url: BASE_URL+'connected-customer?page_size=999999',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
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

async function getAreas(postcode,onResponse,onError){
   var data = new FormData();
  data.append('postcode', postcode);

  var config = {
    method: 'get',
    url: BASE_URL+'area-codes?postcode='+postcode+"&page_size=9999",
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
// async function getPeriodicReport(onResponse,start_date,end_date,download_format,onError){

//   var url = BASE_URL+'report/periodic';
//   if(start_date){updateUrlParameter(url,"start_date",start_date)}
//   if(end_date){updateUrlParameter(url,"end_date",end_date)}
//   if(download_format){updateUrlParameter(url,"download_format",download_format)}
//   var config = {
//     method: 'get',
//     url: url,
//      headers: {
//       'Content-Type': 'multipart/form-data',
//       'Authorization': getAPIToken(),
//       'Accept': 'application/json'
//      }
//   };
//   axios(config).then(onResponse).catch(onError);
// }
// async function getRegionwiseReport(onResponse,start_date,end_date,download_format,onError){

//   var url = BASE_URL+'report/region-wise';
//   if(start_date){updateUrlParameter(url,"start_date",start_date)}
//   if(end_date){updateUrlParameter(url,"end_date",end_date)}
//   if(download_format){updateUrlParameter(url,"download_format",download_format)}
//   var config = {
//     method: 'get',
//     url: url,
//      headers: {
//       'Content-Type': 'multipart/form-data',
//       'Authorization': getAPIToken(),
//       'Accept': 'application/json'
//      }
//   };
//   axios(config).then(onResponse).catch(onError);
// }
// async function getProductwiseReport(onResponse,start_date,end_date,download_format,onError){

//   var url = BASE_URL+'report/product-wise';
//   if(start_date){updateUrlParameter(url,"start_date",start_date)}
//   if(end_date){updateUrlParameter(url,"end_date",end_date)}
//   if(download_format){updateUrlParameter(url,"download_format",download_format)}
//   var config = {
//     method: 'get',
//     url: url,
//      headers: {
//       'Content-Type': 'multipart/form-data',
//       'Authorization': getAPIToken(),
//       'Accept': 'application/json'
//      }
//   };
//   axios(config).then(onResponse).catch(onError);
// }


async function getDashboardReport(onResponse,start_date,end_date,download_format,onError){

  var url = BASE_URL+'report/dashboard';
  // {updateUrlParameter(url,"start_date",start_date)}
  // {updateUrlParameter(url,"end_date",end_date)}
  // {updateUrlParameter(url,"download_format",download_format)}
  if(start_date && end_date){
    url += "?start_date="+start_date;
    url += "&end_date="+end_date;
  }
  var config = {
    method: 'get',
    url: url,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}



async function getPeriodicReport(onResponse,start_date,end_date,download_format,onError){

  var url = BASE_URL+'report/periodic';
  // if(start_date){updateUrlParameter(url,"start_date",start_date)}
  // if(end_date){updateUrlParameter(url,"end_date",end_date)}
  // if(download_format){updateUrlParameter(url,"download_format",download_format)}

  if(start_date && end_date && download_format){
    url += "?start_date="+start_date;
    url += "&end_date="+end_date;
    url += "&download_format="+download_format;
  }else if(start_date && end_date){
    url += "?start_date="+start_date;
    url += "&end_date="+end_date;
  }else if(download_format){
    url += "?download_format="+download_format;
  }
  var config = {
    method: 'get',
    url: url,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}
async function getRegionwiseReport(onResponse,start_date,end_date,download_format,onError){

  var url = BASE_URL+'report/region-wise';
  // if(start_date){updateUrlParameter(url,"start_date",start_date)}
  // if(end_date){updateUrlParameter(url,"end_date",end_date)}
  // if(download_format){updateUrlParameter(url,"download_format",download_format)}
  if(start_date && end_date && download_format){
    url += "?start_date="+start_date;
    url += "&end_date="+end_date;
    url += "&download_format="+download_format;
  }else if(start_date && end_date){
    url += "?start_date="+start_date;
    url += "&end_date="+end_date;
  }else if(download_format){
    url += "?download_format="+download_format;
  }
  var config = {
    method: 'get',
    url: url,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getProductwiseReport(onResponse,start_date,end_date,download_format,page,page_size,searchQuery,sort_key,sort_value,onError){

  var url = BASE_URL+'report/product-wise?page='+page+'&page_size='+page_size;
  // if(start_date){updateUrlParameter(url,"start_date",start_date)}
  // if(end_date){updateUrlParameter(url,"end_date",end_date)}
  // if(download_format){updateUrlParameter(url,"download_format",download_format)}


  if(searchQuery){
    url+='&search_text='+searchQuery;
  }
  if(sort_key){
    url+="&"+sort_key+"="+sort_value;
  }


  if(start_date && end_date && download_format){
    url += "&start_date="+start_date;
    url += "&end_date="+end_date;
    url += "&download_format="+download_format;
  }else if(start_date && end_date){
    url += "&start_date="+start_date;
    url += "&end_date="+end_date;
  }else if(download_format){
    url += "&download_format="+download_format;
  }

  var config = {
    method: 'get',
    url: url,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getCustomerOrderReport(onResponse,start_date,end_date,download_format,page,page_size,searchQuery,sort_key,sort_value,onError){

  var url = BASE_URL+'report/customer-order?page='+page+'&page_size='+page_size;
  // if(start_date){updateUrlParameter(url,"start_date",start_date)}
  // if(end_date){updateUrlParameter(url,"end_date",end_date)}
  // if(download_format){updateUrlParameter(url,"download_format",download_format)}

  if(searchQuery){
    url+='&search_text='+searchQuery;
  }
  if(sort_key){

    url+="&"+sort_key+"="+sort_value;
  }


  if(start_date && end_date && download_format){
    url += "&start_date="+start_date;
    url += "&end_date="+end_date;
    url += "&download_format="+download_format;
  }else if(start_date && end_date){
    url += "&start_date="+start_date;
    url += "&end_date="+end_date;
  }else if(download_format){
    url += "&download_format="+download_format;
  }
 
  var config = {
    method: 'get',
    url: url,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function getNewsletter(onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'newsletter',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function uploadNewsletter(onResponse,onError,month, year, file){

  var data = new FormData();
  data.append("newsletter",file);
  data.append("month",month);
  data.append("year",year);


  var config = {
    method: 'post',
    url: BASE_URL+'newsletter',
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

async function deactivateNewsletter(id,onResponse,onError){

  var config = {
    method: 'post',
    url: BASE_URL+'newsletter/deactivate/'+id,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function deleteNewsletter(id,onResponse,onError){

  var config = {
    method: 'delete',
    url: BASE_URL+'newsletter/'+id,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}


async function getPromotion(onResponse,onError){
  var config = {
    method: 'get',
    url: BASE_URL+'promotional-image',
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function uploadPromotion(onResponse,onError,file){

  var data = new FormData();
  data.append("file",file);


  var config = {
    method: 'post',
    url: BASE_URL+'promotional-image',
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


async function deactivatePromotion(id,onResponse,onError){

  var config = {
    method: 'post',
    url: BASE_URL+'promotional-image/deactivate/'+id,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function deletePromotion(id,onResponse,onError){

  var config = {
    method: 'delete',
    url: BASE_URL+'promotional-image/'+id,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}


async function sendEnquiryMail(message,onResponse,onError){

  var data = new FormData();
  data.append("message",message);


  var config = {
    method: 'post',
    url: BASE_URL+'connected-customer/enquiry-mail',
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


async function sendTrainingAftersalesEnquiry(request_type,details,address_id,onResponse,onError){

  var data = new FormData();
  data.append("request_type",request_type);
  data.append("details",details);
  data.append("address_id",address_id);


  var config = {
    method: 'post',
    url: BASE_URL+'enquiry',
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



async function getTrainingAftersalesEnquiryList(onResponse,onError,page,page_size){
  var config = {
    method: 'get',
    url: BASE_URL+'enquiry?page='+page+'&page_size='+page_size,
     headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getAPIToken(),
      'Accept': 'application/json'
     }
  };
  axios(config).then(onResponse).catch(onError);
}

async function updateTrainingAftersalesEnquiryStatus(status,enquiry_id,onResponse,onError){

  var data = new FormData();
  data.append("status",status);

  var config = {
    method: 'post',
    url: BASE_URL+'enquiry/'+enquiry_id,
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

async function replyTrainingAftersalesEnquiry(details,enquiry_id,onResponse,onError){

  var data = new FormData();
  data.append("details",details);

  var config = {
    method: 'post',
    url: BASE_URL+'enquiry/reply/'+enquiry_id,
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