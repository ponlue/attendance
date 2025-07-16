app.controller('RegisterController', function($scope, $http, $location) {
  $scope.user = {};
  $scope.registerError = '';

  $scope.register = function() {
    $http.post('https://backend.kriss.messi.today:20402/api/register', {
      name: $scope.user.name,
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(res) {
      const token = res.data.token;

      // Store the token in localStorage
      localStorage.setItem('auth_token', token);

      // Redirect to attendance page
      $location.path('/attendance');
    }).catch(function(err) {
      console.error("Register failed:", err);

      // Laravel validation errors
      if (err.data && err.data.errors) {
        let first = Object.values(err.data.errors)[0][0];
        $scope.registerError = first;
      }
      // Generic error message
      else if (err.data && err.data.message) {
        $scope.registerError = err.data.message;
      } else {
        $scope.registerError = 'Registration failed. Please try again.';
      }
    });
  };
});
