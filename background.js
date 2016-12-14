var localStorageKey = 'api-proxy-store';

chrome.webRequest.onBeforeRequest.addListener(
    dealRequest,
    { urls: ["<all_urls>"] },
    ["blocking"]
);

function dealRequest(detail) {
  var localData = getData(localStorageKey);
  if (localData[detail.url.split('?')[0]]) {
    return { redirectUrl: localData[detail.url.split('?')[0]] + (detail.url.split('?')[1] ? '?' + detail.url.split('?')[1] : '') };
  }
}

function getData (key) {
  var data = window.localStorage.getItem(key);
  if (data) return JSON.parse(window.localStorage.getItem(key));
  return {};
}
