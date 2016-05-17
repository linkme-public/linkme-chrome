// Successful login url
var successURL = 'https://www.facebook.com/connect/login_success.html';

// Callback on successful login
function onFacebookLogin() {

    console.log("Successfully logged into facebook.");

    if (localStorage.accessToken) {
        console.log("Already got access token");
        return;
    }

    // Find right tab and get the access token
    chrome.tabs.getAllInWindow(null, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.indexOf(successURL) == 0) {

                // Extract access token
                var params = tabs[i].url.split('#')[1];
                accessTokenKeyVal = params.split('&')[0];
                accessToken = accessTokenKeyVal.split('=')[1];

                console.log("Found access token");
                console.log(accessToken);

                // Store access token in local storage
                localStorage.accessToken = accessToken;

                // Remove listener
                chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                return;
            }
        }
    });
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);
