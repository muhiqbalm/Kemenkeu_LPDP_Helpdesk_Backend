import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getenv from "../helper/getenv.js";
import Agent from "../models/agentModel.js";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT = process.env.SALT;

export const findAllAgent = async (req, res, next) => {
  try {
    const agent = await Agent.find({});
    res.json(agent);
  } catch (err) {
    next(err);
  }
};

export const getCurrentAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.agent);
    res.json({
      id: agent._id,
      username: agent.username,
      name: agent.name,
    });
  } catch (err) {
    next(err);
  }
};

export const createAgent = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(Number(SALT));
    const encryptedPassword = bcrypt.hashSync(
      req.body.password,
      salt,
      (err, hash) => {
        console.log(err);
      }
    );
    const agent = new Agent({
      username: req.body.username,
      name: req.body.name,
      password: encryptedPassword,
    });
    const result = await agent.save();
    res.status(201).send({ message: "Agent successfully created!" });
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

export const loginAgent = async (req, res, next) => {
  // try {
  //   const { username, password } = req.body;
  //   const agent = await Agent.findOne({ username: username });
  //   if (!agent) {
  //     return res.status(400).json({
  //       errors: "Could not find this username!",
  //       error_type: "username",
  //     });
  //   }

  //   const isMatch = await bcrypt.compare(password, agent.password);
  //   if (!isMatch) {
  //     return res
  //       .status(400)
  //       .json({ errors: "Invalid credentials!", error_type: "password" });
  //   }

  //   const token = jwt.sign(
  //     {
  //       id: agent._id,
  //       username: agent.username,
  //       name: agent.name,
  //     },
  //     JWT_SECRET
  //   );
  // res.status(200).json({
  //   token,
  //   agent: {
  //     id: agent._id,
  //     username: agent.username,
  //     name: agent.name,
  //   },
  // });
  // } catch (err) {
  //   next(err);
  // }
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      next({
        message: "username and password are required",
        statusCode: 400,
      });
      return;
    }

    const agent = await Agent.findOne({ username });
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    };

    if (!agent || !(await bcrypt.compare(password, agent.password))) {
      next({
        message: "invalid credentials",
        statusCode: 401,
      });
      return;
    }

    const token = jwt.sign(
      {
        id: agent._id,
        username: agent.username,
        name: agent.name,
      },
      JWT_SECRET
    );

    res.status(200).json({
      headers: headers,
      token,
      agent: {
        id: agent._id,
        username: agent.username,
        name: agent.name,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateAgentById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Agent.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res
        .status(404)
        .send({ message: `Can't update, user with id=${id} not found!` });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "User successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteAgent = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Agent.findByIdAndRemove({ _id: id });
    if (!response) {
      res.status(404).send({
        message: `Delete failed, Agent with id=${id} not found!`,
      });
    } else {
      res.status(201).send({ message: "Agent successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
