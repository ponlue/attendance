app.controller('ProvinceController', function($scope, ProvinceService) {
    $scope.items = [];
    $scope.newItem = {};
    $scope.success = null;
    $scope.error = null;

    // Load all provinces from the Laravel API
    $scope.load = function() {
        ProvinceService.getAll()
            .then(function(response) {
                $scope.items = response.data;
                $scope.error = null;
            })
            .catch(function(error) {
                console.error("Load error:", error);
                $scope.error = "Unable to load provinces.";
            });
    };

    // Save a new province
    $scope.save = function() {
        if (!$scope.newItem.code || !$scope.newItem.name) {
            $scope.error = "Code and Name are required.";
            return;
        }

        ProvinceService.create($scope.newItem)
            .then(function(response) {
                $scope.success = "Province saved.";
                $scope.error = null;
                $scope.newItem = {};
                $scope.load();
            })
            .catch(function(error) {
                console.error("Save error:", error);
                if (error.data && error.data.errors) {
                    const messages = Object.values(error.data.errors).flat();
                    $scope.error = messages.join(" ");
                } else {
                    $scope.error = "Failed to save province.";
                }
            });
    };

    // Delete a province
    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this province?")) {
            ProvinceService.delete(id)
                .then(function() {
                    $scope.success = "Province deleted.";
                    $scope.error = null;
                    $scope.load();
                })
                .catch(function(error) {
                    console.error("Delete error:", error);
                    $scope.error = "Failed to delete province.";
                });
        }
    };

    // Initial load
    $scope.load();
});
