(function () {
    var app = angular.module('comida', ['ngRoute', 'lbServices', 'mobile-angular-ui']);
    var views = {
        restaurants: '/js/restaurants/restaurants.html',
        restaurant: '/js/restaurants/restaurant.html',
        orders: '/js/orders/orders.html',
        order: '/js/orders/order.html'
    };

    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/orders', {
                    templateUrl: views.orders
                }).
                when('/order/:orderId', {
                    templateUrl: views.order
                }).
                when('/order', {
                    templateUrl: views.order
                }).
                when('/restaurants', {
                    templateUrl: views.restaurants
                }).
                when('/restaurant/:restaurantId', {
                    templateUrl: views.restaurant
                }).
                when('/restaurant/', {
                    templateUrl: views.restaurant
                }).
                otherwise({
                    redirectTo: '/orders'
                });
        }]);

    app.controller('RestaurantsController', function ($scope, Restaurant) {
        Restaurant.query(function (restaurants) {
            $scope.restaurants = restaurants;
        });
    });

    app.controller('RestaurantDetailController', function ($scope, $routeParams, Restaurant) {

        $scope.save = function () {
            $scope.restaurant.defaultDeliveryFee = $scope.restaurant.displayableDefaultDeliveryFee * 100;
            Restaurant.upsert($scope.restaurant, function (restaurant) {
                $scope.restaurant = restaurant;
            }, function (error) {
                console.log('error saving restaurant:');
                console.log(error);
                copyOriginalRestaurantToDisplayedRestaurant();
            });
        };

        $scope.cancelEditing = function () {
            console.log('cancel clicked');
            copyOriginalRestaurantToDisplayedRestaurant();
        };

        var copyOriginalRestaurantToDisplayedRestaurant = function () {
            $scope.restaurant = angular.copy($scope.originalRestaurant);
        };

        $scope.restaurant = {};

        if ($routeParams.restaurantId) {
            Restaurant.get({id: $routeParams.restaurantId}, function (restaurant) {
                restaurant.displayableDefaultDeliveryFee = restaurant.defaultDeliveryFee / 100;
                $scope.originalRestaurant = restaurant;
                copyOriginalRestaurantToDisplayedRestaurant();
            });
        }
    });

    app.controller('OrdersController', function ($scope, Order) {
        Order.query({'filter[include]': 'restaurant'}, function (orders) {
            $scope.orders = orders;
        });
    });

    app.controller('OrderDetailController', function ($scope, $routeParams, Order) {

        $scope.save = function () {
            Order.upsert($scope.order, function (restaurant) {
                $scope.order = order;
            }, function (error) {
                console.log('error saving order');
                console.log(error);
                copyOriginalToDisplayedOrder();
            });
        };

        $scope.cancelEditing = function () {
            console.log('cancel clicked');
            copyOriginalToDisplayedOrder();
        };

        var copyOriginalToDisplayedOrder = function () {
            $scope.order = angular.copy($scope.originalOrder);
        };

        $scope.restaurant = {};
        $scope.params = $routeParams;
        if ($routeParams.orderId) {
            Order.query({'filter[where][id]': $routeParams.orderId, 'filter[include]': 'restaurant' }, function (order) {
                if (order.length > 0) {
                    $scope.originalOrder = order[0];
                    copyOriginalToDisplayedOrder();
                } else {
                    console.log('Not a valid order.');
                }
            });
        }
    });

})();
