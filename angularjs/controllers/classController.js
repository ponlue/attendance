app.controller('ClassesController', function($scope, ClassService) {
    $scope.items = [];
    $scope.newItem = {};
    $scope.error = null;
    $scope.success = null;

    $scope.load = function() {
        ClassService.getAll()
            .then(function(response) {
                $scope.items = response.data;
                $scope.error = null;
            })
            .catch(function(error) {
                console.error("Error loading classes:", error);
                $scope.error = "Could not load classes.";
            });
    };

    $scope.save = function() {
        if (!$scope.newItem.code || !$scope.newItem.name || !$scope.newItem.group) {
            $scope.error = "All fields (Code, Name, Group) are required.";
            return;
        }

        ClassService.create($scope.newItem)
            .then(function() {
                $scope.newItem = {};
                $scope.success = "Class added successfully.";
                $scope.error = null;
                $scope.load();
            })
            .catch(function(error) {
                console.error("Error saving class:", error);
                if (error.data && error.data.errors) {
                    const messages = Object.values(error.data.errors).flat();
                    $scope.error = messages.join(" ");
                } else {
                    $scope.error = "Could not save class.";
                }
            });
    };

    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this class?")) {
            ClassService.delete(id)
                .then(function() {
                    $scope.success = "Class deleted.";
                    $scope.load();
                })
                .catch(function(error) {
                    console.error("Error deleting class:", error);
                    $scope.error = "Could not delete class.";
                });
        }
    };

    $scope.load();
});
