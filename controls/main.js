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
    
    $scope.addToCart = function (item,e) {
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
        //add animation
        var x = e.pageX;
        var y = e.pageY;
        var flyer = $("<div style='background:red;height: 20px; width: 20px; position: absolute; opacity: 1;border:1px solid white; color:white; font-weight:bold; text-align:center; border-radius:10px;'>1</div>");
        flyer.css({ "top": y, "left": x });
        angular.element(document.body).append(flyer);
        //声明定时器运行次数
        var n = 0;
        //声明拓展倍数
        var value = 100;
        flyer.timer = setInterval(function () {
            var A = 100;
            var B = 1;
            var timespand = 1000;
            n++;
            var x1 = (B * n) * Math.PI / 180;
            var y1 = -A * x1 * x1;
            flyer.css({ "top": y1 + y, "left": x1 * value + x });
            if (n >= timespand / 20) {
                clearInterval(flyer.timer);
                //remove flyer;
                angular.element(flyer).remove();
            }
        }, 20);
        flyer.addClass("fadeIn");
     }
});
