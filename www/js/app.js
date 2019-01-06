// Ionic Starter App

angular.module('starter', ['ionic','starter.controllers','starter.services.httpService', 'ionic-material', 'ionMdInput','dndLists'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AgentCtrl'
    })

    .state('app.agent-dashboard', {
        url: '/agent-dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/agent-dashboard.html',
                controller: 'AgentCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    });

    $urlRouterProvider.otherwise('/app/agent-dashboard');
});
