const express = require("express");
const app = express();
const cors = require("cors");
const { db } = require("./firebase");
const { collection, getDocs } = require("firebase/firestore");
const PORT = 9000;

const corsOrigin = {
  origin: ["http://localhost:3000"],
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
    console.log("Data fetched successfully", tasksList);

    res.json(tasksList);
  } catch (error) {
    console.error("Error fetching tasks: ", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/search", (req, res) => {
//   /*
// req.query

// This property is used to access query parameters in the URL.
// Example: For a request URL like /search?name=John&age=30,
// req.query.name would be "John" and req.query.age would be "30".

// This URL can be given below or in the broswer as
// http://localhost:8080/search?name=John&age=30
// */
//   const name = req.query.name;

//   /*res.send():

// Sends a response to the client (can be a string, HTML, or other types of content).
// Example: Sending plain text to the client.
// */
//   res.send(`Welcome ${name} to our website`);
// });

// /*
// req.params

// This is used to access route parameters in the URL,
// typically defined in Express routes using the : notation.
// Example: If the route is defined as /users/:id,
// and the client requests /users/123, req.params.id would be "123".
// */
// app.get("/users/:id", (req, res) => {
//   console.log(req.params.id); // Outputs: 123
//   const id = req.params.id;

//   /*
// res.json()
//  Sends a JSON response to the client. This is commonly used for APIs to send structured data.
// */
//   res.json({
//     message: `user ${id} data`,
//     data: [`user ${id} info`, `user ${id} info`, `user ${id} info`],
//   });
// });

// /*
// req.url

// Contains the full URL of the request (relative to the server’s base URL).
// */
// app.get("/check", (req, res) => {
//   console.log(req.url); // Outputs: /check
// });

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
