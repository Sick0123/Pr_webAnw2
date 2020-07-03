
const helper = require("../helper.js");
const express = require("express");
const Config_bestellerDao = require("../dao/config_bestellerDao.js");
var serviceRouter = express.Router();

serviceRouter.get("/config_besteller/gib/:id", function(request, response) {
    helper.log("Service config_besteller: Client requested one record, id=" + request.params.id);

    const config_bestellerDao = new Config_bestellerDao(request.app.locals.dbConnection);
    try {
        var result = config_bestellerDao.loadById(request.params.id);
        helper.log("Service config_besteller: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service config_besteller: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/config_besteller/subSelc/", function(request, response) {
    helper.log("Service config_besteller: Client requested one record, id=" + request.params.id);

    const config_bestellerDao = new Config_bestellerDao(request.app.locals.dbConnection);
    try {
        var result = config_bestellerDao.subSelc();
        helper.log("Service config_besteller: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service config_besteller: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.post("/config_besteller", function(request, response) {
    helper.log("Service config_besteller: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.f_id_config)) 
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
        helper.log("Service config_besteller: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const config_bestellerDao = new Config_bestellerDao(request.app.locals.dbConnection);
    try {
        var result = config_bestellerDao.create(request.body.f_id_config, request.body.adr, request.body.email, request.body.name, request.body.ort, request.body.plz, request.body.vname);
        

        helper.log("Service config_besteller: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service config_besteller: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});



module.exports = serviceRouter;