const todoList = require("../models");
const statusCodes = require("http-status-codes");

const createTodo = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "Task is required" });
    }

    const newTodo = await todoList.create({ task });
    return res.status(statusCodes.CREATED).json({ msg: "Todo created", todo: newTodo });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred", error });
  }
};

const allList = async (req, res) => {
  try {
    const todos = await todoList.find();
    return res.status(statusCodes.OK).json({ todos });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred", error });
  }
};

const getOneList = async (req, res) => {
  try {
    const todo = await todoList.findById(req.params.id);
    if (!todo) {
      return res.status(statusCodes.NOT_FOUND).json({ msg: "Todo not found" });
    }
    return res.status(statusCodes.OK).json({ todo });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred", error });
  }
};

const editToDo = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "Task is required" });
    }

    const todo = await todoList.findById(req.params.id);
    if (!todo) {
      return res.status(statusCodes.NOT_FOUND).json({ msg: "Todo not found" });
    }

    todo.task = task;
    await todo.save();

    return res.status(statusCodes.OK).json({ msg: "Todo updated", todo });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred", error });
  }
};

const deleteList = async (req, res) => {
  try {
    const deleted = await todoList.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(statusCodes.NOT_FOUND).json({ msg: "Todo not found" });
    }
    return res.status(statusCodes.OK).json({ msg: "Todo deleted" });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred", error });
  }
};

const markAndUnMark = async (req, res) => {
  try {
    const todo = await todoList.findById(req.params.id);
    if (!todo) {
      return res.status(statusCodes.NOT_FOUND).json({ msg: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    return res.status(statusCodes.OK).json({ msg: "Todo status toggled", todo });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred", error });
  }
};

module.exports = {
  createTodo,
  allList,
  getOneList,
  editToDo,
  deleteList,
  markAndUnMark
};
