

//         onDelete(oEvent) {
//             //for seprate btn at each record
//             // const sourceSIDArray = oEvent.oSource.sId.split("-");
//             // const recordIndex = sourceSIDArray[sourceSIDArray.length - 1];

//             // for event propagation at parent element like table
//             // add mode delete in table
//             const sourceSid = oEvent.mParameters.listItem.sId.split("-");
//             const recordIndex = sourceSid[sourceSid.length - 1];
//             if (recordIndex > -1) {
//                 // remove a single element at index using splice(Idx,No of Elements)
//                 this.getView().getModel('EmployeesModel').getData().splice(recordIndex, 1);
//                 this.getView().getModel('EmployeesModel').refresh();
//             }



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
                default:
                    break;
            }
        },

      

    });
});