const helper = require("../helper.js");

class kontaktDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = "SELECT * FROM Kontakt WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }
    loadDropDown(){
        var sql = "SELECT * FROM kontakt_kategorie";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return helper.arrayObjectKeysToLower(result);
    }

    create(f_id_kategorie="",text="") {
        var sql = "INSERT INTO Kontakt(f_id_kategorie,text) VALUES (?,?)";
        var statement = this._conn.prepare(sql);
        var params = [f_id_kategorie,text];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }


    toString() {
        helper.log("eventsDao [_conn=" + this._conn + "]");
    }
}

module.exports = kontaktDao;