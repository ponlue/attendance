app.controller('QRController', function($scope, $timeout) {
  $scope.qrResult = "";

  function onScanSuccess(decodedText, decodedResult) {
    $timeout(() => {
      $scope.qrResult = decodedText;
    });
    html5QrcodeScanner.stop();
  }

  const html5QrcodeScanner = new Html5Qrcode("reader");
  html5QrcodeScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    onScanSuccess
  ).catch(err => {
    console.error("Camera start error:", err);
  });
});
