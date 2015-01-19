var orders = angular.module('orders');

orders.controller('OrderItemController', function ($scope, $routeParams, $window, OrderItem) {

    $scope.orderItem = {};
    $scope.params = $routeParams;

    $scope.save = function () {
        OrderItem.upsert($scope.orderItem, function (orderItem) {
            $scope.orderItem = orderItem;
            $window.location.href = '/index.html#/order/' + orderItem.orderId;
        }, function (error) {
            console.log('error saving item for the order');
            console.log(error);
        });
    };

    if ($routeParams.orderItemId) {
        OrderItem.query({
            'filter[where][id]': $routeParams.orderItemId
        }, function (itemOrder) {
            if (itemOrder.length > 0) {
                $scope.orderItem = itemOrder[0];
            } else {
                console.log('not a valid item order.');
            }
        });
    } else {
        $scope.orderItem.orderId = $routeParams.orderId;
    }
});