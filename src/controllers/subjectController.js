import mongoose from "mongoose";
import Subject from "../models/subjectModel.js";
import getenv from "../helper/getenv.js";

export const getAllSubject = async (req, res, next) => {
  try {
    const subject = await Subject.find({});
    res.json(subject);
  } catch (err) {
    next(err);
  }
};

export const createSubject = async (req, res, next) => {
  try {
    const subject = new Subject({
      subjek: req.body.subjek,
    });
    const result = await subject.save();
    res.status(201).send({ message: "Subject successfully created!" });
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

export const findSubjectById = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.json({
      subjek: subject.subjek,
    });
  } catch (err) {
    next(err);
  }
};

export const updateSubjectById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Subject.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res.status(404).send({
        message: `Can't update, subject with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "Subject successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteSubjectById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Subject.findByIdAndRemove({ _id: id });
    if (!response) {
      res.status(404).send({
        message: `Delete failed, subject with id=${id} not found!`,
      });
    } else {
      res.status(201).send({ message: "subject successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
