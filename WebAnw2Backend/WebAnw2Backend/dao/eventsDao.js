const helper = require("../helper.js");

class eventsDao {
    //const eventsDao_2 = {

    constructor(dbConnection) {
        this._conn = dbConnection;
       
    }

    add(x,y){
        return x+y;
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

    toString() {
        helper.log("eventsDao [_conn=" + this._conn + "]");
    }
//}


    
}


module.exports = eventsDao;