// ===========================================
// SIDEBAR
// ===========================================

function initSidebar(){

    createBasemapList();

    createLayerList();

    createLegend();

    updateLegend();

    createSupplyBasePanel();

    // ===================================
    // RESET FILTER BUTTON
    // ===================================

    document
        .getElementById("btnResetFilter")
        .addEventListener("click", function(){

            resetSupplierFilter();

        });

}



// ===========================================
// SUPPLY BASE PANEL
// ===========================================

function createSupplyBasePanel(){

    document.getElementById("supplybase-panel").innerHTML = `

    <div class="sb-row">
        <div class="sb-label">Facility</div>
        <div id="sb-mill">-</div>
    </div>

    <div class="sb-row">
        <div class="sb-label">CPO</div>
        <div id="sb-cpo">0</div>
    </div>

    <div class="sb-row">
        <div class="sb-label">PK</div>
        <div id="sb-pk">0</div>
    </div>

    <div class="sb-row">
        <div class="sb-label">Traders</div>
        <div id="sb-trader">0</div>
    </div>

    <button id="btnResetFilter">
        Reset Filter
    </button>

    `;
}


// ===========================================
// UPDATE PANEL
// ===========================================

function updateSupplyBasePanel(
    mill,
    cpo,
    pk,
    trader
){

    document.getElementById("sb-mill").textContent = mill || "-";
    document.getElementById("sb-cpo").textContent = cpo || 0;
    document.getElementById("sb-pk").textContent = pk || 0;
    document.getElementById("sb-trader").textContent = trader || 0;
}


// ===========================================
// BASEMAP
// ===========================================

function createBasemapList(){

    document.getElementById("basemap-list").innerHTML = `

<label>
<input
type="radio"
name="basemap"
value="osm"
checked>
OpenStreetMap
</label>

<label>
<input
type="radio"
name="basemap"
value="satellite">
Esri Satellite
</label>

<label>
<input
type="radio"
name="basemap"
value="googleSatellite">
Google Satellite
</label>

<label>
<input
type="radio"
name="basemap"
value="googleHybrid">
Google Hybrid
</label>

`;

}



// ===========================================
// LAYER
// ===========================================

function createLayerList(){

    document.getElementById("layer-list").innerHTML = `

<label>
<input type="checkbox" id="chkPermata">
Permata Group Facilities
</label>

<label>
<input type="checkbox" id="chkSupplier">
Supplier Mills
</label>

<label>
<input type="checkbox" id="chkProtected">
Protected Area
</label>

`;

}



// ===========================================
// LEGEND
// ===========================================

function createLegend(){

    document.getElementById("legend").innerHTML = `

<div>🏭 Permata Group Facilities</div>

<div>🔵 Supplier Mills</div>

<div>🟢 Hutan Lindung</div>

<div>🟣 Kawasan Konservasi</div>

`;

}

// ===========================================
// DYNAMIC LEGEND
// Sprint UI-5
// ===========================================

function updateLegend(){

    const legend = document.getElementById("legend");

    legend.innerHTML = "";

    // ===============================
    // PERMATA
    // ===============================

    if(App.layers.permata.getVisible()){

        addLegendItem(
            "🏭",
            "Permata Group Facilities",
            true
        );

    }

    // ===============================
    // SUPPLIER
    // ===============================

    if(App.layers.supplier.getVisible()){

        addLegendItem(

            "#1976d2",

            "Supplier Mills"

        );

    }

    // ===============================
    // PROTECTED
    // ===============================

    if(App.layers.protectedArea.getVisible()){

        addLegendItem(

            "#2e7d32",

            "Protected Forest"

        );

        addLegendItem(

            "#7b1fa2",

            "Conservation Area"

        );

    }

}

function addLegendItem(symbol, text, isEmoji = false){

    const legend = document.getElementById("legend");
    const row = document.createElement("div");
    row.className = "legend-item";

    if(isEmoji){

        row.innerHTML = `
            <span class="legend-emoji">${symbol}</span>
            <span>${text}</span>
        `;

    }else{

        row.innerHTML = `
            <span class="legend-color" style="background:${symbol};"></span>
            <span>${text}</span>
        `;

    }

    legend.appendChild(row);
}

console.log("Sidebar Loaded");