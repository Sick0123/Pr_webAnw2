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

serviceRouter.post("/events", function(request, response) {
    helper.log("Service events: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.f_event_id)) 
        errorMsgs.push("f_event_id fehlt");
    if (helper.isUndefined(request.body.adr)) {
        errorMsgs.push("adr fehlt");
    } 
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push("email fehlt");
    if (helper.isUndefined(request.body.name)) {
        errorMsgs.push("name fehlt");
    }
    if (helper.isUndefined(request.body.ort)) 
        errorMsgs.push("ort fehlt");
    if (helper.isUndefined(request.body.plz)) {
        errorMsgs.push("plz fehlt");
    }
    if (helper.isUndefined(request.body.vname)) {
        errorMsgs.push("vname fehlt");
    }
    
    if (errorMsgs.length > 0) {
        helper.log("Service events: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const eventsDao = new EventsDao(request.app.locals.dbConnection);
    try {
        var result = eventsDao.create(request.body.f_event_id, request.body.adr, request.body.email, request.body.name, request.body.ort, request.body.plz, request.body.vname);
        

        helper.log("Service events: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service events: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});



module.exports = serviceRouter;