const express = require("express");
const {
  createTodo,
  allList,
  getOneList,
  editToDo,
  deleteList,
  markAndUnMark,
} = require("../controllers/todoListCotroller");

const todoRouter = express.Router();

todoRouter.route("/").post(createTodo).get(allList);
todoRouter.route("/:id").get(getOneList).patch(editToDo).delete(deleteList);
todoRouter.route("/mark/:id").patch(markAndUnMark);

module.exports = todoRouter;
