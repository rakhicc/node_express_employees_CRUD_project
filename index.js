"use strict";

const http = require("http");
const path = require("path");
const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

const Datastorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = new Datastorage();
const server = http.createServer(app);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pageViews"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/all", (req, res) =>
  dataStorage
    .getAll()
    .then((data) => res.render("allPersons", { result: data }))
);
app.get("/getPerson", (req, res) =>
  res.render("getPerson", { title: "Get", header: "Get", action: "/getPerson" })
);
app.post("/getPerson", (req, res) => {
  if (!req.body) res.sendStatus(500);
  const employeeId = req.body.id;
  console.log(employeeId);
  dataStorage
    .getOne(employeeId)
    .then((employee) => res.render("personPage", { result: employee }))
    .catch((error) => sendErrorpage(res, error));
});
app.get("/removeperson", (req, res) =>
  res.render("getPerson", {
    title: "Remove",
    header: "Remove a Person",
    action: "/removeperson",
  })
);

app.post("/removeperson", (req, res) => {
  if (!req.body) res.sendStatus(500);
  const employeeid = req.body.id;
  dataStorage
    .remove(employeeid)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorpage(res, error));
});


app.get('/inputform',(req,res)=>res.render('form',{
  title:'Add employee',
  header:'Add a new Employee',
  action:'/insert',
  id:{value:'',readonly:''},
  firstname:{value:'',readonly:''},
  Lastname:{value:'',readonly:''},
  department:{value:'',readonly:''},
  salary:{value:'',readonly:''},
}));
app.post('/insert',(req,res)=>{
  if(!req.body) res.sendStatus(500);
  dataStorage.insert(req.body)
  .then(status=>sendStatusPage(res,status))
  .catch(error=>sendErrorpage(res,error));
}
)

app.get('/updateform',(req,res)=>res.render('form',{
  title:'Update employee',
  header:'Modify Employee',
  action:'/updatedata',
  id:{value:'',readonly:''},
  firstname:{value:'',readonly:'readonly'},
  Lastname:{value:'',readonly:'readonly'},
  department:{value:'',readonly:'readonly'},
  salary:{value:'',readonly:'readonly'},
}));

app.post('/updatedata',(req,res)=>{
  if(!req.body) res.sendStatus(500);
  dataStorage.getOne(req.body.id).then(person=> res.render('form',{
    title:'update Employee',
    header:'Update Employee',
    action:'/update',
    id:{value:person.id,readonly:'readonly'},
firstname:{value:person.firstname,readonly:''},
Lastname:{value:person.Lastname,readonly:''},
salary:{value:person.salary,readonly:''},
department:{value:person.department,readonly:''},

  })).catch(error=>sendErrorpage(res,error));
})

app.post('/update',(req,res)=>{
  if(!req.body) res.sendStatus(500);
  dataStorage.update(req.body)
  .then(status=>sendStatusPage(res,status))
  .catch(error=>sendErrorpage(res,error));
}
)
const menuPath = path.join(__dirname, "menu.html");
app.get("/", (req, res) => res.sendFile(menuPath));
server.listen(port, host, () => console.log(`${host}:${port} is listening`));

function sendErrorpage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}
function sendStatusPage(res, status, title = "status", header = "status") {
  return res.render("statusPage", {
    title: title,
    header: header,
    status: status,
  });
}
