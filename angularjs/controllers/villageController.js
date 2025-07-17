app.controller('VillagesController', function($scope, VillageService) {
    $scope.items = [];
    $scope.newItem = {};

    // Load all villages
    $scope.load = function() {
        VillageService.getAll().then(function(response) {
            $scope.items = response.data;
        });
    };

    // Save new village
    $scope.save = function() {
        if ($scope.newItem.code && $scope.newItem.name) {
            VillageService.create($scope.newItem).then(function() {
                $scope.newItem = {};
                $scope.load();
            });
        } else {
            alert("Code and Name are required");
        }
    };

    // Delete village
    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this village?")) {
            VillageService.delete(id).then(function() {
                $scope.load();
            });
        }
    };

    // Initial load
    $scope.load();
});
