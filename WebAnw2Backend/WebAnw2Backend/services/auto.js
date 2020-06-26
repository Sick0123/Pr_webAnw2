const helper = require("../helper.js");
const AutoDao = require("../dao/autoDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/auto/gib/:id", function(request, response) {
    helper.log("Service kontakt: Client requested one record, id=" + request.params.id);

    const autoDao = new AutoDao(request.app.locals.dbConnection);
    try {
        var result = autoDao.loadById(request.params.id);
        helper.log("Service kontakt: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;