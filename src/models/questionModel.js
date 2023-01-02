import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  subjek: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  scope_beasiswa: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  topik: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  subtopik: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  pertanyaan: {
    type: String,
    required: true,
    min: 2,
    max: 2000,
  },
  jawaban: {
    type: String,
    required: true,
    min: 2,
    max: 2000,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
