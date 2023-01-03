import mongoose from "mongoose";
import Question from "../models/questionModel.js";
import getenv from "../helper/getenv.js";

export const getAllQuestion = async (req, res, next) => {
  try {
    const question = await Question.find({});
    res.json(question);
  } catch (err) {
    next(err);
  }
};

export const createQuestion = async (req, res, next) => {
  try {
    const question = new Question({
      subjek: req.body.subjek,
      scope_beasiswa: req.body.scope_beasiswa,
      topik: req.body.topik,
      subtopik: req.body.subtopik,
      pertanyaan: req.body.pertanyaan,
      jawaban: req.body.jawaban,
    });
    const result = await question.save();
    res.status(201).send({ message: "Question successfully created!" });
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
    const question = await Question.findById(req.params.id);
    res.json({
      subjek: question.subjek,
      scope_beasiswa: question.scope_beasiswa,
      topik: question.topik,
      subtopik: question.subtopik,
      pertanyaan: question.pertanyaan,
      jawaban: question.jawaban,
    });
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
