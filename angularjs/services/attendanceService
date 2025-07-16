// Attendances Service
app.factory('AttendanceService', function($http) {
    const baseUrl = '/api/attendances';
    return {
        getAll: () => $http.get(baseUrl),
        create: (data) => $http.post(baseUrl, data),
        delete: (id) => $http.delete(`${baseUrl}/${id}`)
    };
});