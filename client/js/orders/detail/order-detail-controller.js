angular.module('orders').controller('OrderDetailController', function ($scope, $routeParams, $materialDialog, Order, OrderItem) {
  var getItems = function () {
    Order.query({
      'filter[where][id]': $routeParams.orderId,
      'filter[include]': ['restaurant', 'orderItems']
    }, function (order) {
      if (order.length > 0) {
        $scope.order = order[0];
        var peopleOrdering = $scope.order.orderItems.length;
        $scope.order.displayableDeliveryFee = $scope.order.deliveryFee / 100;
        $scope.order.individualDeliveryFee = $scope.order.deliveryFee / peopleOrdering;
        $scope.order.displayableIndividualDeliveryFee = $scope.order.deliveryFee / peopleOrdering / 100;
        $scope.order.total = _.reduce(_.pluck(order[0].orderItems, 'price'), function (memo, num) {
          return memo + num;
        }, order[0].deliveryFee / 100);
      } else {
        console.log('not a valid order.');
      }
    });
  };

  $scope.order = {};
  $scope.order.total = 0;
  $scope.params = $routeParams;

  $scope.dialog = function (e, orderItem) {
    $materialDialog({
      templateUrl: 'js/orders/confirmDialog.html',
      targetEvent: e,
      controller: ['$scope', '$hideDialog', function ($scope, $hideDialog) {
        $scope.close = function () {
          $hideDialog();
        };
        $scope.confirm = function () {
          OrderItem.delete(orderItem);
          getItems();
          $hideDialog();
        };
      }]
    });
  };

  if ($routeParams.orderId) {
    getItems();
  }
});
