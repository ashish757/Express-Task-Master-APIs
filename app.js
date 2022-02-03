const apiRoutes = require('./routes/apiRoutes')
const mongoose = require('mongoose')
const express = require('express')

const app = require("express")()


const dbURI = "mongodb+srv://ashish757:ashish@testing.kxnnb.mongodb.net/TaskMaster?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then(result => app.listen(8080))
    .catch(err => console.log(err))


app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    res.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE")
    res.set("Access-Control-Allow-Headers", "content-type")
    next()
})
app.use(express.json())


app.get("/", (req, res) => {
    res.send(`
    <h1>Home</h1>
    <a href="/api/tasks">
        <h3>GET /api/tasks</h3>
    </a>
    <h3>GET /api/task/:id</h3>
    <h3>POST /api/task/create</h3>
    <h3>PATCH /api/task/edit/:id</h3>
    <h3>DELETE /api/task/delete/:id</h3>
    `)
})

app.use('/api', apiRoutes)

app.all("*", (req, res) => {
    res.status(404).send("<strong><h1>404</h1></strong>")
})