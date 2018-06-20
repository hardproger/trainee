import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  role: String,
  password: String
});
