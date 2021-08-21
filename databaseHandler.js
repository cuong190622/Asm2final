const {ObjectId,MongoClient} = require('mongodb');
//const url ="mongodb://localhost:27017" ;
const url= "mongodb+srv://new-cuongdinh-06:cuong2001@cluster0.k6asp.mongodb.net/test"
async function insertfuntion(toys) {
    const dbo = await getDB();
    const newS = await dbo.collection("toys").insertOne(toys);
    
    console.log("gia trị id mơi dc insert la", newS.insertedId.toHexString());
}

async function Deletefuntion(idInput) {
    const dbo = await getDB();
    await dbo.collection("toys").deleteOne({ _id: ObjectId(idInput) });
}

async function Search(SearchInput) {
    const dbo = await getDB();
    const allToys = await dbo.collection("toys").find({ name: SearchInput }).toArray();
    return allToys;
}

async function getToyById(idInput){
    const dbo = await getDB();
    return dbo.collection("toys").findOne({_id: ObjectId(idInput) });
}

async function Showall() {
    const dbo = await getDB();
    const allToys = await dbo.collection("toys").find({}).toArray();
    return allToys;
}

async function update(id,nameInput,priceInput,imageInput){
    const dbo = await getDB();
    dbo.collection("toys").updateOne({_id:ObjectId(id)},{$set:{name:nameInput,price:priceInput,image:imageInput}})

}

async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("GCH0803DB");
    return dbo;
}
module.exports = {getToyById,getDB,insertfuntion,Deletefuntion,Search,Showall,update}