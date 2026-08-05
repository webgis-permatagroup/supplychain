async function init(){

    console.log("Initializing...");

    await loadAllData();

    initLayers();

    initSidebar();

    initTools();

    initMeasureLayer();
    
    initCoordinateLayer();

    initController();

    initBasemapController();

    initPopup();

    initSearch();

    buildSearchIndex();

    initMobileSidebar();

    console.log("Application Ready");

}


// ===========================================
// MOBILE SIDEBAR TOGGLE
// ===========================================
function initMobileSidebar(){

    const btn = document.getElementById("mobileMenuBtn");
    const sidebar = document.getElementById("sidebar");

    if(!btn || !sidebar) return;

    btn.addEventListener("click", function(){
        sidebar.classList.toggle("mobile-open");
    });
}


init();