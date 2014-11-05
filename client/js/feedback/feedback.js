var feedback = angular.module('feedback', ['ngRoute', 'lbServices', 'ngMaterial']);

feedback.controller('SendFeedbackController', function ($scope, $http) {
    $scope.contact = {};
    $scope.send = function () {
        if($scope.contact.message !== '')
        $http.post('/feedback/', $scope.contact);
    }
});