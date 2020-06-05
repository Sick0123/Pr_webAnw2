const helper = require("../helper.js");

class eventsDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = "SELECT * FROM event_form WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }
    loadDropDown(){
        var sql = "SELECT * FROM Events";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return helper.arrayObjectKeysToLower(result);
    }

    loadAll() {
        var sql = "SELECT * FROM event_form";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return helper.arrayObjectKeysToLower(result);
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM event_form WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(f_event_id="",adr="",email="",name="",ort="",plz="",vname="") {
        var sql = "INSERT INTO event_form (f_event_id,adr,email,name,ort,plz,vname) VALUES (?,?,?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [f_event_id,adr,email,name,ort,plz,vname];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    update(id, bezeichnung = "", steuersatz = 19.0) {
        var sql = "UPDATE event_form SET Bezeichnung=?,SteuerSatz=? WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var params = [bezeichnung, steuersatz, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        var updatedObj = this.loadById(id);
        return updatedObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM event_form WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error("Could not delete Record by id=" + id);

            return true;
        } catch (ex) {
            throw new Error("Could not delete Record by id=" + id + ". Reason: " + ex.message);
        }
    }

    toString() {
        helper.log("eventsDao [_conn=" + this._conn + "]");
    }
}

module.exports = eventsDao;