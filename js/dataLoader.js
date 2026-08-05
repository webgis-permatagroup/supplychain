// ===========================================
// DATA LOADER
// ===========================================

async function loadGeoJSON(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Gagal memuat ${url}`);
    }

    return await response.json();

}

async function loadAllData() {

    console.log("Loading GeoJSON...");

    App.data.permata = await loadGeoJSON("data/PermataGroupMill.geojson");

    App.data.supplier = await loadGeoJSON("data/SupplierMill.geojson");

    App.data.protectedArea = await loadGeoJSON("data/ProtectedArea.geojson");

    console.log("Permata :", App.data.permata.features.length);

    console.log("Supplier :", App.data.supplier.features.length);

    console.log("Protected :", App.data.protectedArea.features.length);

}