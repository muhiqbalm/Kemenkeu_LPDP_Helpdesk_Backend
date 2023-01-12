import mongoose from "mongoose";
import Subtopic from "../models/subtopicModel.js";
import getenv from "../helper/getenv.js";

export const findAllSubtopic = async (req, res, next) => {
  try {
    const subtopic = await Subtopic.find({}).populate({
      path: "topik_name",
      select: "-_id topik",
    });
    res.json(subtopic);
  } catch (err) {
    next(err);
  }
};

export const createSubtopic = async (req, res, next) => {
  try {
    const subtopic = new Subtopic({
      subtopik: req.body.subtopik,
      topik_id: req.body.topik_id,
      topik_name: req.body.topik_id,
    });
    const result = await subtopic.save();
    res.status(201).send({ message: "Subtopic successfully created!" });
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

export const findSubtopicById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Subtopic.findById({ _id: id }).populate({
      path: "topik_name",
      select: "-_id topik",
    });
    res.json({ response });
  } catch (err) {
    next(err);
  }
};

export const updateSubtopicById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Subtopic.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res.status(404).send({
        message: `Can't update, subtopic with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "Subtopic successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteSubtopicById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Subtopic.findByIdAndRemove({ _id: id });
    if (!response) {
      res.status(404).send({
        message: `Delete failed, subtopic with id=${id} not found!`,
      });
    } else {
      res.status(201).send({ message: "Subtopic successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
