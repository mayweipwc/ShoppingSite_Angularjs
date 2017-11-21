var app = angular.module("myApp", ["ngRoute", "ngCookies"]);
app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "login.html",
            controller: "appController"
        })
        .when("/", {
            templateUrl: "index.html",
            controller: "appController"
        })
        .otherwise({
            redirectTo: "/"
        }
        );
    $locationProvider.hashPrefix('');

}]);


