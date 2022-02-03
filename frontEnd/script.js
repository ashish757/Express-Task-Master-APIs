const tasks = document.querySelector("#tasks")

const createTaskForm = document.querySelector("#createTask")
const editTaskForm = document.querySelector("#editTask")
const modelWrapper = document.querySelector("#modelWrapper")
const cancelModel = document.querySelector("#cancelModel")

async function fetchData(url, method = "GET", config) {
    const data = await fetch(url, {
        method: method,
        ...config
    })

    return await data.json()
} 

function showModel(id, title, description) {
    modelWrapper.classList.remove("hidden")
    modelWrapper.classList.add("grid")

    editTaskForm.id.value = id
    editTaskForm.title.value = title
    editTaskForm.description.value = description
}
function hideModel() {
    modelWrapper.classList.remove("grid")
    modelWrapper.classList.add("hidden")
}

async function deleteTask(id) {
    const task = await fetchData("http://localhost:8080/api/task/delete/"+id, "DELETE")
    if (task.status) {
        // deleted
    } else {
        // error
    }

}


async function editTask(e, id, done=false) {
    if (done) {
        const task = await fetchData("http://localhost:8080/api/task/edit/"+id, "PATCH", {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                completed: true
            })

        })
        if (task.status) {
            // updated
            e.target.closest('.task').classList.add("bg-green-200")

        } else {
            // error
        }
    } else {
        const task = await fetchData("http://localhost:8080/api/task/"+id)
        console.log(task);
        showModel(task.task._id, task.task.title, task.task.description)
    }
}

cancelModel.addEventListener('click', hideModel)
editTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const id = e.target.id.value
    const title = e.target.title.value
    const description = e.target.description.value

    const task = await fetchData("http://localhost:8080/api/task/edit/"+id, "PATCH", {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                title, description
            })

        })
        if (task.status) {
            // updated
        } else {
            // error
        }
    hideModel()
})

async function insertTasks(element) {
    const tasks = await fetchData("http://localhost:8080/api/tasks")
    tasks.tasks.forEach(task => {
        element.innerHTML += `<div class="task ${task.completed ? 'bg-green-200' : ""}">
                                <p>${task.title}</p>
                                <small>${task.description}</small>
                                <div class="footer flex justify-between pt-1">
                                    <div class="controls">
                                        <button onclick="editTask(event, '${task._id}')">Edit</button>
                                        <button onclick=deleteTask('${task._id}')>Delete</button>
                                    </div>
                                    <button class="font-semibold" onclick="editTask(event, '${task._id}', true)">Done</button>
                                </div>
                            </div>`
    });
}


insertTasks(tasks)

createTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value

    const task = await fetchData("http://localhost:8080/api/task/create", "POST", {
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            title, description
        })
    })

    if (task.status) {
        // created
    } else {
        console.log(task.msg);
    }


})



// var doc = new DOMParser().parseFromString(task, "text/xml");
// console.log(doc);

// (async () => {
//     const data = await fetchData("http://localhost:8080/api/tasks")
//     console.log(data);

// })()