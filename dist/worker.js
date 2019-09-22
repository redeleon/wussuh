self.addEventListener("install", function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  console.log("Installing web app");
  return caches.open("offline").then(function(cache) {
    console.log("caching index and important routes");
    return cache.addAll(["/"]);
  });
};

self.addEventListener("fetch", function(event) {
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request);
  }));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response){
      if(response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function(request){
  return caches.open("offline").then(function (cache) {
    return fetch(request).then(function (response) {
      console.log(response.url + " was cached");
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function(request){
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
     if(!matching || matching.status == 404) {
       return cache.match("offline.html");
     } else {
       return matching;
     }
    });
  });
};


self.addEventListener('push', function(event, data) {
  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = './images/icon-96x96.png';
  var tag = 'sample-push-example-tag';
  var image = './images/icon-96x96.png';

  var chromeTest = event.data.text();
  event.waitUntil(
    self.registration.showNotification(title, {
      body: chromeTest,
      icon: icon,
      image: image
    })
  );
});
