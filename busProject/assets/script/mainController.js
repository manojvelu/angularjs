busHandle.controller('mainController', ['$scope', 'commonService', function($scope, commonService) {
    $scope.mainCntl.platFormArr = ['PLATFORM 1', 'PLATFORM 2', 'PLATFORM 3', 'PLATFORM 4'];
    var initialize = function() {
        var jsonUrl = "../assets/json/busData.json";
        commonService.getJSONData(jsonUrl).then(function(res) {
            $scope.mainCntl.busData = res.busDetails;
            getBusData($scope.mainCntl.busData[0]);
            $scope.mainCntl.loadSVG();
            $scope.mainCntl.countDown();
        });
    };
    
    var getBusData = function(data) {
        $scope.mainCntl.routeNo = data.busNo;
        $scope.mainCntl.busName = data.busName;
        $scope.mainCntl.platForm = data.platform;
        $scope.mainCntl.fromPlace = data.from;
        $scope.mainCntl.toPlace = data.to;
        $scope.mainCntl.arrival = data.start;
        $scope.mainCntl.depature = data.end;
        $scope.mainCntl.remainTime = data.remainTime;
    };
    
    $scope.mainCntl.loadSVG = function() {
        var svgUrl = "../assets/img/bus.svg";
        for(var i=0;i < $scope.mainCntl.platFormArr.length;i++) {
            commonService.loadSvgFromUrl(svgUrl, i);
        }
    };

    $scope.mainCntl.countDown = function() {
        document.getElementById('timer').innerHTML = 003 + ":" + 20;
        startTimer();

        function startTimer() {
            var presentTime = document.getElementById('timer').innerHTML;
            var timeArray = presentTime.split(/[:]+/);
            var m = timeArray[0];
            var s = checkSecond((timeArray[1] - 1));
            if(s==59){m=m-1}
            //if(m<0){alert('timer completed')}
            
            document.getElementById('timer').innerHTML = m + ":" + s;
            console.log(m)
            setTimeout(startTimer, 1000);
        }

        function checkSecond(sec) {
            if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
            if (sec < 0) {sec = "59"};
            return sec;
        }
    };

    initialize();
}]);