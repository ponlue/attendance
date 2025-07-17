app.factory('VillageService', function($http) {
    const baseUrl = '/api/villages';

    return {
        getAll: function() {
            return $http.get(baseUrl);
        },
        create: function(data) {
            return $http.post(baseUrl, data);
        },
        delete: function(id) {
            return $http.delete(`${baseUrl}/${id}`);
        }
    };
});
