sap.ui.define([
    "sap/ui/core/mvc/Controller",   
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("fioriapp.controller.Employees", {

        onItemPress(oEvent){
            const splitArray = oEvent.getParameters().listItem.sId.split("-");
            var empIdx = splitArray[splitArray.length - 1];
      
            
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("updateEmployeeform",{
                empIdx
            });
        },

        onSearch(oEvent){

            var value = oEvent.getParameter("newValue");
         
            var filter = new Filter("fullName",FilterOperator.Contains, value)

            var oTable =  this.byId("table");
            // applies the filter on the binding betwen table and model
            var oBinding = oTable.getBinding("items");
            oBinding.filter([filter])
            

        },

    });
});