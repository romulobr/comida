(function () {

  var orders = angular.module('orders', ['ngRoute', 'lbServices', 'ngMaterial']);
  var feedback = angular.module('feedback', ['ngRoute', 'lbServices', 'ngMaterial']);
  var restaurants = angular.module('restaurants', ['lbServices']);

  var app = angular.module('comida', ['ngRoute', 'ngAnimate', 'ngMaterial', 'lbServices', 'restaurants', 'orders', 'feedback']);

  var views = {
    restaurants: '/js/restaurants/restaurant-list.html',
    restaurant: '/js/restaurants/restaurant.html',
    editRestaurant: '/js/restaurants/edit-restaurant.html',
    newRestaurant: '/js/restaurants/new-restaurant.html',

    orderList: '/js/orders/list/order-list.html',
    order: '/js/orders/detail/order.html',
    orderItem: '/js/orders/item/order-item.html',
    newOrder: '/js/orders/new/new-order.html',

    sendFeedback: '/js/feedback/send-feedback.html'
  };

  app.config(['$routeProvider',
        function ($routeProvider) {
      $routeProvider.
      when('/orders', {
        templateUrl: views.orderList
      }).
      when('/order/:orderId', {
        templateUrl: views.order
      }).
      when('/orders/new', {
        templateUrl: views.newOrder
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
      when('/order/edit/:orderId', {
        templateUrl: views.editOrder
      }).
      when('/restaurants', {
        templateUrl: views.restaurants
      }).
      when('/restaurants/new', {
        templateUrl: views.newRestaurant
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
      when('/feedback/', {
        templateUrl: views.sendFeedback
      }).
      otherwise({
        redirectTo: '/orders'
      });
        }]);
})();