import mongoose from "mongoose";
import Question from "../models/questionModel";
import getenv from "../helper/getenv";

export const getAllQuestion = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.json(user);
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
