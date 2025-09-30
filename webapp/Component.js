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

            // binding the model in Component.js gives us access to this model in all views,     
            // var sPath = sap.ui.require.toUrl("fioriapp/model/data.json");
            // var oModel = new JSONModel();
            // oModel.loadData(sPath);

            // oModel.attachRequestCompleted(() => {
            //     console.log("Model data:", oModel.getData());
            //     const employees = oModel.getData().employees;
            //     this.setModel(new JSONModel(employees), "employeesModel");
            // });

            var sUrl4 = "/sap/opu/odata/sap/ZSAH_TEST_SRV/";
            var oModel = new sap.ui.model.odata.ODataModel(sUrl4, true);
            var sPathInquire = "InitialSet(IvCall='I')";
            oModel.read(sPathInquire, null, null, true,
                (success) => {
                  const employeesModel =  JSON.parse(success.EvJson);
                  this.setModel(new JSONModel(employeesModel),"employeesModel");
                  console.log(this.getModel("employeesModel").getData())
                },
                (error) => {
                    console.error(error)
                }
            );
        }
    });
});