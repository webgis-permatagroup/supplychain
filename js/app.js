// ===========================================
// PERMATA WEBGIS
// Application Core
// Version 2.1
// ===========================================

const App = {

    // =======================================
    // APP
    // =======================================

    version: "2.1.0",

    // =======================================
    // MAP
    // =======================================

    map: null,

    view: null,

    // =======================================
    // POPUP
    // =======================================

    popup: null,

    popupContent: null,

    // =======================================
    // DATA
    // =======================================

    data: {

        permata: [],

        supplier: [],

        protectedArea: []

    },

    // =======================================
    // SEARCH
    // =======================================

    search: {

        index: []

    },

    // =======================================
    // OPENLAYERS SOURCE
    // =======================================

    sources: {},

    // =======================================
    // OPENLAYERS LAYER
    // =======================================

    layers: {},

    // =======================================
    // USER INTERFACE
    // =======================================

    ui: {},

    // =======================================
    // TEMPORARY LAYER
    // Semua layer sementara ditempatkan di sini
    // =======================================

    temp: {

        coordinate: {

            source: null,

            layer: null

        },

        highlight: {

            source: null,

            layer: null

        }

    }

};

// ===========================================
// FILTER
// ===========================================

App.filter = {

    activeMill: null,

    supplierCount: 0,

    cpoCount: 0,

    pkCount: 0

};

// ===========================================
// TOOLS
// ===========================================

App.tools = {

    active: null

};

// ===========================================
// MEASURE
// ===========================================

App.measure = {

    draw: null,

    source: null,

    layer: null,

    sketch: null,

    labelStyle: null

};

// ===========================================
// HIGHLIGHT
// ===========================================

App.highlight = {

    feature: null

};

// ===========================================
// COORDINATE SEARCH
// ===========================================

App.coordinateSearch = {

    latitude: null,

    longitude: null,

    marker: null

};

console.log("--------------------------------");
console.log("Permata WebGIS");
console.log("Version :", App.version);
console.log("Application Core Loaded");
console.log("--------------------------------");