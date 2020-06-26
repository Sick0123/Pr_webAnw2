const helper = require("../helper.js");
class autoDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = "SELECT name, preis FROM Auto WHERE id_auto=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }

    toString() {
        helper.log("autoDao [_conn=" + this._conn + "]");
    }
}

module.exports = autoDao;