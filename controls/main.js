var app = angular.module("myApp", ["ngRoute", "ngCookies"]);
app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "../views/Login.html",
            controller: "appController"
        })
        .when("/", {
            templateUrl: "../views/Main.html",
            controller: "appController"
        })
        .otherwise({
            redirectTo: "/"
        }
        );
    $locationProvider.hashPrefix('');

}]);
