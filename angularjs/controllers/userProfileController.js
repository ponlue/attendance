app.controller('UserProfileController', function($scope, UserProfileService) {
    $scope.userProfiles = [];
    $scope.newUser = {};

    $scope.loadUserProfiles = function() {
        UserProfileService.getAll().then(function(res) {
            $scope.userProfiles = res.data;
        });
    };

    $scope.saveUser = function() {
        UserProfileService.create($scope.newUser).then(function(res) {
            $scope.loadUserProfiles();
            $scope.newUser = {};
        });
    };

    $scope.deleteUser = function(id) {
        if (confirm("Are you sure?")) {
            UserProfileService.delete(id).then(function() {
                $scope.loadUserProfiles();
            });
        }
    };

    $scope.loadUserProfiles(); // Load on page start
});
