import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
// console.log("mongodb uri : ", uri);


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client; 
let clientPromise;

if(!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env file");
}

if(process.env.NODE_ENV === "development") {
    // to avoid multiple connection in dev mode , 
    // "global" var is used
    if(!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
}
else {
    // production
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
