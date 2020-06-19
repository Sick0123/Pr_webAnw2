const helper = require("../helper.js");
const UpdateDao = require("../dao/updateDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/update/gib/:id", function(request, response) {
    helper.log("Service kontakt: Client requested one record, id=" + request.params.id);

    const updateDao = new UpdateDao(request.app.locals.dbConnection);
    try {
        var result = updateDao.loadById(request.params.id);
        helper.log("Service kontakt: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.get("/update/dropDown", function(request, response) {
    helper.log("Service kontakt: Client requested all records");

    const updateDao = new updateDao(request.app.locals.dbConnection);
    try {
        var result = updateDao.loadDropDown();
        helper.log("Service kontakt: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;