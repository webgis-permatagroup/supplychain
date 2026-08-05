// ===========================================
// LAYER MANAGER
// ===========================================

function createVectorLayer(data, style = undefined, layerType = "") {

    const source = new ol.source.Vector({

        features: new ol.format.GeoJSON().readFeatures(data, {

            dataProjection: "EPSG:4326",

            featureProjection: "EPSG:3857"

        })

    });

    // Metadata layer
   source.getFeatures().forEach(feature => {

    feature.set("layerType", layerType);

    // status highlight
    feature.set("selected", false);

});

    const layer = new ol.layer.Vector({

        source: source,

        style: style

    });

    return {

        source: source,

        layer: layer

    };

}


// ===========================================
// INIT LAYERS
// ===========================================

function initLayers() {

    // ==================================
// PERMATA
// ==================================

const permata = createVectorLayer(
    App.data.permata,
    Styles.permata,
    "permata"
);

App.sources.permata = permata.source;
App.layers.permata = permata.layer;

// Layer default tidak tampil
App.layers.permata.setVisible(false);

App.map.addLayer(App.layers.permata);

console.log(
    "Permata :",
    App.sources.permata.getFeatures().length
);


// ==================================
// SUPPLIER
// ==================================

const supplier = createVectorLayer(
    App.data.supplier,
    Styles.supplier,
    "supplier"
);

App.sources.supplier = supplier.source;

// ==================================
// DEFAULT FILTER
// ==================================

App.sources.supplier.getFeatures().forEach(feature => {
    feature.set("visible", true);
});

// ==================================

App.layers.supplier = supplier.layer;

// Layer default tidak tampil
App.layers.supplier.setVisible(false);

App.map.addLayer(App.layers.supplier);

console.log(
    "Supplier :",
    App.sources.supplier.getFeatures().length
);


// ==================================
// PROTECTED AREA
// ==================================

const protectedArea = createVectorLayer(
    App.data.protectedArea,
    Styles.protectedArea,
    "protected"
);

App.sources.protectedArea = protectedArea.source;

App.layers.protectedArea = protectedArea.layer;

// Layer default tidak tampil
App.layers.protectedArea.setVisible(false);

App.map.addLayer(App.layers.protectedArea);

console.log(
    "Protected Area :",
    App.sources.protectedArea.getFeatures().length
);


    // ==================================
    // FIT MAP
    // ==================================

    App.view.fit(
        App.sources.permata.getExtent(),
        {
            padding: [80,80,80,80],
            duration:800
        }
    );

}