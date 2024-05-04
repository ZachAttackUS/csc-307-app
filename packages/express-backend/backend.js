import express from "express";
import cors from "cors";
import userFunctions from './user-services.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

// const users = {
//     users_list: [
//       {
//         id: "xyz789",
//         name: "Charlie",
//         job: "Janitor"
//       },
//       {
//         id: "abc123",
//         name: "Mac",
//         job: "Bouncer"
//       },
//       {
//         id: "ppp222",
//         name: "Mac",
//         job: "Professor"
//       },
//       {
//         id: "yat999",
//         name: "Dee",
//         job: "Aspring actress"
//       },
//       {
//         id: "zap555",
//         name: "Dennis",
//         job: "Bartender"
//       },
//       {
//         "id": "qwe123",
//         "job": "Zookeeper",
//         "name": "Cindy"
//       }
//     ]
//   };

  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userFunctions.getUsers(name, job)
      .then(users => {
        res.send({ users_list: users });
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  });
  // const findUserByName = (name) => {
    
  //   return users["users_list"].filter(
  //     (user) => user["name"] === name
  //   );
  // };
  
  // const findUserById = (id) =>
  // users["users_list"].find((user) => user["id"] === id);

  app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    userFunctions.findUserById(id)
      .then(user => {
        if (!user) {
          res.status(404).send("Resource not found.");
        } else {
          res.send(user);
        }
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  });

// const addUser = (user) => {
//     users["users_list"].push(user);
//     return user;
//   };
  
// const generateId = () => Math.random().toFixed(8)
const generateId = () => Math.random().toFixed(8)

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId()
  userFunctions.addUser(userToAdd)
    .then(newUser => {
      res.status(201).send(newUser);
    })
    .catch(error => {
      res.status(400).send({ error: error.message });
    });
});


  // const deleteUserById = (id) => {
  //   const index = users["users_list"].findIndex(user => user.id === id);
  //   if (index !== -1) {
  //     users["users_list"].splice(index, 1);
  //     return true;
  //   }
  //   return false;
  // };
  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    userFunctions.deleteUserById(id)
      .then(deleted => {
        if (deleted) {
          res.status(204).send("User deleted successfully.");
        } else {
          res.status(404).send("User not found.");
        }
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  });

  // const findUserByJob = (job) => {
  //   return users["users_list"].filter(
  //     (user) => user["job"] === job
  //   );
  // };

  // app.get("/users", (req, res) => {
  //   const name = req.query.name;
  //   const job = req.query.job;
  //   console.log(name);
  //   console.log(job);
  //   if ((name != undefined) & (job != undefined)) {
  //       let result = findUserByName(name) && findUserByJob(job);
  //       result = { users_list: result };
  //       res.send(result);
  //   } else if (name != undefined) {
  //       let result = findUserByName(name);
  //       result = { users_list: result };
  //       res.send(result);
  //   } else {
  //       res.send(users);
  //   }
  // });