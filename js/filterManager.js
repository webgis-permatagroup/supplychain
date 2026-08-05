// ===========================================
// FILTER MANAGER
// ===========================================
//
// Sprint 3A
// Permata Group WebGIS
//
// Fungsi :
// 1. Filter Supplier berdasarkan Mill Permata
// 2. Reset Filter
// 3. Zoom ke Supplier hasil filter
// 4. Update Supply Base Panel
//
// ===========================================


// ===========================================
// FILTER STATE
// ===========================================

App.filter = {

    activeMill: null,

    supplierCount: 0,

    cpoCount: 0,

    pkCount: 0,

    traderCount: 0

};


// ===========================================
// FILTER SUPPLIER BY MILL
// ===========================================

function filterSupplierByMill(millName){

    console.log("=================================");
    console.log("Supply Base Filter");
    console.log("Permata Mill :", millName);
    console.log("=================================");

    App.filter.activeMill = millName;

    // ===========================================
    // HITUNG TANPA DOUBLE COUNTING
    // Berdasarkan kolom Supplier
    // ===========================================

    // Hitung berdasarkan PHG ID unik
        const cpoPHGSet = new Set();
        const pkPHGSet = new Set();
        const traderSet = new Set();

    App.sources.supplier.getFeatures().forEach(feature => {

        const supplierName = (feature.get("Supplier") || "").trim();
        const phgId = (feature.get("PHG ID") || "").trim();
        const commodity = (feature.get("Commodity") || "").trim();
        const trader = (feature.get("Trader") || "").trim();

        // Supplier harus sama dengan mill Permata yang diklik
        const visible = supplierName === millName;

        feature.set("visible", visible);

        if(visible){

            // CPO unik berdasarkan PHG ID
                if(commodity === "CPO" && phgId !== ""){
                cpoPHGSet.add(phgId);
            }

            // PK unik berdasarkan PHG ID
                if(commodity === "PK" && phgId !== ""){
                 pkPHGSet.add(phgId);
            }

            // Trader unik
            if(trader !== ""){
                traderSet.add(trader);
            }
        }
    });

    const totalCPO = cpoPHGSet.size;
    const totalPK = pkPHGSet.size;
    const totalTrader = traderSet.size;

    // Simpan state
    App.filter.cpoCount = totalCPO;
    App.filter.pkCount = totalPK;
    App.filter.traderCount = totalTrader;

    // Refresh layer
    App.layers.supplier.changed();

    // Update panel kiri
    updateSupplyBasePanel(
        millName,
        totalCPO,
        totalPK,
        totalTrader
    );

    console.log("CPO :", totalCPO);
    console.log("PK :", totalPK);
    console.log("Trader :", totalTrader);

    // Zoom ke hasil filter
    zoomToFilteredSupplier();
}

    console.log("CPO :", totalCPO);
    console.log("PK :", totalPK);
    console.log("Trader :", totalTrader);





// ===========================================
// RESET FILTER
// ===========================================

function resetSupplierFilter(){

    console.log("Reset Supplier Filter");

    App.filter.activeMill = null;

    App.sources.supplier.getFeatures().forEach(feature=>{
        feature.set("visible", true);
    });

    App.layers.supplier.changed();

    // ===========================================
    // HITUNG GLOBAL TANPA DOUBLE COUNTING
    // ===========================================

    // ===========================================
// HITUNG GLOBAL TANPA DOUBLE COUNTING
// ===========================================

const cpoPHGSet = new Set();
const pkPHGSet = new Set();
const traderSet = new Set();

App.sources.supplier.getFeatures().forEach(feature => {

    const phgId = (feature.get("PHG ID") || "").trim();
    const commodity = (feature.get("Commodity") || "").trim();
    const trader = (feature.get("Trader") || "").trim();

    // PHG ID unik untuk CPO
    if(commodity === "CPO" && phgId !== ""){
        cpoPHGSet.add(phgId);
    }

    // PHG ID unik untuk PK
    if(commodity === "PK" && phgId !== ""){
        pkPHGSet.add(phgId);
    }

    // Trader unik
    if(trader !== ""){
        traderSet.add(trader);
    }
});

const totalCPO = cpoPHGSet.size;
const totalPK = pkPHGSet.size;
const totalTrader = traderSet.size;

updateSupplyBasePanel(
    "-",
    totalCPO,
    totalPK,
    totalTrader
);

}



// ===========================================
// GET ACTIVE MILL
// ===========================================

function getActiveMill(){

    return App.filter.activeMill;

}



// ===========================================
// CHECK FILTER
// ===========================================

function isFilterActive(){

    return App.filter.activeMill !== null;

}



// ===========================================
// GET SUPPLIER COUNT
// ===========================================

function getSupplierCount(){

    return App.filter.supplierCount;

}



// ===========================================
// GET CPO COUNT
// ===========================================

function getCPOCount(){

    return App.filter.cpoCount;

}



// ===========================================
// GET PK COUNT
// ===========================================

function getPKCount(){

    return App.filter.pkCount;

}


// ===========================================
// ZOOM TO FILTERED SUPPLIER
// ===========================================

function zoomToFilteredSupplier(){

    const features = App.sources.supplier.getFeatures().filter(feature => {
        return feature.get("visible") === true;
    });

    // Jika tidak ada hasil filter, keluar
    if(features.length === 0){
        return;
    }

    // Buat extent gabungan
    let extent = ol.extent.createEmpty();

    features.forEach(feature => {
        ol.extent.extend(extent, feature.getGeometry().getExtent());
    });

    // Zoom ke seluruh supplier hasil filter
    App.view.fit(extent, {
        padding: [120,120,120,120],
        duration: 1000,
        maxZoom: 12
    });
}


console.log("Filter Manager Loaded");