angular.module('orders').controller('NewOrderController', function ($scope, $window, Order, Restaurant) {
  $scope.order = {};
  Restaurant.query(function (restaurants) {
    $scope.restaurants = restaurants;
    $scope.order.restaurantId = restaurants[0].id;
    $scope.order.displayableDeliveryFee = restaurants[0].defaultDeliveryFee / 100;
    $scope.order.closingTime = moment().add(1, 'hour').toDate();
    $scope.order.estimatedDeliveryTime = moment().add(2, 'hour').toDate();
  });

  $scope.save = function () {
    $scope.order.deliveryFee = $scope.order.displayableDeliveryFee * 100;
    $scope.order.date = moment().startOf('day').toDate();
    $scope.order.status = 'open';
    Order.upsert($scope.order, function (order) {
      $scope.order = order;
      $window.location.href = '/index.html#/order/' + order.id;
    }, function (error) {
      console.log('error saving item for the order');
      $materialToast({
        template: '<material-toast>Hello, ' + Math.random() + '</material-toast>',
        duration: 2000,
        position: {
          bottom: false,
          top: true,
          left: false,
          right: true
        }
      });
      console.log(error);
    });
  };
});