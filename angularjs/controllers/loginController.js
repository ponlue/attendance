app.controller('LoginController', function($scope, $http, $location, $rootScope, authService) {
  $scope.user = {};
  $scope.loginError = '';

  $scope.login = function() {
    $http.post('https://backend.kriss.messi.today:20402/api/login', $scope.user)
      .then(function(response) {
        authService.setToken(response.data.token);
        $rootScope.isLoggedIn = true;

        // optional: reload to force visibility of layout
        $location.path('/attendance');
      })
      .catch(function(err) {
        $scope.loginError = err.data?.message || 'Invalid email or password.';
      });
  };
});
