angular.module('restaurants').controller('RestaurantListController', function ($scope, Restaurant) {
  Restaurant.query(function (restaurants) {
    $scope.restaurants = restaurants;
  });
});