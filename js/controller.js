// ===========================================
// BASEMAP CONTROLLER
// ===========================================

function initBasemapController() {

    const radios = document.querySelectorAll(
        "input[name='basemap']"
    );

    radios.forEach(radio => {

        radio.addEventListener("change", function(){

            Object.values(App.baseMaps).forEach(layer => {

                layer.setVisible(false);

            });

            App.baseMaps[this.value].setVisible(true);

            console.log("Basemap :", this.value);

        });

    });

}


// ===========================================
// LAYER CONTROLLER
// ===========================================

function initController(){

    console.log("Controller initialized");

    // ===================================
    // PERMATA
    // ===================================

    document
        .getElementById("chkPermata")
        .addEventListener("change", function(){

            App.layers.permata.setVisible(this.checked);

            updateLegend();

        });

    // ===================================
    // SUPPLIER
    // ===================================

    document
        .getElementById("chkSupplier")
        .addEventListener("change", function(){

            App.layers.supplier.setVisible(this.checked);

            updateLegend();

        });

    // ===================================
    // PROTECTED
    // ===================================

    document
        .getElementById("chkProtected")
        .addEventListener("change", function(){

            App.layers.protectedArea.setVisible(this.checked);

            updateLegend();

        });

}

console.log("Controller Loaded");