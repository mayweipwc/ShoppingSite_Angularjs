var app = angular.module("myApp", ["ngRoute", "ngCookies"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "Login.html",
            controller: "appController"
        })
        .when("/index", {
            templateUrl: "Index.html",
            controller: "appController"
        })
        .otherwise({
            redirectTo: "/login"
         }
        )
        ;
});
