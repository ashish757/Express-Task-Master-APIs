const express = require('express')
const router = express.Router()

const apiController = require("../controllers/apiController") 


router.get("/tasks",  apiController.getTasks)
router.get("/task/:id",  apiController.getTask)
router.post("/task/create",  apiController.createTask)
router.patch("/task/edit/:id",  apiController.editTask)
router.delete("/task/delete/:id",  apiController.deleteTask)


module.exports = router
