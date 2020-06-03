// import { fabric } from "../lib/fabric";

busHandle.service('commonService', ['$q', function($q) {
    var commonService = {
        getJSONData: function(url) {
            var deffered = $q.defer();
            var self = this;
            self.readTextFile(url, function(text){
                var data = JSON.parse(text);
                deffered.resolve(data);
            });
            return deffered.promise;
        },
        readTextFile: function(file, callback) {
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4 && rawFile.status == "200") {
                    callback(rawFile.responseText);
                }
            }
            rawFile.send(null);
        },
        loadSvgFromUrl: function(url, index) {
            var deffered = $q.defer();
            var canvas = new fabric.Canvas('busCanvas_'+index);
            window.canvas = canvas;
            var loadFabric = fabric.loadSVGFromURL(url, function(objects, options) {
                var loadedObject = fabric.util.groupSVGElements(objects, options);
                loadedObject.set({
                    left: 154,
                    top: 60,
                    width: 300,
                    height: 150,
                    scaleX: 0.11,
                    scaleY: 0.10
                });
                loadedObject.selectable = false;
                loadedObject.setCoords();
                canvas.add(loadedObject);
                canvas.requestRenderAll();
            });
            deffered.resolve();
            return deffered.promise;
        },
    }
    return commonService;
}]);