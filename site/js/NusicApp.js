(function () {
    'use strict';

    angular
        .module('NusicApp', ['ngAnimate', 'ngSanitize', 'ui.router', 'mgcrea.ngStrap.alert', 'mgcrea.ngStrap.popover'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
              $urlRouterProvider.otherwise(function ($injector) {
                  $injector.get('$state').go('home');
              });

              $stateProvider
                  .state('home', {
                      url: '/home',
                      templateUrl: 'views/home.html'
                  })
                  .state('music', {
                      url: '/music',
                      templateUrl: 'views/music.html'
                  })
                  .state('events', {
                      url: '/events',
                      templateUrl: 'views/events.html'
                  })
                  .state('photos', {
                      url: '/photos',
                      templateUrl: 'views/photos.html'
                  })
                  .state('biography', {
                      url: '/biography',
                      templateUrl: 'views/biography.html'
                  });
          }])
          .config(['$sceProvider', function($sceProvider) {
            // Completely disable SCE.  For demonstration purposes only!
            // Do not use in new projects.
            $sceProvider.enabled(false);
          }])
          .run(['$window', '$log','$http', '$q', function($window, $log, $http, $q) {
            var url = $window.location.href, urlParts, prefix, major, minor, suffix, foundNext = false;
            function findLatest(prefix, major, minor, suffix, foundNext) {
              var deferred = $q.defer();
              $http.head(prefix+major+'.'+(minor+1)+suffix).success(function() {
                foundNext = true;
                findLatest(prefix, major, minor + 1, suffix, foundNext).then(function(url){
                  $log.log('Found ' + url);
                  deferred.resolve(url);
                },function() {
                  if (foundNext) {
                    deferred.resolve(url);
                  } else {
                    deferred.reject()
                  }
                });
              }).error(function(error, status) {
                if (foundNext) {
                  $window.location.href = prefix+major+'.'+minor+suffix;
                }
              });
              return deferred.promise;
            }
            if (angular.isString(url)) {
              urlParts = url.match(/(https?:\/\/cdn.rawgit.com\/sandipchitale\/nusic\/)(\d+)\.(\d+)(\/.*)/);
              if (angular.isArray(urlParts)) {
                if (urlParts.length >= 5) {
                  prefix = urlParts[1];
                  major = urlParts[2];
                  minor = parseInt(urlParts[3]);
                  suffix = urlParts[4];
                  findLatest(prefix, major, minor, suffix, false).then(function(url) {
                    $window.location.href = url;
                  });
                }
              }
            }
          }])
          .controller('NusicController', ['$modal', '$window', function($modal, $window) {
              var vm = this;
              vm.showVideo = function(videoHref) {
                $modal({
                  contentTemplate: "views/video.html",
                  backdrop: "static",
                  controller: "VideoController",
                  controllerAs: "vm",
                  locals: {videoHref: videoHref},
                  show: true
                });
              };

              vm.showVideoInBlank = function(videoHref) {
                $window.open(videoHref, '_blank')
              };
          }])
          .controller('VideoController', ['videoHref', function(videoHref) {
              var vm = this;
              vm.videoHref = videoHref;
          }]);
}());
