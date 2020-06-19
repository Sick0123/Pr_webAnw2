const helper = require("../helper.js");
const FahrwerkDao = require("../dao/fahrwerkDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/fahrwerk/gib/:id", function(request, response) {
    helper.log("Service kontakt: Client requested one record, id=" + request.params.id);

    const fahrwerkDao = new FahrwerkDao(request.app.locals.dbConnection);
    try {
        var result = fahrwerkDao.loadById(request.params.id);
        helper.log("Service kontakt: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.get("/fahrwerk/dropDown", function(request, response) {
    helper.log("Service kontakt: Client requested all records");

    const fahrwerkDao = new FahrwerkDao(request.app.locals.dbConnection);
    try {
        var result = fahrwerkDao.loadDropDown();
        helper.log("Service kontakt: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;