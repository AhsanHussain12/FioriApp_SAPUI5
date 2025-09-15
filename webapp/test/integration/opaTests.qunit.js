/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["fioriapp/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
