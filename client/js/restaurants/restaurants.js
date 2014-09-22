(function () {
    var restaurants = angular.module('restaurants', ['lbServices']);

    restaurants.controller('RestaurantsController', function ($scope, Restaurant) {
        Restaurant.query(function (restaurants) {
            $scope.restaurants = restaurants;
        });
    });

    restaurants.controller('RestaurantDetailController', function ($scope, $routeParams, Restaurant) {

        $scope.restaurant = {};
        if ($routeParams.restaurantId) {
            Restaurant.get({id: $routeParams.restaurantId}, function (restaurant) {
                restaurant.displayableDefaultDeliveryFee = restaurant.defaultDeliveryFee / 100;
                $scope.restaurant = restaurant;
            });
        }
    });

    restaurants.controller('EditRestaurantController', function ($scope, $routeParams, Restaurant) {

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
})();
