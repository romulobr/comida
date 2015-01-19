angular.module('restaurants').controller('EditRestaurantController', function ($scope, $routeParams, Restaurant) {

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
    Restaurant.get({
      id: $routeParams.restaurantId
    }, function (restaurant) {
      restaurant.displayableDefaultDeliveryFee = restaurant.defaultDeliveryFee / 100;
      $scope.originalRestaurant = restaurant;
      copyOriginalRestaurantToDisplayedRestaurant();
    });
  }
});