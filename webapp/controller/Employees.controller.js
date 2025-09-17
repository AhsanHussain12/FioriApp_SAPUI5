sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("fioriapp.controller.Employees", {

        onItemPress(oEvent){
            const splitArray = oEvent.getParameters().listItem.sId.split("-");
            var empIdx = splitArray[splitArray.length - 1];
      
            
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("updateEmployeeform",{
                empIdx
            });
        }

    });
});