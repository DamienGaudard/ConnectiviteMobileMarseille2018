app.controller('newPlaceCtrl', function($scope, Map) {

    $scope.place = {};
    $scope.tabState = [
        false, //Bouygues Telecom
        false, //Free
        false, //Orange
        false, //SFR
        false, //2G
        false, //3G
        false  //4G
    ];
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

    $scope.changeState = function(state){
        if(state == "bouyguestelecom"){
            $scope.tabState[0] = !($scope.tabState[0]);
        }else if(state == "free"){
            $scope.tabState[1] = !($scope.tabState[1]);
        }else if(state == "orange") {
            $scope.tabState[2] = !($scope.tabState[2]);
        }else if(state == "sfr"){
            $scope.tabState[3] = !($scope.tabState[3]);
        }else if(state == "2g"){
            $scope.tabState[4] = !($scope.tabState[4]);
        }else if(state == "3g"){
            $scope.tabState[5] = !($scope.tabState[5]);
        }else if(state == "4g"){
            $scope.tabState[6] = !($scope.tabState[6]);
        }
    }
    $scope.display = function(){
        console.log($scope.tabState);
        Map.init();
        Map.layer($scope.tabState);
    }
});