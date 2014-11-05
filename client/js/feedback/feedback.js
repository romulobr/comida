var feedback = angular.module('feedback', ['ngRoute', 'lbServices', 'ngMaterial']);

feedback.controller('SendFeedbackController', function ($scope, $http, Feedback, $materialDialog) {
    $scope.contact = {};

    $scope.dialog = function (e, orderItem) {
        $materialDialog({
            templateUrl: 'js/feedback/thanks.html',
            targetEvent: e,
            controller: ['$scope', '$hideDialog', function ($scope, $hideDialog) {
                $scope.close = function () {
                    $hideDialog();
                };
            }]
        });
    }

    $scope.send = function () {
        if($scope.contact.message !== '')
            Feedback.upsert($scope.contact, function (feedback) {
                $scope.contact = feedback;
                $scope.dialog();
            }, function (error) {
                console.log('error sending feedback:');
                console.log(error);
            });
    }
});