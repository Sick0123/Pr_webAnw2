const helper = require("../helper.js");
const ConfigDao = require("../dao/configDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/config/gib/:id", function(request, response) {
    helper.log("Service kontakt: Client requested one record, id=" + request.params.id);

    const configDao = new ConfigDao(request.app.locals.dbConnection);
    try {
        var result = configDao.loadById(request.params.id);
        helper.log("Service kontakt: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kontakt: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.post("/config", function(request, response) {
    helper.log("Service events: Client requested creation of new record");

    var errorMsgs=[];
    // if (helper.isUndefined(request.body.f_event_id)) 
    //     errorMsgs.push("f_event_id fehlt");
    // if (helper.isUndefined(request.body.adr)) {
    //     errorMsgs.push("adr fehlt");
    // } 
    // if (helper.isUndefined(request.body.email)) 
    //     errorMsgs.push("email fehlt");
    // if (helper.isUndefined(request.body.name)) {
    //     errorMsgs.push("name fehlt");
    // }
    // if (helper.isUndefined(request.body.ort)) 
    //     errorMsgs.push("ort fehlt");
    // if (helper.isUndefined(request.body.plz)) {
    //     errorMsgs.push("plz fehlt");
    // }
    // if (helper.isUndefined(request.body.vname)) {
    //     errorMsgs.push("vname fehlt");
    // }
    
    // if (errorMsgs.length > 0) {
    //     helper.log("Service events: Creation not possible, data missing");
    //     response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
    //     return;
    // }

    const configDao = new ConfigDao(request.app.locals.dbConnection);
    try {
        console.log("config.js");
        var result = configDao.create(request.body.f_id_auto, request.body.f_id_farbe, request.body.f_id_motor, request.body.f_id_felgen, request.body.f_id_update, request.body.f_id_fahrwerk);
       
        helper.log("Service events: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service events: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }   
});

serviceRouter.get("/config/subSelc", function(request, response) {
    helper.log("Service events: Client requested creation of new record");

    var errorMsgs=[];
    const configDao = new ConfigDao(request.app.locals.dbConnection);
    try {
        
        var result = configDao.subSelc();
       
        helper.log("Service events: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service events: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }   
});



module.exports = serviceRouter;