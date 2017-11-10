var app = angular.module("myApp", ["ngRoute", "ngCookies"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "login.html",
            controller: "appController"
        })
        .when("/index", {
            templateUrl: "index.html",
            controller: "appController"
        })
        .otherwise({
            redirectTo: "/login"
         }
        )
        ;
});
