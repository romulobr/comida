var orders = angular.module('orders', ['ngRoute', 'lbServices']);

orders.controller('OrdersController', function ($scope, Order) {
    Order.query({'filter[include]': 'restaurant'}, function (orders) {
        $scope.orders = orders;
    });
});

orders.controller('OrderDetailController', function ($scope, $routeParams, Order) {

    $scope.order = {};
    $scope.params = $routeParams;

    if ($routeParams.orderId) {
        Order.query({'filter[where][id]': $routeParams.orderId, 'filter[include]': ['restaurant', 'orderItems'] }, function (order) {
            if (order.length > 0) {
                $scope.order = order[0];
                var peopleOrdering = $scope.order.orderItems.length;
                $scope.order.individualDeliveryFee = $scope.order.deliveryFee / peopleOrdering;
            } else {
                console.log('not a valid order.');
            }
        });
    }
});

orders.controller('OrderItemController', function ($scope, $routeParams, $window, OrderItem) {

    $scope.orderItem = {};
    $scope.params = $routeParams;

    $scope.save = function () {
        OrderItem.upsert($scope.orderItem, function (orderItem) {
            $scope.orderItem = orderItem;
            $window.location.href='/index.html#/order/'+orderItem.orderId;
        }, function (error) {
            console.log('error saving item for the order');
            console.log(error);
        });
    };

    if ($routeParams.orderItemId) {
        OrderItem.query({'filter[where][id]': $routeParams.orderItemId}, function (itemOrder) {
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