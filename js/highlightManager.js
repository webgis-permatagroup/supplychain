// ===========================================
// HIGHLIGHT MANAGER
// Sprint 3B
// ===========================================

function highlightPermata(featureSelected){

    App.sources.permata.getFeatures().forEach(feature=>{

        feature.set("selected",false);

    });

    featureSelected.set("selected",true);

    App.layers.permata.changed();

}