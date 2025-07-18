app.controller('DistrictsController', function($scope, DistrictService) {
    $scope.items = [];
    $scope.newItem = {};

    // Load all districts
    $scope.load = function() {
        DistrictService.getAll().then(function(response) {
            $scope.items = response.data;
        });
    };

    // Save a new district
    $scope.save = function() {
        if ($scope.newItem.code && $scope.newItem.name) {
            DistrictService.create($scope.newItem).then(function() {
                $scope.newItem = {};
                $scope.load();
            });
        } else {
            alert("Code and Name are required");
        }
    };

    // Delete district
    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this district?")) {
            DistrictService.delete(id).then(function() {
                $scope.load();
            });
        }
    };

    // Initial load
    $scope.load();
});
