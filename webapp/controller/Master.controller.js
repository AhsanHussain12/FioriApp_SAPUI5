sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("fioriapp.controller.Master", {
        
        onInit: function() {

        },

        onItemPress(oEvent){
            var oItem = oEvent.getParameter("listItem")
            var splittedSid = oItem.sId.split("-");
            var detailPageType = splittedSid[splittedSid.length - 1]
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            
            switch (detailPageType) {
                case "1":
                    // console.log("Nav to Add EMP");
                    oRouter.navTo("addemployeesForm")
                    break;
                case "2":
                    // console.log("Nav to View EMP");
                    oRouter.navTo("employeesList")
                    break;
                case "3":
                    oRouter.navTo("default")
                    break;
                default:
                    break;
            }
        },

      

    });
});