const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASS}@cluster0.qf4bw47.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const Instockcollection = client.db("kabirs-inventory").collection("in-stocs-products");
        
        app.get('/inStocProducts', async (req, res) => {
            const query = {};
            const result = Instockcollection.find(query);
            const allData = await result.toArray(result);
            res.send(allData);
        })
        
    } finally {
        
    }
}
run().catch(console.dir);
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.get('/', (req, res)=> {
    res.send('kabirs server running')
});

app.listen(port, ()=> {
    console.log('kabirs server running on port', port);
})