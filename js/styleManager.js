// ===========================================
// STYLE MANAGER
// ===========================================

const Styles = {

   // =======================================
// PERMATA GROUP MILL
// =======================================

permata: function(feature){

    const selected = feature.get("selected");

    // ===================================
    // ICON FACTORY (🏭)
    // ===================================

    function createEmojiIcon(emoji, size){

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        ctx.font = (size - 4) + "px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(emoji, size / 2, size / 2 + 1);

        return canvas;
    }

    // ===================================
    // SELECTED FEATURE
    // ===================================

    if(selected){

        return new ol.style.Style({

            image: new ol.style.Icon({
                img: createEmojiIcon("🏭", 40),
                imgSize: [40,40],
                anchor: [0.5,0.5]
            })

        });
    }

    // ===================================
    // NORMAL FEATURE
    // ===================================

    return new ol.style.Style({

        image: new ol.style.Icon({
            img: createEmojiIcon("🏭", 25),
            imgSize: [25,25],
            anchor: [0.5,0.5]
        })

    });

}, 


    // =======================================
// SUPPLIER MILL
// =======================================

supplier: function(feature){

    // ===================================
    // FILTER
    // ===================================

    if(feature.get("visible") === false){

        return null;

    }

    return new ol.style.Style({

        image: new ol.style.Circle({

            radius: 4,

            fill: new ol.style.Fill({
                color: "#1976d2"
            }),

            stroke: new ol.style.Stroke({
                color: "#ffffff",
                width: 1
            })

        })

    });

},


   // =======================================
// PROTECTED AREA
// =======================================

protectedArea: function(feature){

    const kawasan = feature.get("N_Kawasan");

    // ===================================
    // HUTAN LINDUNG
    // ===================================

    if(kawasan === "Hutan Lindung"){

        return new ol.style.Style({

            fill: new ol.style.Fill({
                color: "#2E7D32"
            }),

            stroke: new ol.style.Stroke({
                color: "#1B5E20",
                width: 2
            })

        });

    }

    // ===================================
    // KAWASAN KONSERVASI
    // ===================================

    if(kawasan === "Kawasan Konservasi"){

        return new ol.style.Style({

            fill: new ol.style.Fill({
                color: "#8E24AA"
            }),

            stroke: new ol.style.Stroke({
                color: "#6A1B9A",
                width: 2
            })

        });

    }

    // ===================================
    // DEFAULT
    // ===================================

    return new ol.style.Style({

        fill: new ol.style.Fill({
            color: "#9E9E9E"
        }),

        stroke: new ol.style.Stroke({
            color: "#616161",
            width: 1
        })

    });

}

};

console.log("StyleManager Loaded");