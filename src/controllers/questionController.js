import mongoose from "mongoose";
import Question from "../models/questionModel.js";
import getenv from "../helper/getenv.js";

export const getAllQuestion = async (req, res, next) => {
  try {
    const question = await Question.find({})
      .populate({ path: "subjek_name", select: "-_id subjek" })
      .populate({ path: "beasiswa_name", select: "-_id beasiswa" })
      .populate({ path: "topik_name", select: "-_id topik" })
      .populate({ path: "subtopik_name", select: "-_id subtopik" });
    res.json(question);
  } catch (err) {
    next(err);
  }
};

export const createQuestion = async (req, res, next) => {
  try {
    const question = new Question({
      subjek_id: req.body.subjek_id,
      subjek_name: req.body.subjek_id,
      beasiswa_id: req.body.beasiswa_id,
      beasiswa_name: req.body.beasiswa_id,
      topik_id: req.body.topik_id,
      topik_name: req.body.topik_id,
      subtopik_id: req.body.subtopik_id,
      subtopik_name: req.body.subtopik_id,
      pertanyaan: req.body.pertanyaan,
      jawaban: req.body.jawaban,
      creator: req.agent,
      last_modifier: req.agent,
    });
    const result = await question.save();
    if (result) {
      res.status(201).send({ message: "Question successfully created!" });
    } else {
      res.status(404).send({ message: "Question cannot be empty!" });
    }
  } catch (err) {
    if (["CastError", "ValidationError"].includes(err?.name)) {
      next({
        message: err.message,
        stack: err.stack,
        statusCode: 400,
      });
    }
    next(err);
  }
};

export const getQuestionById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Question.findById({ _id: id })
      .populate({ path: "subjek_name", select: "-_id subjek" })
      .populate({ path: "beasiswa_name", select: "-_id beasiswa" })
      .populate({ path: "topik_name", select: "-_id topik" })
      .populate({ path: "subtopik_name", select: "-_id subtopik" });
    res.json({ response });
  } catch (err) {
    next(err);
  }
};

export const updateQuestionById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Question.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res.status(404).send({
        message: `Can't update, question with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "Question successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteQuestionById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Question.findByIdAndRemove({ _id: id });
    if (!response) {
      res.status(404).send({
        message: `Delete failed, question with id=${id} not found!`,
      });
    } else {
      res.status(201).send({ message: "Question successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};

// export const getAllSubject = async (req, res, next) => {
//   try {
//     const question = await Question.find({}, { subjek: 1, _id: 0 });
//     res.json(question);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getAllSubject = function(req, res, next) {
//   //query with mongoose
//   var query = Question.find({}).select('subjek -_id');

//   query.exec(function (err, someValue) {
//       if (err) return next(err);
//       res.send(someValue);
//   });
// };
