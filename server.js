const express = require("express");
const app = express();
const cors = require("cors");
const { db } = require("./api/firebaseConfig");
const {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
} = require("firebase/firestore");
const PORT = 9000;

const corsOrigin = {
  origin: [
    "http://localhost:3000",
    "https://client-seven-black-21.vercel.app/",
  ],
};

app.use(cors(corsOrigin));
app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  try {
    const tasksCollection = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasksList = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(tasksList);
  } catch (error) {
    console.error("Error fetching all tasks: ", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = req.body;
    console.log(newTask);

    const tasksCollection = collection(db, "tasks");
    await addDoc(tasksCollection, newTask);
    res.status(201).send("Task added");
  } catch (error) {
    console.error("Error adding task: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/tasks", async (req, res) => {
  try {
    const updatedTask = req.body;
    const taskRef = doc(db, "tasks", updatedTask.id);
    await setDoc(taskRef, updatedTask, { merge: true });
    res.status(200).send("Task updated");
  } catch (error) {
    console.error("Error editing task: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).send("Task ID is required");
    }

    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    res.status(200).send(`Task with ID ${taskId} deleted`);
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
