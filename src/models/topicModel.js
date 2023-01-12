import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  topik: {
    type: String,
    required: true,
    min: 2,
    max: 255,
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
    default: "Scholarship name",
  },
});

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
