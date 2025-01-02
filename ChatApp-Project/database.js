const {MongoClient} = require('mongodb')
const mongodburl = "mongodb://localhost:27017"
DB_Name = "userpass"
async function writetask(){
    const client = await MongoClient.connect(mongodburl)
    const updb = client.db(DB_Name)
    const userpass1 = {
        arnav : "this is password"
    }
    const usdb1 = updb.collection('usdb1')
    const result = await usdb1.insertOne(userpass1)
    console.log(result);
}
async function readTask(){
    
    const client = await MongoClient.connect(mongodburl)
    const updb = client.db(DB_Name)
    const usdb1 = updb.collection('usdb1')
    const uparr = await usdb1.find({}).toArray();
    console.log(uparr);
    return uparr;
}
readTask()