sap.ui.define([
    "sap/ui/core/mvc/Controller",
], (Controller) => {
    "use strict";

    return Controller.extend("fioriapp.controller.Default", {

        onInit() {

        },

        navToHome() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("homePage")
        }

    });
});