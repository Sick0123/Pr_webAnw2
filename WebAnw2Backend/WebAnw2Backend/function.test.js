const Database = require("better-sqlite3");
const dbOptions = { verbose: console.log };
const dbFile = "./db/db.sqlite";
const dbConnection = new Database(dbFile, dbOptions);
const eventsDao=require('./dao/eventsDao'); 

// const axios = require ("axios");

var dao = new eventsDao(dbConnection); 

test('loadById', ()=>{
    function loadTest(){
        dao.loadById(14);
    }
    
    expect(loadTest).not.toThrowError("No Record found by id=");
});


test('loadDropDown', ()=>{ 
    
    expect(dao.loadDropDown()).toHaveLength(4);
});



test('test', ()=>{
    function createTEST(){
        dao.create("2","adr","email","name","ort","50825","vname");
    }

    expect(createTEST).not.toThrowError("Could not insert new Record. Data:");
});

