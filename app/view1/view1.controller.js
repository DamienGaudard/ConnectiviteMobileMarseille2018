app.controller('newPlaceCtrl', function($scope, Map) {

    $scope.place = {};
    $scope.state = false;

    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
            .then(
                function(res) { // success
                    Map.addMarker(res);
                    $scope.place.name = res.name;
                    $scope.place.lat = res.geometry.location.lat();
                    $scope.place.lng = res.geometry.location.lng();
                },
                function(status) { // error
                    $scope.apiError = true;
                    $scope.apiStatus = status;
                }
            );
    }

    $scope.send = function() {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
    }

    Map.init();

    $scope.changeState = function(){
        console.log($scope.state);
        $scope.state = !($scope.state);
        console.log($scope.state);
        if($scope.state){
            $scope.displayLayer();
        }else{
            $scope.noneDisplayLayer();
        }
    }
    $scope.displayLayer = function(){
        Map.layer();
    }
    $scope.noneDisplayLayer = function(){
        Map.clear();
    }

});