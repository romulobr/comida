angular.module('restaurants').controller('EditRestaurantController', function ($scope, $stateParams, $location, Restaurant) {
  $scope.save = function () {
    $scope.restaurant.defaultDeliveryFee = $scope.restaurant.displayableDefaultDeliveryFee * 100;
    Restaurant.upsert($scope.restaurant, function (restaurant) {
      $scope.restaurant = restaurant;
      $location.path("/tab/restaurant/"+restaurant.id);
    }, function (error) {
      console.log('error saving restaurant:');
      console.log(error);
      $scope.restaurant = angular.copy($scope.originalRestaurant);

    });
  };

  $scope.restaurant = {};

  if ($stateParams.restaurantId) {
    Restaurant.get({
      id: $stateParams.restaurantId
    }, function (restaurant) {
      restaurant.displayableDefaultDeliveryFee = restaurant.defaultDeliveryFee / 100;
      $scope.originalRestaurant =  restaurant;
      $scope.restaurant = angular.copy($scope.originalRestaurant);
    });
  }
});