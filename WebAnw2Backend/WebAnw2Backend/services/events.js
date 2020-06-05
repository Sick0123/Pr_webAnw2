const helper = require("../helper.js");
const EventsDao = require("../dao/eventsDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/events/gib/:id", function(request, response) {
    helper.log("Service events: Client requested one record, id=" + request.params.id);

    const eventsDao = new eventsDao(request.app.locals.dbConnection);
    try {
        var result = eventsDao.loadById(request.params.id);
        helper.log("Service events: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service events: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/events/alle", function(request, response) {
    helper.log("Service events: Client requested all records");

    const eventsDao = new EventsDao(request.app.locals.dbConnection);
    try {
        var result = eventsDao.loadAll();
        helper.log("Service events: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service events: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/events/dropDown", function(request, response) {
    helper.log("Service events: Client requested all records");

    const eventsDao = new EventsDao(request.app.locals.dbConnection);
    try {
        var result = eventsDao.loadDropDown();
        helper.log("Service events: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service events: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/events/existiert/:id", function(request, response) {
    helper.log("Service events: Client requested check, if record exists, id=" + request.params.id);

    const eventsDao = new EventsDao(request.app.locals.dbConnection);
    try {
        var result = eventsDao.exists(request.params.id);
        helper.log("Service events: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service events: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/events", function(request, response) {
    helper.log("Service events: Client requested creation of new record");

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
    //     helper.log("Service events: Creation not possible, data missing");
    //     response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
    //     return;
    // }

    const eventsDao = new EventsDao(request.app.locals.dbConnection);
    try {
        var result = eventsDao.create(request.body.event_name, request.body.adr, request.body.email, request.body.name, request.body.ort, request.body.plz, request.body.vname);
        

        helper.log("Service events: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service events: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/events", function(request, response) {
    helper.log("Service events: Client requested update of existing record");

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
    //     helper.log("Service events: Update not possible, data missing");
    //     response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
    //     return;
    // }

    const eventsDao = new EventsDao(request.app.locals.dbConnection);
    try {
        var result = eventsDao.update(request.body.event, request.body.name, request.body.vname, request.body.email, request.body.adr, request.body.plz, request.body.ort);
        helper.log("Service events: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service events: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/events/:id", function(request, response) {
    helper.log("Service events: Client requested deletion of record, id=" + request.params.id);

    const eventsDao = new EventsDao(request.app.locals.dbConnection);
    try {
        var obj = eventsDao.loadById(request.params.id);
        eventsDao.delete(request.params.id);
        helper.log("Service events: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service events: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;