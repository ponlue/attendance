app.factory('UserProfileService', function($http) {
    const baseUrl = '/api/user-profiles'; // Laravel route

    return {
        getAll: function() {
            return $http.get(baseUrl);
        },
        get: function(id) {
            return $http.get(baseUrl + '/' + id);
        },
        create: function(data) {
            return $http.post(baseUrl, data);
        },
        update: function(id, data) {
            return $http.put(baseUrl + '/' + id, data);
        },
        delete: function(id) {
            return $http.delete(baseUrl + '/' + id);
        }
    };
});
