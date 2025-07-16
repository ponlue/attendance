// Addresses Service
app.factory('AddressService', function($http) {
    const baseUrl = '/api/addresses';
    return {
        getAll: () => $http.get(baseUrl),
        create: (data) => $http.post(baseUrl, data),
        delete: (id) => $http.delete(`${baseUrl}/${id}`)
    };
});