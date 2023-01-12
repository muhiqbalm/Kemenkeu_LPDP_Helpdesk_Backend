import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  beasiswa: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  subjek_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  subjek_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
    default: "Subject name",
  },
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;
