// Subjects Service
app.factory('SubjectService', function($http) {
    const baseUrl = '/api/subjects';
    return {
        getAll: () => $http.get(baseUrl),
        create: (data) => $http.post(baseUrl, data),
        delete: (id) => $http.delete(`${baseUrl}/${id}`)
    };
});