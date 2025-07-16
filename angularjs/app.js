var app = angular.module('attendanceApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/attendance', {
      templateUrl: 'views/attendance.html',
      controller: 'MainController'
    })
    .when('/scan', {
      templateUrl: 'views/scan.html',
      controller: 'QRController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController'
    })
    .when('/user-profiles', {
      templateUrl: 'views/user_profiles.html',
      controller: 'UserProfileController'
    })
    .when('/addresses', {
      templateUrl: 'views/user_profiles.html',
      controller: 'UserProfileController'
    })
    .when('/classes', {
      templateUrl: 'views/classes.html',
      controller: 'classController'
    })
    .when('/district', {
      templateUrl: 'views/districts.html',
      controller: 'districtController'
    })
    .otherwise({
      redirectTo: '/login'  // 👈 Make login the default
    });
});


app.run(function($rootScope, $location, $http, authService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    const publicRoutes = ['/login', '/register'];
    if (!authService.isLoggedIn() && !publicRoutes.includes($location.path())) {
      event.preventDefault();
      $location.path('/login');
    }
  });

  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.isLoggedIn = authService.isLoggedIn();
  });

  $rootScope.logout = function() {
    const token = authService.getToken();
    $http.post('https://backend.kriss.messi.today:20402/api/logout', {}, {
      headers: { Authorization: 'Bearer ' + token }
    }).finally(function() {
      authService.logout();
      $location.path('/login');
    });
  };
});
