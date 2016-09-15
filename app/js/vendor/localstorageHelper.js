window.store = {};

window.store.setData = function(key, value){
  var str = JSON.stringify(value);
  window.localStorage.setItem(key, str);
}

window.store.getData = function(key){
  var str =  window.localStorage.getItem(key),
        localArray = [];
  if(JSON.parse(str)){
    return JSON.parse(str);
  }
  else{
    return localArray
  }
}

window.store.deleteObject = function(key, value){
  var str =  window.localStorage.getItem(key),
       data = JSON.parse(str),
       temp = [];
  for(var i = 0 ; i < data.length ; i++){
    if(data[i].text !== value){
      temp.push(data[i]);
    }
  }
  
      console.log(temp);
  window.localStorage.setItem(key, JSON.stringify(temp));
}