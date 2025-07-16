app.controller('NavController', function($scope, $http, $location, authService) {
  $scope.isLoggedIn = authService.isLoggedIn();

  $scope.logout = function() {
    const token = authService.getToken();

    $http.post('https://backend.kriss.messi.today:20402/api/logout', {}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).finally(function() {
      authService.logout();
      $location.path('/login');
    });
  };
});
