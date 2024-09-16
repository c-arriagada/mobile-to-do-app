import React, { useState, useEffect } from "react";
import db from "../db/dbConnection";

const useTasks = (tag = null) => {
  const [taskList, setTaskList] = useState([]);

  const getTasks = async () => {
    try {
      if (tag) {
        const result = await db.sql(
          "SELECT tasks.*, tags.id AS tag_id, tags.name AS tag_name FROM tasks JOIN tasks_tags ON tasks.id = tasks_tags.task_id JOIN tags ON tags.id = tasks_tags.tag_id WHERE tag_name=?",
          tag
        );
        setTaskList(result);
      } else {
        const result =
          await db.sql`SELECT tasks.*, tags.id AS tag_id, tags.name AS tag_name FROM tasks JOIN tasks_tags ON tasks.id = tasks_tags.task_id JOIN tags ON tags.id = tasks_tags.tag_id`;
        setTaskList(result);
      }
    } catch (error) {
      console.error("Error getting tasks", error);
    }
  };

  const updateTask = async (completedStatus, taskId) => {
    try {
      const task = await db.sql(
        "UPDATE tasks SET isCompleted=? WHERE id=? RETURNING *",
        completedStatus,
        taskId
      );
      getTasks();
    } catch (error) {
      console.error("Error updating tasks", error);
    }
  };

  const addTaskTag = async (newTask, tag) => {
    try {
      if (tag.id) {
        const addNewTask = await db.sql(
          "INSERT INTO tasks (title, isCompleted) VALUES (?, ?) RETURNING *",
          newTask.title,
          newTask.isCompleted
        );
        addNewTask[0].tag_id = tag.id;
        addNewTask[0].tag_name = tag.name;
        setTaskList([...taskList, addNewTask[0]]);
        await db.sql(
          "INSERT INTO tasks_tags (task_id, tag_id) VALUES (?, ?)",
          addNewTask[0].id,
          tag.id
        );
      } else {
        const addNewTaskNoTag = await db.sql(
          "INSERT INTO tasks (title, isCompleted) VALUES (?, ?) RETURNING *",
          newTask.title,
          newTask.isCompleted
        );
        setTaskList([...taskList, addNewTaskNoTag[0]]);
      }
    } catch (error) {
      console.error("Error adding task to database", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await db.sql("DELETE FROM tasks_tags WHERE task_id=?", taskId);
      const result = await db.sql("DELETE FROM tasks WHERE id=?", taskId);
      console.log(`deleted ${result[0].TOTAL_CHANGES} task`);
      getTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [tag]);

  return {
    taskList,
    updateTask,
    addTaskTag,
    deleteTask,
    refreshTasks: getTasks,
  };
};

export default useTasks;