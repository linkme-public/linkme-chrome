function updatePopup(status, link) {
  document.getElementById('status').innerHTML = status;
  document.getElementById('currentLink').innerHTML = link;
}

chrome.tabs.query({
  'active': true,
  'windowId': chrome.windows.WINDOW_ID_CURRENT
},

  function (tabs) {

    // Get the link
    var extractedLink = tabs[0].url;

    // Update the popup
    updatePopup("Posting ...", extractedLink);

    // Post to API
    var params = {
      "link": extractedLink,
      "facebookAccessToken": localStorage.accessToken
    };

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          updatePopup("Link posted successfully!", "");
        } else {
          updatePopup("Something went wrong, try again!", "");
        }
      }
    }

    xhr.open("POST", "http://linkme-web.azurewebsites.net/api/link", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(params));
  });



