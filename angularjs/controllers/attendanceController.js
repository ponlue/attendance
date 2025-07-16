app.controller('AttendanceController', function($scope) {
  $scope.attendanceDate = new Date().toISOString().slice(0, 10);

  $scope.students = [
    { id: 1, name: 'Sokha', status: 'Present' },
    { id: 2, name: 'Dara', status: 'Present' },
    { id: 3, name: 'Rithy', status: 'Present' }
  ];

  $scope.submitAttendance = function() {
    let attendanceData = {
      date: $scope.attendanceDate,
      records: $scope.students.map(function(student) {
        return {
          id: student.id,
          name: student.name,
          status: student.status
        };
      })
    };

    console.log('Submitted Attendance:', attendanceData);
    alert("Attendance submitted successfully!");
    // TODO: POST to Laravel API if needed
  };
});

