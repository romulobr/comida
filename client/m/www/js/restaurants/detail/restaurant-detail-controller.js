angular.module('restaurants').controller('RestaurantDetailController', function ($scope, $location, $stateParams, Restaurant) {

  $scope.restaurant = {};

  $scope.edit = function () {
    console.log('editing');
    $location.path("/tab/restaurant/edit/"+$stateParams.restaurantId);
  }

  if ($stateParams.restaurantId) {
    Restaurant.get({
      id: $stateParams.restaurantId
    }, function (restaurant) {
      restaurant.displayableDefaultDeliveryFee = restaurant.defaultDeliveryFee / 100;
      $scope.restaurant = restaurant;
    });
  }
});
