const Database = require("better-sqlite3");
const dbOptions = { verbose: console.log };
const dbFile = "./db/db.sqlite";
const dbConnection = new Database(dbFile, dbOptions);
const eventsDao=require('./dao/eventsDao'); 

// const axios = require ("axios");

var dao = new eventsDao(dbConnection); 


test('test', ()=>{
    
    expect(dao.loadDropDown).not.toBeNull();
});

test('test', ()=>{
    
    expect(dao.loadById(14)).not.toBeNull();
});

test('test', ()=>{
    
    expect(dao.getConnection()).not.toBeNull();
});


// test('test', ()=>{
//     var dao = new eventsDao("./db/db.sqlite");
//     expect(dao.create("2","adr","email","name","ort","50825","vname")).not.toBeNull();
// });

// const id = 1;
// test('test2', ()=>{
   
//     expect(dao.loadById(2)).not.toBeNull();
// });