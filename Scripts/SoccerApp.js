var soccerApp = angular.module('myTestApp', ['ngRoute']);

soccerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'Views/Home.html'
                //controller: 'HomeCtrl'
            }).
            when('/team/', {
                templateUrl: 'Views/Team.html',
                controller: 'TeamCtrl'
            }).
            when('/game/', {
                templateUrl: 'Views/Game.html',
                controller: 'GameCtrl'
            }).
            when('/schedule/', {
                templateUrl: 'Views/Schedule.html',
                controller: 'ScheduleCtrl'
            }).
            otherwise({ redirectTo: '/' });
    }]);