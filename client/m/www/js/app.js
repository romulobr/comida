// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var orders = angular.module('orders', ['lbServices']);
var feedback = angular.module('feedback', ['lbServices']);
var restaurants = angular.module('restaurants', ['lbServices']);

angular.module('starter', ['ionic', 'orders', 'restaurants', 'feedback'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:

      .state('tab.orders', {
        url: '/orders',
        views: {
          'tab-orders': {
            templateUrl: 'js/orders/list/order-list.html',
            controller: 'OrderListController'
          }
        }
      })

      .state('tab.restaurants', {
        url: '/restaurants',
        views: {
          'tab-restaurants': {
            templateUrl: 'js/restaurants/list/restaurant-list.html',
            controller: 'RestaurantListController'
          }
        }
      })

      .state('tab.restaurant', {
        url: '/restaurant/:restaurantId',
        views: {
          'tab-restaurants': {
            templateUrl: 'js/restaurants/detail/restaurant-detail.html',
            controller: 'RestaurantDetailController'
          }
        }
      })

      .state('tab.edit-restaurant', {
        url: '/restaurant/edit/:restaurantId',
        views: {
          'tab-restaurants': {
            templateUrl: 'js/restaurants/edit/edit-restaurant.html',
            controller: 'EditRestaurantController'
          }
        }
      })

      .state('tab.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'templates/tab-about.html',
            controller: 'AboutController'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/restaurants');

  });
