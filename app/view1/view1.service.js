app.service('Map', function($q) {

    this.init = function() {
        var options = {
            center: new google.maps.LatLng(43.300000, 5.400000),
            zoom: 13
        };
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
        /*this.map.data.loadGeoJson('test.json');
        this.map.data.setStyle({visible:false});*/
    }

    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }

    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }

    this.callDataBase = function(tabState){
        var res = {};
        if(tabState[0]){
            res = "test.json";
        }else if(tabState[1]){
            res = "test2.json";
        }
        return res;
    }

    this.layer = function(tabState){
        /*this.map.data.forEach(function(feature) {
            this.map.data.remove(feature);
        });*/
        //this.map.data.loadGeoJson('empty.json');
        //this.map.data.setMap(null);

        /*this.map.data.forEach(function(feature) {
            this.map.data.remove(feature);
        });*/
        //this.map.data.remove(feature);

        var response = this.callDataBase(tabState);
        this.map.data.loadGeoJson(response);

    }
});