app.controller('NavController', function($scope, $http, $location) {
  $scope.isLoggedIn = false;

  $http.get('https://backend.kriss.messi.today:20402/user', {
    withCredentials: true
  }).then(res => {
    $scope.isLoggedIn = !!res.data;
  });

  $scope.logout = function() {
    $http.post('https://backend.kriss.messi.today:20402/logout', {}, {
      withCredentials: true
    }).then(() => {
      $scope.isLoggedIn = false;
      $location.path('/login');
    });
  };
});
