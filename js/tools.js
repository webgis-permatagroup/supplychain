// ===========================================
// TOOLS MANAGER
// Sprint 4A Final
// ===========================================

// ===========================================
// TOOL STATE
// ===========================================

App.tools = {

    active: null

};

// ===========================================
// MEASURE STATE
// ===========================================

App.measure = {

    draw: null,

    source: null,

    layer: null,

    sketch: null,

    labelStyle: new ol.style.Style({

        text: new ol.style.Text({

            font: "bold 13px Segoe UI",

            fill: new ol.style.Fill({

                color: "#ffffff"

            }),

            backgroundFill: new ol.style.Fill({

                color: "#2563eb"

            }),

            padding: [4,6,4,6],

            overflow: true

        })

    })

};

// ===========================================
// INIT TOOLBAR
// ===========================================

function initTools(){

    document
        .getElementById("btnDistance")
        .addEventListener("click", function(){

            activateTool("distance");

        });

    document
        .getElementById("btnArea")
        .addEventListener("click", function(){

            activateTool("area");

        });

    document
        .getElementById("btnClearMeasure")
        .addEventListener("click", clearMeasure);

    console.log("GIS Toolbar Ready");

}

// ===========================================
// INIT MEASURE LAYER
// ===========================================

function initMeasureLayer(){

    App.measure.source =
        new ol.source.Vector();

    App.measure.layer =
        new ol.layer.Vector({

            source: App.measure.source,

            style: measureStyle,

            zIndex:999

        });

    App.map.addLayer(

        App.measure.layer

    );

}

// ===========================================
// STYLE
// ===========================================

function measureStyle(feature){

    const styles = [];

    styles.push(

        new ol.style.Style({

            stroke:new ol.style.Stroke({

                color:"#2563eb",

                width:3

            }),

            fill:new ol.style.Fill({

                color:"rgba(37,99,235,.15)"

            })

        })

    );

    if(feature.get("label")){

        App.measure.labelStyle
            .getText()
            .setText(

                feature.get("label")

            );

        styles.push(

            App.measure.labelStyle

        );

    }

    return styles;

}

// ===========================================
// ACTIVATE TOOL
// ===========================================

function activateTool(tool){

    App.tools.active = tool;

    document
        .querySelectorAll(".tool-btn")
        .forEach(btn=>{

            btn.classList.remove("active");

        });

    removeInteraction();

    switch(tool){

        case "distance":

            document
                .getElementById("btnDistance")
                .classList.add("active");

            startDistance();

            break;

        case "area":

            document
                .getElementById("btnArea")
                .classList.add("active");

            startArea();

            break;

    }

    console.log(

        "Active Tool :", tool

    );

}

// ===========================================
// REMOVE INTERACTION
// ===========================================

function removeInteraction(){

    if(App.measure.draw){

        App.map.removeInteraction(

            App.measure.draw

        );

        App.measure.draw = null;

    }

}

// ===========================================
// START DISTANCE
// ===========================================

function startDistance(){

    App.measure.draw = new ol.interaction.Draw({

        source: App.measure.source,

        type: "LineString"

    });

    App.map.addInteraction(

        App.measure.draw

    );

    App.measure.draw.on("drawend", function(e){

        const feature = e.feature;

        const length = ol.sphere.getLength(

            feature.getGeometry()

        );

        feature.set(

            "label",

            formatDistance(length)

        );

    });

}


// ===========================================
// START AREA
// ===========================================

function startArea(){

    App.measure.draw = new ol.interaction.Draw({

        source: App.measure.source,

        type: "Polygon"

    });

    App.map.addInteraction(

        App.measure.draw

    );

    App.measure.draw.on("drawend", function(e){

        const feature = e.feature;

        const area = ol.sphere.getArea(

            feature.getGeometry()

        );

        feature.set(

            "label",

            formatArea(area)

        );

    });

}


// ===========================================
// FORMAT DISTANCE
// ===========================================

function formatDistance(length){

    if(length < 1000){

        return length.toFixed(0) + " m";

    }

    return (length/1000).toFixed(2) + " km";

}


// ===========================================
// FORMAT AREA
// ===========================================

function formatArea(area){

    if(area < 10000){

        return area.toFixed(0) + " m²";

    }

    return (area/10000).toFixed(2) + " ha";

}


// ===========================================
// CLEAR MEASURE
// ===========================================

function clearMeasure(){

    removeInteraction();

    if(App.measure.source){

        App.measure.source.clear();

    }

    document
        .querySelectorAll(".tool-btn")
        .forEach(btn=>{

            btn.classList.remove("active");

        });

    App.tools.active = null;

    console.log(

        "Measurement Cleared"

    );

}


// ===========================================
// GET ACTIVE TOOL
// ===========================================

function getActiveTool(){

    return App.tools.active;

}


// ===========================================
// CHECK TOOL
// ===========================================

function isMeasureActive(){

    return App.measure.draw !== null;

}


// ===========================================
// RESET TOOLBAR
// ===========================================

function resetToolbar(){

    document
        .querySelectorAll(".tool-btn")
        .forEach(btn=>{

            btn.classList.remove("active");

        });

    App.tools.active = null;

}


// ===========================================
// READY
// ===========================================

console.log("=================================");
console.log("Tools Manager Loaded");
console.log("Distance Tool Ready");
console.log("Area Tool Ready");
console.log("Clear Tool Ready");
console.log("=================================");