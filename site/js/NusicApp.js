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
