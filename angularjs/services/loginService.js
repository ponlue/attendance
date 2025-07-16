// Logins Service
app.factory('LoginService', function($http) {
    const baseUrl = '/api/logins';
    return {
        getAll: () => $http.get(baseUrl),
        create: (data) => $http.post(baseUrl, data),
        update: (id, data) => $http.put(`${baseUrl}/${id}`, data),
        delete: (id) => $http.delete(`${baseUrl}/${id}`)
    };
});