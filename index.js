const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());

// personal document
// user: mdminajul4010 : pass: 9h4ksDGyjptVPQJK



const uri = "mongodb+srv://mdminajul4010:9h4ksDGyjptVPQJK@cluster0.eyk5ydv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("userDB");
    const userCollection = database.collection("user");

    app.post('/users', async (req, res) => {
       const user = req.body;
       console.log('simple user', user)
       const result = await userCollection.insertOne(user);
       res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World! my name is minazul')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})