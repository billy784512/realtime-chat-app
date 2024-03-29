import { MongoMemoryServer } from 'mongodb-memory-server'
import dotenv from 'dotenv';
import {server} from "../index.js";
import mongoose from 'mongoose';


dotenv.config();
let mongo

beforeAll(async () => {
  try{
    process.env.JWT_SECRET = 'fortestingpurpose'
    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URL = await mongo.getUri();
    await new Promise((resolve, reject) => {
      server.listen(3000, (err) => {
        if (err) {
          console.error('Failed to start server:', err);
          reject(err);
        } else {
          console.log('Server started');
          resolve();
        }
      });
    });
  }catch (error) {
    console.error('Failed to setup MongoDB:', error);
    throw error;
  }})

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

export {server};