const helper = require("../helper.js");

class fahrwerkDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = "SELECT * FROM Fahrwerk WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }
    loadDropDown(){
        var sql = "SELECT * FROM Fahrwerk";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return helper.arrayObjectKeysToLower(result);
    }

    

    toString() {
        helper.log("fahrwerkDao [_conn=" + this._conn + "]");
    }
}

module.exports = fahrwerkDao;