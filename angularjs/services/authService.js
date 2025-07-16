app.factory('authService', function($window) {
  return {
    setToken: function(token) {
      $window.localStorage.setItem('auth_token', token);
    },
    getToken: function() {
      return $window.localStorage.getItem('auth_token');
    },
    isLoggedIn: function() {
      return !!$window.localStorage.getItem('auth_token');
    },
    logout: function() {
      $window.localStorage.removeItem('auth_token');
      $window.localStorage.removeItem('user');
    }
  };
});
