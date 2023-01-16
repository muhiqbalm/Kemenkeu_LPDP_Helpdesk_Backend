import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 100,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    min: 1,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
});

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
