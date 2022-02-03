const Task = require('../models/task')

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json({status: true, tasks: tasks })
    } catch (error) {
        res.json({status: false, msg: "There was an error", tasks: null})
    }
    
}

const getTask = async (req, res) => {
    const {id} = req.params

    try {
        const task = await Task.findOne({_id: id})
        res.json({status: true, task: task })
    } catch (error) {
        res.json({status: false, msg: "There was an error", task: null})
    }
    
}

const createTask = (req, res) => {
    const {title, description} = req.body

    const task = new Task ({
        title: title, 
        description: description
    })
    
    task.save()
    .then((result) => {
        return res.json({status: true, msg: 'A new Task was created', task: result})
    })
    .catch((err) => {
        return res.json({status: false, msg: 'There was an error 😒', task: null})
    })

}

const editTask = async (req, res) => {
    const {id} = req.params
    const updateData = req.body

    try {
        const task = await Task.findByIdAndUpdate(id, updateData, {
            runValidators: true, 
            new: true
        })
        if (task) {
            res.json({status: true, task})
        } else {
            res.json({status: false, msg: "Task associated with particular id does not exists"})
        }
    } catch (error) {
        res.json({status: true, msg: "There was an error", tasks: []})
    }
    
}

const deleteTask = async (req, res) => {
    const {id} = req.params
    try {
        const task = await Task.findByIdAndDelete(id)
        if (task) {
            res.json({status: true, task: null})
        } else {
            res.json({status: false, msg: "Task associated with particular id does not exists"})
        }
    } catch (error) {
        res.json({status: true, msg: "There was an error",})
    }
    
}



module.exports = {getTasks, createTask, deleteTask, editTask, getTask}