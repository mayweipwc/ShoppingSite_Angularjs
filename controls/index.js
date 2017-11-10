app.controller("appController", function ($scope, $http, $location, $rootScope, $cookies) {
    $scope.username = $rootScope.username;
    $scope.password = $rootScope.password;
    $rootScope.RequestVerificationToken = $cookies.get('token');
    if (!$rootScope.RequestVerificationToken) {
        $location.path('/login');
    }
    else {
        $http.defaults.headers.common['RequestVerificationToken'] = $rootScope.RequestVerificationToken;
        $http.get('https://pwcfrontendtest.azurewebsites.net/getlist').then(function (response) {
            //First function handles success
            $scope.items = response.data.res;
        }, function (response) {
            //Second function handles error
            alert(response);
        });
    }
    $scope.Login = function () {
        $(".loginMask").show();
        $http.post(" https://pwcfrontendtest.azurewebsites.net/login", { username: $scope.username, psd: $scope.password }).then(
            function (response) {
                if (response.data.status == "success") {
                    $cookies.put('token', response.data.token);
                    $rootScope.RequestVerificationToken = response.data.token;
                    $rootScope.username = $scope.username;
                    $rootScope.password = $scope.password;
                    $location.path('/index');
                }
                else {
                    alert(response.data.status);
                }
                $(".loginMask").hide();
            },
            function (error) {
                alert(error);
                $(".loginMask").hide();
            }
        );
    }
    $scope.Reset = function () {
        $scope.username = "";
        $scope.password = "";
    }
    $rootScope.Logout = function () {
        $cookies.remove('token');
        $rootScope.username = "";
        $rootScope.password = "";
        $location.path('/login');
    }
    $rootScope.cartList = [];
    $rootScope.totalPrice = function () {
        var totalpz = 0;
        angular.forEach($rootScope.cartList, function (item) {
            totalpz += parseInt(item.qutity) * item.price;
        });
        return totalpz;
    }
    $scope.removeItem = function (x) {
        $scope.cartList.splice(x, 1);
    }
    $scope.addToCart = function (item) {
        var temp = null;
        for (var i = 0, len = $rootScope.cartList.length; i < len; i++) {
            if ($rootScope.cartList[i].name === item.name) {
                $rootScope.cartList[i].qutity += 1;
                temp = $rootScope.cartList[i];
                break;
            }
        }
        if (temp == null) {
            temp = { 'name': item.name, 'qutity': 1, 'price': item.price };
            $rootScope.cartList.push(temp);
        }
        alert("Adding '" + item.name + "' successfully! Current count: " + temp.qutity + ".");
    }
});