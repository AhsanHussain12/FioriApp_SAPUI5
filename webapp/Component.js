sap.ui.define([
    "sap/ui/core/UIComponent",
    "fioriapp/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models,JSONModel) => {
    "use strict";

    return UIComponent.extend("fioriapp.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            // model set globally
            var sPath = sap.ui.require.toUrl("fioriapp/model/data.json");
            var oModel = new JSONModel();
            oModel.loadData(sPath);

            oModel.attachRequestCompleted(() => {
                console.log("Model data:", oModel.getData());
                const employees = oModel.getData().employees;
                this.setModel(new JSONModel(employees), "employeesModel");
            });
        }
    });
});