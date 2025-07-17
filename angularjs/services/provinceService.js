app.factory('ProvinceService', function($http) {
    const baseUrl = '/api/provinces';

    return {
        // GET all provinces
        getAll: function() {
            return $http.get(baseUrl);
        },

        // POST new province
        create: function(data) {
            return $http.post(baseUrl, data);
        },

        // DELETE a province by ID
        delete: function(id) {
            return $http.delete(`${baseUrl}/${id}`);
        }
    };
});
