const helper = require("../helper.js");
const KontaktDao = require("../dao/kontaktDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/kontakt/gib/:id", function(request, response) {
    helper.log("Service kontakt: Client requested one record, id=" + request.params.id);

    const kontaktDao = new kontaktDao(request.app.locals.dbConnection);
    try {
        var result = kontaktDao.loadById(request.params.id);
        helper.log("Service kontakt: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});



serviceRouter.get("/kontakt/dropDown", function(request, response) {
    helper.log("Service kontakt: Client requested all records");

    const kontaktDao = new KontaktDao(request.app.locals.dbConnection);
    try {
        var result = kontaktDao.loadDropDown();
        helper.log("Service kontakt: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/kontakt", function(request, response) {
    helper.log("Service kontakt: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.f_id_kategorie)) 
        errorMsgs.push("f_id_kategorie fehlt");
    if (helper.isUndefined(request.body.text)) {
        errorMsgs.push("text fehlt");
    } 
    if (errorMsgs.length > 0) {
        helper.log("Service kontakt: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const kontaktDao = new KontaktDao(request.app.locals.dbConnection);
    try {
        var result = kontaktDao.create(request.body.f_id_kategorie, request.body.text);
        

        helper.log("Service kontakt: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

module.exports = serviceRouter;