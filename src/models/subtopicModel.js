import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema({
  subtopik: {
    type: String,
    required: true,
    min: 2,
    max: 255,
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
    default: "Topic name",
  },
});

const Subtopic = mongoose.model("Subtopic", subtopicSchema);

export default Subtopic;
