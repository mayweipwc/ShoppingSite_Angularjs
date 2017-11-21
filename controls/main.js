var app = angular.module("myApp", ["ngRoute", "ngCookies"]);
app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "Login.html",
            controller: "appController"
        })
        .when("/", {
            templateUrl: "Index.html",
            controller: "appController"
        })
        .otherwise({
            redirectTo: "/"
        }
        );
    $locationProvider.hashPrefix('');

}]);


