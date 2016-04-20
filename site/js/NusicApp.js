(function () {
    'use strict';

    angular
        .module('NusicApp', ['ngAnimate', 'ngSanitize', 'ui.router', 'mgcrea.ngStrap.alert'])
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
          .controller('NusicController', [function() {
              var vm = this;

              vm.modal = {
                "title": "Title",
                "content": "Hello Modal<br />This is a multiline message!"
              };
          }]);
}());
