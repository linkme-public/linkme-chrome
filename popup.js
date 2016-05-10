chrome.tabs.query({
    'active': true, 
    'windowId':chrome.windows.WINDOW_ID_CURRENT},
    
    function(tabs){
      document.getElementById('currentLink').innerHTML = tabs[0].url;
      extractedLink = tabs[0].url;
    
    var params = { "link": tabs[0].url }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://linkme-web.azurewebsites.net/api/link", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(params)); 
});



