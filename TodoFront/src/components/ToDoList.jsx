import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const baseURL = "http://localhost:5017/api/TodoItems";
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    axiosInstance
      .get("/")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeTodo = (id) => {
    axiosInstance
      .delete(`/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        console.log("Todo deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleTodo = (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (!todoToToggle) {
      console.error(`Todo with id ${id} not found.`);
      return;
    }

    const updatedTodo = {
      ...todoToToggle,
      isCompleted: !todoToToggle.isCompleted,
    };

    axiosInstance
      .put(`/${id}`, updatedTodo)
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          )
        );
        console.log("Todo updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTodo = (text) => {
    const data = {
      name: text,
      isCompleted: false,
    };

    axiosInstance
      .post("/", data)
      .then((response) => {
        setTodos([...todos, response.data]);
        console.log("Todo added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: 3,
      }}
    >
      <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
        Todos
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={() => removeTodo(todo.id)}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </List>
    </Box>
  );
};

export default ToDoList;
