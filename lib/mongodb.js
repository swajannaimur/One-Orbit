import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;
// console.log("mongodb uri : ", uri);


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client; 
let clientPromise;

if(!process.env.MONGODB_URL) {
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

// to use from anywhere 
// 1. 
// import clientPromise from "@/lib/mongodb";

// export async function getUsers() {
//   const client = await clientPromise;
//   const db = client.db("yourDatabaseName");
//   const users = await db.collection("users").find({}).toArray();
//   return users;
// }


// 2. 
// import clientPromise from "@/lib/mongodb";

// const client = await clientPromise;
// const db = client.db("myDatabase");
// const users = await db.collection("users").find({}).toArray();
