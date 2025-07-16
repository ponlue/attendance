// Villages Service
app.factory('VillageService', function($http) {
    const baseUrl = '/api/villages';
    return {
        getAll: () => $http.get(baseUrl),
        create: (data) => $http.post(baseUrl, data),
        delete: (id) => $http.delete(`${baseUrl}/${id}`)
    };
});