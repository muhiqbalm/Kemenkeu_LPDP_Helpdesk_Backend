import mongoose from "mongoose";
import Topic from "../models/topicModel.js";
import getenv from "../helper/getenv.js";

export const findAllTopic = async (req, res, next) => {
  try {
    const topic = await Topic.find({}).populate({
      path: "beasiswa_name",
      select: "-_id beasiswa",
    });
    res.json(topic);
  } catch (err) {
    next(err);
  }
};

export const createTopic = async (req, res, next) => {
  try {
    const topic = new Topic({
      topik: req.body.topik,
      beasiswa_id: req.body.beasiswa_id,
      beasiswa_name: req.body.beasiswa_id,
    });
    const result = await topic.save();
    res.status(201).send({ message: "Topic successfully created!" });
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

export const findTopicById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Scholarship.findById({ _id: id }).populate({
      path: "beasiswa_name",
      select: "-_id beasiswa",
    });
    res.json({ response });
  } catch (err) {
    next(err);
  }
};

export const updateTopicById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Topic.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res.status(404).send({
        message: `Can't update, topic with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "Topic successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteTopicById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Topic.findByIdAndRemove({ _id: id });
    if (!response) {
      res.status(404).send({
        message: `Delete failed, topic with id=${id} not found!`,
      });
    } else {
      res.status(201).send({ message: "Topic successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
