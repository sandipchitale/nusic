(function () {
    'use strict';

    angular
        .module('NusicApp', ['ui.router'])
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
          }]);
}());
