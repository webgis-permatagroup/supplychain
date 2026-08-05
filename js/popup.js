// ===========================================
// POPUP MANAGER V1
// ===========================================

App.popup = null;
App.popupElement = null;
App.popupTitle = null;
App.popupBody = null;

// ===========================================
// INIT
// ===========================================

function initPopup() {

    App.popupElement = document.getElementById("popup");

    App.popupTitle = document.getElementById("popup-title");

    App.popupBody = document.getElementById("popup-body");

    App.popup = new ol.Overlay({

        element: App.popupElement,

        autoPan: {
            animation: {
                duration: 300
            }
        }

    });

    App.map.addOverlay(App.popup);

    App.map.on("singleclick", onPopupClick);

    document
        .getElementById("popup-close")
        .addEventListener("click", closePopup);

    console.log("Popup Manager Ready");

}

// ===========================================
// CLICK MAP
// ===========================================

function onPopupClick(evt) {

    const feature = App.map.forEachFeatureAtPixel(

        evt.pixel,

        feature => feature

    );

    if (!feature) {

        closePopup();

        return;

    }

    // ======================================
    // Hanya layer yang memiliki layerType
    // ======================================

    const layerType = feature.get("layerType");

    if(!layerType){

        closePopup();

        return;

    }

    openPopup(feature, evt.coordinate);

}

// ===========================================
// OPEN POPUP
// ===========================================

function openPopup(feature, coordinate) {

    if(feature.get("layerType")==="permata"){

    highlightPermata(feature);

}

    const layerType = feature.get("layerType");

    App.popupTitle.innerHTML = getPopupTitle(layerType);

    App.popupBody.innerHTML = buildPopup(feature);

    App.popup.setPosition(coordinate);

    App.popupElement.style.display = "block";

    // ===========================================
    // Popup Action
    // ===========================================

    initPopupAction(feature);

}

// ===========================================
// SHOW POPUP (dipanggil dari Search)
// ===========================================

function showPopup(feature){

    const coordinate = feature.getGeometry().getClosestPoint(
        App.view.getCenter()
    );

    openPopup(feature, coordinate);

}

// ===========================================
// CLOSE
// ===========================================

function closePopup() {

    App.popup.setPosition(undefined);

    App.popupElement.style.display = "none";

}

// ===========================================
// TITLE
// ===========================================

function getPopupTitle(layerType) {

    switch (layerType) {

        case "permata":
            return "🏭 Permata Group Facilities";

        case "supplier":
            return "🔵 Supplier Mills";

        case "protected":
            return "🌳 Protected Area";

        default:
            return "Information";

    }

}

// ===========================================
// BUILD HTML
// ===========================================

function buildPopup(feature) {

    switch (feature.get("layerType")) {

        case "permata":
            return buildPermata(feature);

        case "supplier":
            return buildSupplier(feature);

        case "protected":
            return buildProtected(feature);

        default:
            return "<p>Tidak ada data.</p>";

    }

}

// ===========================================
// PERMATA
// ===========================================

function buildPermata(feature) {

    const p = feature.getProperties();

    return `

<table class="popup-table">

<tr>
<td class="popup-label">Facility</td>
<td class="popup-value">${p["Mill Name"]}</td>
</tr>

<tr>
<td class="popup-label">Province</td>
<td class="popup-value">${p["Province"]}</td>
</tr>

<tr>
<td class="popup-label">Regency</td>
<td class="popup-value">${p["Regency"]}</td>
</tr>

<tr>
<td class="popup-label">Latitude</td>
<td class="popup-value">${p["Latitude"]}</td>
</tr>

<tr>
<td class="popup-label">Longitude</td>
<td class="popup-value">${p["Longitude"]}</td>
</tr>

</table>

<div class="popup-action">

<button id="btnSupplyBase">

🔍 Supply Base

</button>

<button id="btnZoom">

📍 Zoom To

</button>

<button id="btnGoogle">

🌍 Maps

</button>

</div>

`;

}

// ===========================================
// SUPPLIER
// ===========================================

// ===========================================
// SUPPLIER (DYNAMIC)
// ===========================================

// ===========================================
// SUPPLIER POPUP
// ===========================================

function buildSupplier(feature){

    const p = feature.getProperties();

    const fields = [

        "PHG ID",
        "Supplier N",
        "Mill Name",
        "Group",
        "Latitude",
        "Longitude",
        "UML ID"

    ];

    let html = '<table class="popup-table">';

    fields.forEach(field => {

        let value = p[field];

        if(value === undefined || value === null || value === ""){
            value = "-";
        }

        html += `
            <tr>
                <td class="popup-label">${field}</td>
                <td class="popup-value">${value}</td>
            </tr>
        `;

    });

    html += "</table>";

    return html;

}

// ===========================================
// PROTECTED
// ===========================================

function buildProtected(feature) {

    const p = feature.getProperties();

    return `

<table class="popup-table">

<tr>

<td class="popup-label">Category</td>

<td class="popup-value">${p["N_Kawasan"]}</td>

</tr>

<tr>

<td class="popup-label">SK</td>

<td class="popup-value">${p["No_SK"]}</td>

</tr>

<tr>

<td class="popup-label">Date</td>

<td class="popup-value">${p["Tgl_SK"]}</td>

</tr>

</table>

`;

}

// ===========================================
// POPUP ACTION
// ===========================================

function initPopupAction(feature){

    // ===========================
    // SUPPLY BASE
    // ===========================

    const btnSupplyBase = document.getElementById("btnSupplyBase");

    if(btnSupplyBase){

        btnSupplyBase.onclick = function(){

            const millName = feature.get("Mill Name");

            filterSupplierByMill(millName);

        };

    }

    // ===========================
    // ZOOM
    // ===========================

    const btnZoom = document.getElementById("btnZoom");

if(btnZoom){

    btnZoom.onclick = function(){

        const coordinate = feature.getGeometry().getCoordinates();
        const currentZoom = App.view.getZoom();

        // Jika sudah dekat, tambah 2 level
        // Jika masih jauh, langsung ke 16
        let targetZoom;

        if(currentZoom >= 15){
            targetZoom = currentZoom + 2;
        }else{
            targetZoom = 16;
        }

        targetZoom = Math.min(targetZoom, 19);

        App.view.animate({
            center: coordinate,
            zoom: targetZoom,
            duration: 600
        });

    };

}

    // ===========================
    // GOOGLE MAPS
    // ===========================

    const btnGoogle = document.getElementById("btnGoogle");

    if(btnGoogle){

        btnGoogle.onclick = function(){

            const coord = ol.proj.toLonLat(

                feature.getGeometry().getCoordinates()

            );

            const url =

                "https://www.google.com/maps?q=" +

                coord[1] +

                "," +

                coord[0];

            window.open(url, "_blank");

        };

    }

}