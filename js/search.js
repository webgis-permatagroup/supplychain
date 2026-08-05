// ===========================================
// SEARCH MANAGER
// ===========================================

function initSearch(){

    const input = document.getElementById("search-input");
    const clear = document.getElementById("search-clear");

    input.addEventListener("input", function(){

        const value = this.value.trim();

        if(isCoordinate(value)){
            showSearchResult([]);
            return;
        }

        searchFeature(value);

    });

    input.addEventListener("keydown", function(e){

        if(e.key !== "Enter") return;

        const value = this.value.trim();

        if(isCoordinate(value)){

            e.preventDefault();

            searchCoordinate(value);

        }

    });

    clear.addEventListener("click", function(){

    input.value="";

    showSearchResult([]);

    App.coordinateSearch.source.clear();

    input.focus();

});

}


// ===========================================
// BUILD SEARCH INDEX
// ===========================================

function buildSearchIndex(){

    App.search.index = [];

    // =====================================
    // PERMATA
    // =====================================

    App.sources.permata.getFeatures().forEach(feature=>{

        const p = feature.getProperties();

        App.search.index.push({

            feature: feature,
            layer: "permata",

            title: p["Mill Name"] || "",

            province: p["Province"] || "",

            regency: p["Regency"] || ""

        });

    });

    // =====================================
    // SUPPLIER
    // =====================================

    App.sources.supplier.getFeatures().forEach(feature=>{

        const p = feature.getProperties();

        App.search.index.push({

            feature: feature,
            layer: "supplier",

            title: p["Mill Name"] || "",

            province: p["Province"] || "",

            regency: p["Regency"] || "",

            phgId: p["PHG ID"] || "",
            
            supplierN: p["Supplier N"] || ""

            

        });

    });

    console.log("Search Index :", App.search.index.length);

}


// ===========================================
// SEARCH FEATURE
// ===========================================

function searchFeature(keyword){

    keyword = keyword.toLowerCase().trim();

    if(keyword.length === 0){
        showSearchResult([]);
        return;
    }

    // Filter data
    const filtered = App.search.index.filter(item => {

        return (
            (item.title || "").toLowerCase().includes(keyword) ||
            (item.province || "").toLowerCase().includes(keyword) ||
            (item.regency || "").toLowerCase().includes(keyword) ||
            (item.phgId || "").toString().toLowerCase().includes(keyword) ||
            (item.supplierN || "").toString().toLowerCase().includes(keyword)
        );

    });

    // Hilangkan duplikat nama mill
    const uniqueMap = new Map();

    filtered.forEach(item => {

        const key = item.title.toLowerCase();

        if(!uniqueMap.has(key)){
            uniqueMap.set(key,item);
        }

    });

    const result = Array.from(uniqueMap.values());

    showSearchResult(result.slice(0,10));
}


// ===========================================
// SHOW SEARCH RESULT
// ===========================================

function showSearchResult(result){

    const div = document.getElementById("search-result");

    div.innerHTML = "";

    result.forEach(item=>{

        const row = document.createElement("div");

        row.className = "search-item";

        row.innerHTML = `

            <b>${getLayerIcon(item.layer)} ${item.title}</b>

            <br>

            <small>${item.regency}, ${item.province}</small>

        `;

        row.addEventListener("click", function(){

            zoomToSearch(item);

        });

        div.appendChild(row);

    });

}


// ===========================================
// LAYER ICON
// ===========================================

function getLayerIcon(layer){

    switch(layer){

        case "permata":
            return "🏭";

        case "supplier":
            return "🔵";

        default:
            return "📍";

    }

}


// ===========================================
// ZOOM TO SEARCH
// ===========================================

function zoomToSearch(item){

    const geometry = item.feature.getGeometry();

    // Zoom ke feature
    App.view.fit(
        geometry,
        {
            duration: 800,
            maxZoom: 14,
            padding: [100,100,100,100]
        }
    );

    // Buka popup otomatis
    showPopup(item.feature);

    // Bersihkan hasil pencarian
    showSearchResult([]);

    // Kosongkan input
    document.getElementById("search-input").value = "";

    // Update footer
    setStatus("Selected : " + item.title);

}

// ===========================================
// SEARCH COORDINATE
// Sprint 4B-3A
// ===========================================

function isCoordinate(text){

    if(!text){

        return false;

    }

    text = text.trim();

    const pattern =

        /^-?\d+(\.\d+)?\s*[,; ]\s*-?\d+(\.\d+)?$/;

    return pattern.test(text);

}

// ===========================================

function parseCoordinate(text){

    text = text.trim();

    // pisahkan dengan koma, titik koma, atau spasi
    const value = text.split(/[,\s;]+/);

    if(value.length < 2){

        return null;

    }

    let a = parseFloat(value[0]);

    let b = parseFloat(value[1]);

    let lat;
    let lon;

    if(Math.abs(a)<=90 && Math.abs(b)<=180){

        lat = a;
        lon = b;

    }else{

        lat = b;
        lon = a;

    }

    return {

        lat: lat,

        lon: lon

    };

}

console.log(

    isCoordinate("1.345,101.234")

);

console.log(

    parseCoordinate("1.345,101.234")

);


// ===========================================
// SEARCH COORDINATE
// ===========================================
function searchCoordinate(text){

    const coord = parseCoordinate(text);

    if(!coord) return;

    const point = ol.proj.fromLonLat([
        coord.lon,
        coord.lat
    ]);

    // Zoom ke lokasi
    App.view.animate({
        center: point,
        zoom: 16,
        duration: 800
    });

    // Tampilkan marker
    showCoordinateMarker(coord.lat, coord.lon);

    // Status
    setStatus(
        "Coordinate : " +
        coord.lat +
        ", " +
        coord.lon
    );

}

// ===========================================
// ZOOM TO COORDINATE
// ===========================================

function zoomCoordinate(lat, lon){

    const coordinate = ol.proj.fromLonLat([lon,lat]);

    App.view.animate({
        center: coordinate,
        zoom: 16,
        duration: 800
    });

    showCoordinateMarker(lat, lon);

}

// ===========================================
// COORDINATE LAYER
// ===========================================

function initCoordinateLayer(){

    App.coordinateSearch.source = new ol.source.Vector();

    App.coordinateSearch.layer = new ol.layer.Vector({

        source: App.coordinateSearch.source,

        zIndex:1000,

        style:new ol.style.Style({

            image:new ol.style.Circle({

                radius:8,

                fill:new ol.style.Fill({

                    color:'#ff9800'

                }),

                stroke:new ol.style.Stroke({

                    color:"#ffffff",

                    width:2

                })

            })

        })

    });

    App.map.addLayer(App.coordinateSearch.layer);

}

// ===========================================
// SHOW COORDINATE MARKER
// ===========================================

function showCoordinateMarker(lat,lon){

    App.coordinateSearch.source.clear();

    const feature = new ol.Feature({

        geometry:new ol.geom.Point(

            ol.proj.fromLonLat([lon,lat])

        )

    });

    App.coordinateSearch.source.addFeature(feature);

}

// ===========================================

console.log("Search Manager Loaded");