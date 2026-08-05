// ===========================================
// MAP
// ===========================================

// -------------------------------------------
// VIEW
// -------------------------------------------

App.view = new ol.View({

    center: ol.proj.fromLonLat([101.5, 0.5]),

    zoom: 6

});


// -------------------------------------------
// BASEMAP
// -------------------------------------------

App.baseMaps = {

    // ==================================
    // OpenStreetMap
    // ==================================

    osm: new ol.layer.Tile({

        source: new ol.source.OSM(),

        visible:true,

        properties:{
            name:"OpenStreetMap"
        }

    }),

    // ==================================
    // Esri World Imagery
    // ==================================

    satellite:new ol.layer.Tile({

        source:new ol.source.XYZ({

            url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

        }),

        visible:false,

        properties:{
            name:"Esri Satellite"
        }

    }),

     googleSatellite: new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            attributions: '© Google'
        }),
        visible: false
    }),

    googleHybrid: new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
            attributions: '© Google'
        }),
        visible: false
    })

};




// -------------------------------------------
// MAP
// -------------------------------------------

App.map = new ol.Map({

    target: "map",

    view: App.view,

    layers:[

    App.baseMaps.osm,

    App.baseMaps.satellite,

    App.baseMaps.googleSatellite,
    
    App.baseMaps.googleHybrid

]

});

console.log("Map Loaded");