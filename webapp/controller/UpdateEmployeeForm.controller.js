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
            console.log(employeesModel[idx]);
            this.getView().setModel(new JSONModel(employeesModel[idx]), "oData")
        },

        onSave(oEvent) {
            try {
                var oSelectdepartment = this.byId('updatedDepartment')
                var departmentkey = oSelectdepartment.getSelectedKey();
                var oSelectdesignation = this.byId('updatedDesignation')
                var designationKey = oSelectdesignation.getSelectedKey();

                let oData = {
                    fullName: this.byId('updatedName').getValue(),
                    employeeId: this.byId('empId').getValue(),
                    email: this.byId("updatedEmail").getValue(),
                    phoneNumber: this.byId('updatedPhone').getValue(),
                    joiningDate: this.byId('updatedJoindate').getValue(),
                    organisation: "TMC",
                    address: this.byId("updatedAddress").getValue(),
                    designation: designationKey,
                    department: departmentkey,
                    salary: this.byId('updatedSalary').getValue()
                }

                let oDataModel = this.getView().getModel("employeesModel").getData();
                const employee = oDataModel.find((data) => data.employeeId === oData.employeeId)
                if (employee) {
                    Object.assign(employee, oData); // instead of manually updating all properties
                    this.getView().getModel("employeesModel").refresh();
                    MessageBox.success("Employee Updated!");
                    onToggleEdit();
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("employeesList")
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
            var current = oModel.getProperty("/isEditable");
            oModel.setProperty("/isEditable", !current);
        },

        onDelete() {
            try {
                let oDataModel = this.getView().getModel("employeesModel").getData();
            } catch (error) {
                
            }
        }




    });
});