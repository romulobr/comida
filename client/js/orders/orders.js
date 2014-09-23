var orders = angular.module('orders', ['ngRoute', 'lbServices']);

orders.controller('OrdersController', function ($scope, Order) {
    Order.query({'filter[include]': 'restaurant'}, function (orders) {
        $scope.orders = orders;
    });
});

orders.controller('NewOrderController', function ($scope, $window, Order, Restaurant) {
    $scope.order = {};
    Restaurant.query(function (restaurants) {
        $scope.restaurants = restaurants;
        $scope.order.restaurantId = restaurants[0].id;
        $scope.order.displayableDeliveryFee = restaurants[0].defaultDeliveryFee/100;
        $scope.order.closingTime = moment().add(1,'hour').toDate();
        $scope.order.estimatedDeliveryTime = moment().add(2,'hour').toDate();
    });

    $scope.save = function () {
        $scope.order.deliveryFee = $scope.order.displayableDeliveryFee * 100;
        $scope.order.date = moment().startOf('day').toDate();
        $scope.order.status = 'open';
        Order.upsert($scope.order, function (order) {
            $scope.order = order;
            $window.location.href='/index.html#/orders';
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
    }
});

orders.controller('OrderDetailController', function ($scope, $routeParams, Order) {

    $scope.order = {};
    $scope.params = $routeParams;

    if ($routeParams.orderId) {
        Order.query({'filter[where][id]': $routeParams.orderId, 'filter[include]': ['restaurant', 'orderItems'] }, function (order) {
            if (order.length > 0) {
                $scope.order = order[0];
                var peopleOrdering = $scope.order.orderItems.length;
                $scope.order.displayableDeliveryFee = $scope.order.deliveryFee / 100;
                $scope.order.individualDeliveryFee = $scope.order.deliveryFee / peopleOrdering;
                $scope.order.displayableIndividualDeliveryFee = $scope.order.deliveryFee / peopleOrdering / 100;
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