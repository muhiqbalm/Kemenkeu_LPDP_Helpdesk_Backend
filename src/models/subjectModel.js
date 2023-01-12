import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjek: {
    type: String,
    required: true,
    min: 2,
    max: 255,
    unique: true,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
