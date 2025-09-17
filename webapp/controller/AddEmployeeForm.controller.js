sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], (Controller, JSONModel, MessageBox) => {
    "use strict";

    return Controller.extend("fioriapp.controller.AddEmployeeForm", {

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


        },

        onAfterRendering() {
            // let oDataModel = this.getView('Employees').getModel('EmployeesModel').getData();

            // oDataModel.push(oData)

            // this.getView('Employees').getModel('EmployeesModel').refresh();
        },

        onSubmit(oEvent) {
            try {
            var oSelectdepartment = this.byId('department')
            var departmentkey = oSelectdepartment.getSelectedKey();
            var oSelectdesignation = this.byId('designation')
            var designationKey = oSelectdesignation.getSelectedKey();

            let oData = {
                fullName: this.byId('inputName').getValue(),
                employeeId: this.byId('inputEmpId').getValue(),
                email: this.byId("inputEmail").getValue(),
                phoneNumber: this.byId('inputPhone').getValue(),
                joiningDate: this.byId('joinDate').getValue(),
                organisation: "TMC",
                address: this.byId("inputAddress").getValue(),
                designation: designationKey,
                department: departmentkey,
                salary: this.byId('inputSalary').getValue()
            }
            let oDataModel = this.getView().getModel("employeesModel").getData();
            oDataModel.push(oData)
            this.getView().getModel('employeesModel').refresh();

            MessageBox.success("Employee Added!")

            this.onReset();

            } catch (error) {
                console.error(error);
                MessageBox.error("Failed To Add Employee")
            }

        },

        onReset: function () {
            this.byId('inputName').setValue("");
            this.byId('inputEmpId').setValue("");
            this.byId("inputEmail").setValue("");
            this.byId('inputPhone').setValue("");
            this.byId('joinDate').setValue("");
            this.byId("inputAddress").setValue("");
            this.byId('inputSalary').setValue("");
            this.byId("department").setSelectedKey("");  
            this.byId("designation").setSelectedKey(""); 
        }




    });
});