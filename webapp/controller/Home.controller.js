sap.ui.define([
    "sap/ui/core/mvc/Controller",
], (Controller) => {
    "use strict";

    return Controller.extend("fioriapp.controller.Home", {

        onInit() {

        },
    
        onAfterRendering() {
            var sUrl4 = "/sap/opu/odata/sap/ZSAH_TEST_SRV/";
            var oModel = new sap.ui.model.odata.ODataModel(sUrl4, true);
            var sPathInquire = "InitialSet(IvCall='I')";
            oModel.read(sPathInquire, null, null, true,
                (success) => {
                    
                },
                (error) => {
                    console.error(error)
                }
            );
        },





    });
});