import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  subjek_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  subjek_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
    default: "nama subjek",
  },
  beasiswa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scholarship",
    required: true,
  },
  beasiswa_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scholarship",
    required: true,
    default: "nama beasiswa",
  },
  topik_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  topik_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
    default: "nama topik",
  },
  subtopik_id: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "Subtopic",
    required: true,
    default: null,
  },
  subtopik_name: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "Subtopic",
    required: true,
    default: null,
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
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
  last_modifier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: false,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
