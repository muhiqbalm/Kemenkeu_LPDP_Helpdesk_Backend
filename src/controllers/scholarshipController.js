import mongoose from "mongoose";
import Scholarship from "../models/scholarshipModel.js";
import getenv from "../helper/getenv.js";

export const findAllScholarship = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.find({}).populate({
      path: "subjek_name",
      select: "-_id subjek",
    });
    res.json(scholarship);
  } catch (err) {
    next(err);
  }
};

export const createScholarship = async (req, res, next) => {
  try {
    const scholarship = new Scholarship({
      beasiswa: req.body.beasiswa,
      subjek_id: req.body.subjek_id,
      subjek_name: req.body.subjek_id,
    });
    const result = await scholarship.save();
    res.status(201).send({ message: "Scholarship successfully created!" });
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

export const findScholarshipById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Scholarship.findById({ _id: id }).populate({
      path: "subjek_name",
      select: "-_id subjek",
    });
    res.json({ response });
  } catch (err) {
    next(err);
  }
};

export const updateScholarshipById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Scholarship.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res.status(404).send({
        message: `Can't update, scholarship with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "Scholarship successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteScholarshipById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Scholarship.findByIdAndRemove({ _id: id });
    if (!response) {
      res.status(404).send({
        message: `Delete failed, scholarship with id=${id} not found!`,
      });
    } else {
      res.status(201).send({ message: "scholarship successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
