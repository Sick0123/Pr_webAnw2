const helper = require("../helper.js");

class config_bestellerDao {
    //const eventsDao_2 = {

    constructor(dbConnection) {
        this._conn = dbConnection;
       
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = "SELECT * FROM config_besteller WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }
    


    create(f_id_config="",adr="",email="",name="",ort="",plz="",vname="") {
        var sql = "INSERT INTO config_besteller (f_id_config,adr,email,name,ort,plz,vname) VALUES (?,?,?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [f_id_config,adr,email,name,ort,plz,vname];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    toString() {
        helper.log("config_bestellerDao [_conn=" + this._conn + "]");
    }
//}


    
}


module.exports = config_bestellerDao;