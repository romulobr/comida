(function () {
    var app = angular.module('comida', ['ngRoute', 'ngAnimate', 'ngMaterial', 'lbServices', 'restaurants', 'orders']);
    var views = {
        restaurants: '/js/restaurants/restaurants.html',
        restaurant: '/js/restaurants/restaurant.html',
        editRestaurant: '/js/restaurants/editRestaurant.html',
        orders: '/js/orders/orders.html',
        order: '/js/orders/order.html',
        orderItem: '/js/orders/orderItem.html'
    };

    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/orders', {
                    templateUrl: views.orders
                }).
                when('/order/:orderId', {
                    templateUrl: views.order
                }).
                when('/order', {
                    templateUrl: views.order
                }).
                when('/orders/:orderId/orderItem/:orderItemId', {
                    templateUrl: views.orderItem
                }).
                when('/orders/:orderId/orderItem/', {
                    templateUrl: views.orderItem
                }).
                when('/restaurants', {
                    templateUrl: views.restaurants
                }).
                when('/restaurant/:restaurantId', {
                    templateUrl: views.restaurant
                }).
                when('/restaurant/edit/:restaurantId', {
                    templateUrl: views.editRestaurant
                }).
                when('/restaurant/', {
                    templateUrl: views.restaurant
                }).
                otherwise({
                    redirectTo: '/orders'
                });
        }]);
})();
