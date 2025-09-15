// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
// ], (Controller,JSONModel) => {
//     "use strict";

//     return Controller.extend("fioriapp.controller.Main", {
        
//         onInit: function() {
 
//             var sPath = sap.ui.require.toUrl("fioriapp/model/data.json");
//             var oModel = new JSONModel();
//             oModel.loadData(sPath);

//             oModel.attachRequestCompleted(() => {
//                 console.log("Model data:", oModel.getData());
//                 const employees = oModel.getData().employees; // now you see employees
//                 this.getView().setModel(new JSONModel(employees), "EmployeesModel");
//             });
       
//         },

//         onAfterRendering: function () {

//             let selectModel = new JSONModel([
//                 { abb: "TMC", name: "Tally Mask Consulting" },
//                 { abb: "PGC", name: "Punjab Government College" }
//             ]);
//             this.oView.setModel(selectModel, "SelectModel");
//         },

//         onBtnPress: function (oEvent) {
//             // captures sid via event on button finds the row number by splitting btn id
//             //sets the data model and refreshes it
//             console.log(oEvent.oSource.sId);
      
//             const sourceSIDArray = oEvent.oSource.sId.split("-");
//             const modelIdx = sourceSIDArray[sourceSIDArray.length - 1];

//             let oData = this.getView().getModel('EmployeesModel').getData()[modelIdx];

//             oData.isEditable = !oData.isEditable;

//             this.getView().getModel('EmployeesModel').refresh();

//         },

//         onSubmit() {
//             // gets Input Values and appends to Model 
//             var oSelect = this.byId('select')
//             var sSelectedKey = oSelect.getSelectedKey();

//             let oData = {
//                 name: this.byId('inputName').getValue(),
//                 org: sSelectedKey ,
//                 field: this.byId('inputField').getValue(),
//                 isEditable: false,
//             }

//             console.log("DATA", oData)
            
//             let oDataModel = this.getView().getModel('EmployeesModel').getData();
            
//             oDataModel.push(oData)
            
//             this.getView().getModel('EmployeesModel').refresh();
//         },

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


//         }

//     });
// });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("fioriapp.controller.Master", {
        
        onInit: function() {
            // var sPath = sap.ui.require.toUrl("fioriapp/model/options.json");
            // var oModel = new JSONModel();
            // oModel.loadData(sPath);

            // oModel.attachRequestCompleted(() => {
            //     console.log("Model data:", oModel.getData());
            //     const options = oModel.getData().options;
            //     this.getView().setModel(new JSONModel(options), "optionsModel");
            // });
        },

        onAddEmployee(){
            console.log("triggering navigation")
        },

        onViewAllEmployees(){
            console.log("triggering navigation")
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("employeesList")
        }

    });
});