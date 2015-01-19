angular.module('orders').controller('OrderListController', function ($scope, $interval, Order) {
  var isForToday = function (order) {
        var orderDate = new Date(order.date).toString();
        var today = moment().startOf('day').toDate().toString();
        return orderDate === today;
      },
      isOpen = function (order) {
        return moment().isBefore(moment(order.closingTime));
      },
      progress = function (start, end) {
        var minimumTime = end.diff(start),
            elapsedTime = end.diff(moment());
        return ((minimumTime - elapsedTime) / minimumTime * 100);
      };

  $interval(function () {
    _.each($scope.openOrders, function (order) {
      order.closingProgress = progress(moment().subtract(50, 'minutes'), moment(order.closingTime));
      order.deliveryProgress = progress(moment().subtract(50, 'minutes'), moment(order.estimatedDeliveryTime));
    });
  }, 100, 0, true);

  Order.query({
    'filter[include]': 'restaurant'
  }, function (orders) {
    $scope.openOrders = _.filter(orders, function (order) {
      return isForToday(order) && isOpen(order);
    });

    $scope.closedOrders = _.filter(orders, function (order) {
      return isForToday(order) && !isOpen(order);
    });

  });
});
