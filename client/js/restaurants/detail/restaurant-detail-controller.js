angular.module('restaurants').controller('RestaurantDetailController', function ($scope, $routeParams, Restaurant) {

  $scope.restaurant = {};
  if ($routeParams.restaurantId) {
    Restaurant.get({
      id: $routeParams.restaurantId
    }, function (restaurant) {
      restaurant.displayableDefaultDeliveryFee = restaurant.defaultDeliveryFee / 100;
      $scope.restaurant = restaurant;
    });
  }
});
