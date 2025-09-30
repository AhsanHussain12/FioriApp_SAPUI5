sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], (Controller, JSONModel, MessageBox) => {
    "use strict";

    return Controller.extend("fioriapp.controller.UpdateEmployeeForm", {

        onInit: function () {

            var sDesignationModelPath = sap.ui.require.toUrl("fioriapp/model/designation.json");
            var oDesignationModel = new JSONModel();
            oDesignationModel.loadData(sDesignationModelPath);

            oDesignationModel.attachRequestCompleted(() => {
                console.log("Model data:", oDesignationModel.getData());
                const designations = oDesignationModel.getData().designations;
                this.getView().setModel(new JSONModel(designations), "DesignationModel");
            });

            var sDepartmentModelPath = sap.ui.require.toUrl("fioriapp/model/department.json");
            var oDepartmentModel = new JSONModel();
            oDepartmentModel.loadData(sDepartmentModelPath);

            oDepartmentModel.attachRequestCompleted(() => {
                console.log("Model data:", oDepartmentModel.getData());
                const Departments = oDepartmentModel.getData().departments;
                this.getView().setModel(new JSONModel(Departments), "DepartmentModel");
            });

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("updateEmployeeform").attachMatched(this.getEmpIdx, this);


            this.getView().setModel(new JSONModel({ isEditable: false }), "ToggleEditableModel");

        },

        getEmpIdx(oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var idx = oArgs.empIdx;
            console.log("empIdx:", idx);
            const employeesModel = this.getView().getModel("employeesModel").getData();
            if (!employeesModel[idx]) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("employeesList")
            }
            this.getView().setModel(new JSONModel(employeesModel[idx]), "oData")
        },

        onSave() {
            try {
                var oSelectdepartment = this.byId('updatedDepartment')
                var departmentkey = oSelectdepartment.getSelectedKey();
                var oSelectdesignation = this.byId('updatedDesignation')
                var designationKey = oSelectdesignation.getSelectedKey();

                let oData = {
                    ZFULLNAME: this.byId('updatedName').getValue(),
                    ZEMPLOYEEID: this.byId('empId').getValue(),
                    ZEMAIL: this.byId("updatedEmail").getValue(),
                    ZPHONENUMBER: this.byId('updatedPhone').getValue(),
                    ZJOININGDATE: this.byId('updatedJoindate').getValue(),
                    ZORGANISATION: "TMC",
                    ZADDRESS: this.byId("updatedAddress").getValue(),
                    ZDESIGNATION: designationKey,
                    ZDEPARTMENT: departmentkey,
                    ZSALARY: this.byId('updatedSalary').getValue()
                };

                let oDataModel = this.getView().getModel("employeesModel").getData();

                const employee = oDataModel.find((data) => data.ZEMPLOYEEID === oData.ZEMPLOYEEID);

                if (employee) {
                    // instead of manually updating all properties one by one
                    Object.assign(employee, oData);
                    this.getView().getModel("employeesModel").refresh();

                    this.onToggleEdit();
                    MessageBox.success("Employee Updated!");
                }
                else {
                    throw new Error("Employee Record Not Found")
                }

            } catch (error) {
                console.error(error);
                MessageBox.error("Failed To Update Employee")
            }

        },

        onToggleEdit() {
            var oModel = this.getView().getModel("ToggleEditableModel");
            // example of 2-way binding no need to manually refresh the model
            // as when binding observers/listeners are setup the auto updates contorl 
            // properties
            var current = oModel.getProperty("/isEditable");
            oModel.setProperty("/isEditable", !current);
        },

        onDelete() {
            try {

                let employeesModel = this.getView().getModel("employeesModel").getData();
                const idx = employeesModel.findIndex(emp => emp.ZEMPLOYEEID === this.byId('empId').getValue());
                if (idx > -1) {
                    employeesModel.splice(idx, 1);
                    this.getView().getModel("employeesModel").refresh();
                    MessageBox.success("Employee Deleted");
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("employeesList")

                }
                else {
                    throw new Error("Invalid index")
                }

            } catch (error) {
                console.error(error);
                MessageBox.error("Failed To Delete Employee")
            }
        },

        onNavBack: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("employeesList")
        }



    });
});