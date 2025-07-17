app.controller('SubjectsController', function($scope, SubjectService) {
    $scope.items = [];
    $scope.newItem = {};

    // Load all subjects
    $scope.load = function() {
        SubjectService.getAll().then(function(response) {
            $scope.items = response.data;
        });
    };

    // Save a new subject
    $scope.save = function() {
        if ($scope.newItem.code && $scope.newItem.name) {
            SubjectService.create($scope.newItem).then(function() {
                $scope.newItem = {};
                $scope.load();
            });
        } else {
            alert("Code and Name are required");
        }
    };

    // Delete subject
    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this subject?")) {
            SubjectService.delete(id).then(function() {
                $scope.load();
            });
        }
    };

    // Initial load
    $scope.load();
});
