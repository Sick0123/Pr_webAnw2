const helper = require("../helper.js");
class configDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }
    maxID() {
        console.log("func maxid");
        var sql = "SELECT max(id) as M_id FROM config";
        var statement = this._conn.prepare(sql);
        var result = statement.get();

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }
    subSelc() {
        
        var sql = "SELECT * FROM config where ID = (select max(id) from config);";
        var statement = this._conn.prepare(sql);
        var result = statement.get();

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }


    loadById(id) {
        var sql = "SELECT * FROM config WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }

    create(f_id_auto="",f_id_farbe="",f_id_motor="",f_id_felgen="",f_id_update="",f_id_fahrwerk="") {
        var sql = "INSERT INTO Config (f_id_auto,f_id_farbe,f_id_motor,f_id_felgen,f_id_update,f_id_fahrwerk) VALUES (?,?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [f_id_auto,f_id_farbe,f_id_motor,f_id_felgen,f_id_update,f_id_fahrwerk];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }



    toString() {
        helper.log("autoDao [_conn=" + this._conn + "]");
    }
}

module.exports = configDao;