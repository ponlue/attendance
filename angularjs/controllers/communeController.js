app.controller('CommunesController', function($scope, CommuneService) {
    $scope.items = [];
    $scope.newItem = {};

    // Load all communes
    $scope.load = function() {
        CommuneService.getAll().then(function(response) {
            $scope.items = response.data;
        });
    };

    // Save a new commune
    $scope.save = function() {
        if ($scope.newItem.code && $scope.newItem.name) {
            CommuneService.create($scope.newItem).then(function() {
                $scope.newItem = {};
                $scope.load();
            });
        } else {
            alert("Code and Name are required");
        }
    };

    // Delete commune
    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this commune?")) {
            CommuneService.delete(id).then(function() {
                $scope.load();
            });
        }
    };

    // Initial load
    $scope.load();
});
