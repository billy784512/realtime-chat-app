import { MongoMemoryServer } from 'mongodb-memory-server'
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
let mongo

beforeAll(async () => {
  try{
    process.env.JWT_SECRET = 'fortestingpurpose'
    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URL = await mongo.getUri();
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }catch(error){
    console.error(error);
    throw error;
  }
});

beforeEach(async () => {
  try{
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
    await collection.deleteMany({})
    } 
  }
  catch (error){
    console.error(error);
    throw error;
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})
