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

serviceRouter.get("/kontakt/alle", function(request, response) {
    helper.log("Service kontakt: Client requested all records");

    const kontaktDao = new kontaktDao(request.app.locals.dbConnection);
    try {
        var result = kontaktDao.loadAll();
        helper.log("Service kontakt: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading all records. Exception occured: " + ex.message);
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

serviceRouter.get("/kontakt/existiert/:id", function(request, response) {
    helper.log("Service kontakt: Client requested check, if record exists, id=" + request.params.id);

    const kontaktDao = new kontaktDao(request.app.locals.dbConnection);
    try {
        var result = kontaktDao.exists(request.params.id);
        helper.log("Service kontakt: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service kontakt: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/kontakt", function(request, response) {
    helper.log("Service kontakt: Client requested creation of new record");

    // var errorMsgs=[];
    // if (helper.isUndefined(request.body.bezeichnung)) 
    //     errorMsgs.push("bezeichnung fehlt");
    // if (helper.isUndefined(request.body.steuersatz)) {
    //     errorMsgs.push("steuersatz fehlt");
    // } else if (!helper.isNumeric(request.body.steuersatz)) {
    //     errorMsgs.push("steuersatz muss eine Zahl sein");
    // } else if (request.body.steuersatz <= 0) {
    //     errorMsgs.push("steuersatz muss eine Zahl > 0 sein");
    // }        
    
    // if (errorMsgs.length > 0) {
    //     helper.log("Service kontakt: Creation not possible, data missing");
    //     response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
    //     return;
    // }

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

serviceRouter.put("/kontakt", function(request, response) {
    helper.log("Service kontakt: Client requested update of existing record");

    // var errorMsgs=[];
    // if (helper.isUndefined(request.body.id)) 
    //     errorMsgs.push("id fehlt");
    // if (helper.isUndefined(request.body.bezeichnung)) 
    //     errorMsgs.push("bezeichnung fehlt");
    // if (helper.isUndefined(request.body.steuersatz)) {
    //     errorMsgs.push("steuersatz fehlt");
    // } else if (!helper.isNumeric(request.body.steuersatz)) {
    //     errorMsgs.push("steuersatz muss eine Zahl sein");
    // } else if (request.body.steuersatz <= 0) {
    //     errorMsgs.push("steuersatz muss eine Zahl > 0 sein");
    // }

    // if (errorMsgs.length > 0) {
    //     helper.log("Service kontakt: Update not possible, data missing");
    //     response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
    //     return;
    // }

    const kontaktDao = new kontaktDao(request.app.locals.dbConnection);
    try {
        var result = kontaktDao.update(request.body.event, request.body.name, request.body.vname, request.body.email, request.body.adr, request.body.plz, request.body.ort);
        helper.log("Service kontakt: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/kontakt/:id", function(request, response) {
    helper.log("Service kontakt: Client requested deletion of record, id=" + request.params.id);

    const kontaktDao = new kontaktDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktDao.loadById(request.params.id);
        kontaktDao.delete(request.params.id);
        helper.log("Service kontakt: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service kontakt: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;