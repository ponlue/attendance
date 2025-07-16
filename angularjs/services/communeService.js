// Communes Service
app.factory('CommuneService', function($http) {
    const baseUrl = '/api/communes';
    return {
        getAll: () => $http.get(baseUrl),
        create: (data) => $http.post(baseUrl, data),
        delete: (id) => $http.delete(`${baseUrl}/${id}`)
    };
});