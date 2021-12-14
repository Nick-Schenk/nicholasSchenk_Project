const express = require("express"); // npm install express @desc create express server
const path = require("path"); // send path
const bodyParser = require("body-parser"); // npm install body-parser @desc takes input
const PORT = 4000; // defining port
var users = [];
var currentUser = {
   username: "",
   email: "",
   University: "",
   Degree: "",
   Classes: ""
};

// created app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// serving public file
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.get("/profile", (req, res) => {
   if (currentUser.username.length > 0 && currentUser.email.length > 0) {
      res.sendFile(path.join(__dirname, "/public/dropdown.html"));
   } else {
      res.redirect("/");
   }
});

// app.get("/dropdown", (req, res) => {
//    res.sendFile(path.join(__dirname, "/public/queue.html"));
// });

app.post("/login", (req, res) => {
   const data = req.body;
   currentUser.username = data.username;
   currentUser.email = data.email;
   res.redirect("/profile");
});

app.post("/update-profile", (req, res) => {
   const data = req.body;
   currentUser.University = data.University;
   currentUser.Degree = data.Degree;
   currentUser.Classes = data.Classes;
   const newUser = {...currentUser};
   users = [...users, newUser];
   console.log(users);
   res.redirect("/");
});

// app.post("/queue", (rea, res) => {
//    res.redirect("/");
// });

app.getCurrentUser;

app.listen(PORT, () => {
   console.log("App is listening at the port", PORT);
});