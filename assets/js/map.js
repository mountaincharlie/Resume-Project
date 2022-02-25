// creating the function to generate the map in our div

function initMap(){
    // using the 'google.maps.Map' object provided by the API
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        } // central coors where map renders
    });

    // creating markers to show where you've been
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var locations = [
        {
            lat: 40.785091,
            lng: -73.968285
        },
        {
            lat: 41.084045,
            lng: -73.874245
        },
        {
            lat: 40.754932,
            lng: -73.984016
        },
    ];

    // iterating through using the JS map() function
    var markers = locations.map(function(location, i){
        // returning the API's Marker object 
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]  // using % so it will loop back for the 27th location
        });
    });

    // copying from the API doc for adding the marker
    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
};