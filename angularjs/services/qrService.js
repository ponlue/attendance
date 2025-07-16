// Generate QR Service
app.factory('QrService', function($http) {
    const baseUrl = '/api/generate-qrs';
    return {
        getAll: () => $http.get(baseUrl),
        create: (data) => $http.post(baseUrl, data),
        delete: (id) => $http.delete(`${baseUrl}/${id}`)
    };
});