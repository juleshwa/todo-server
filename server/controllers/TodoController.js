'use strict';

const { Todo } = require('../models');

class TodoController {
  static showAll(req, res, next) {
    Todo.findAll({
      order: [['id', 'ASC']]
    })
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(next);
  }
  static createTodo(req, res, next) {
    let { title, description, status, due_date, UserId } = req.body;
    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId
    })
      .then(result => {
        res.status(201).json(result);
      })
      .catch(next);
  }
  static showTodoById(req, res, next) {
    let { id } = req.params;
    let todoId = +id;
    Todo.findByPk(todoId)
      .then(result => {
        if (!result) {
          // 404 not found
          next({
            status: 404,
            message: 'Not Found'
          });
        } else {
          res.status(200).json(result);
        }
      })
      .catch(err => {
        next(err);
      });
  }
  static updateTodo(req, res, next) {
    let { title, description, status, due_date, UserId } = req.body;
    let updateId = +req.params.id;

    Todo.update(
      { title, description, status, due_date, UserId },
      {
        where: {
          id: updateId
        },
        returning: true
      }
    )
      .then(result => {
        res.send(result);
      })
      .catch(next);
  }
  static deleteTodo(req, res, next) {
    let deleteId = +req.params.id;
    Todo.findByPk(deleteId)
      .then(result => {
        return Promise.all([
          result,
          Todo.destroy({
            where: {
              id: result.id
            }
          })
        ]);
      })

      .then(deleted => {
        if (!deleted) {
          // 404
          next({
            status: 404,
            message: `Not Found`
          });
        } else {
          res.send(200).json(deleted[0]);
        }
      })
      .catch(next);
  }
}

module.exports = { TodoController };
