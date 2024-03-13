import React from "react";
import { CssBaseline } from "@mui/material";
import ToDoList from "../components/ToDoList";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div>
      <CssBaseline />
      <NavBar />
      <ToDoList />
    </div>
  );
};

export default Home;
