var orders = angular.module('orders', ['ngRoute', 'lbServices', 'ngMaterial']);

orders.controller('OrdersController', function ($scope, $interval, Order) {
    var isForToday = function (order) {
            var orderDate = new Date(order.date).toString();
            var today = moment().startOf('day').toDate().toString();
            return orderDate === today
        },
        isOpen = function (order) {
            return moment().isBefore(moment(order.closingTime));
        },
        progress = function (start, end) {
                var minimumTime = end.diff(start),
                elapsedTime = end.diff(moment());
            return((minimumTime - elapsedTime) / minimumTime * 100);
        };

    $interval(function () {
        _.each($scope.openOrders, function (order) {
            order.closingProgress = progress(moment().subtract(50, 'minutes'), moment(order.closingTime));
            order.deliveryProgress = progress(moment().subtract(50, 'minutes'), moment(order.estimatedDeliveryTime));
        });
    }, 100, 0, true);

    Order.query({'filter[include]': 'restaurant'}, function (orders) {
        $scope.openOrders = _.filter(orders, function (order) {
            return isForToday(order) && isOpen(order);
        });

        $scope.closedOrders = _.filter(orders, function (order) {
            return isForToday(order) && !isOpen(order);
        });

    });
});

orders.controller('NewOrderController', function ($scope, $window, Order, Restaurant) {
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
    }
});

orders.controller('OrderDetailController', function ($scope, $routeParams, $materialDialog, Order, OrderItem) {
    var getItems = function () {
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
    };

    $scope.order = {};
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