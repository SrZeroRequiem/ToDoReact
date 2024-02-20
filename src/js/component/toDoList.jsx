import { func } from 'prop-types';
import React, { useState, useEffect } from 'react';

const ToDoList = () => {

    const [task, setTask] = useState('')
    const [taskList, setList] = useState([])
    const [user, setUser] = useState('')
    function logIn(e, user) {
        if (e.key === "Enter") {
            fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow"
            })
                .then((resp) => {
                    if (resp.status === 404) {
                        createUser(user)
                        getUser(user)
                    } else {
                        getUser(user)
                    }
                })
                .catch((error) => console.error(error));
        }
    }
    function createUser(user) {
        if (user !== "") {
            fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([]),
                redirect: "follow"
            })
                .then((response) => response.json())
                .catch((error) => console.error(error));
        } else if (user === "") {
            alert("User cant be empty")
        }
    }
    function getUser(user) {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow"
        })
            .then(resp => resp.json())
            .then(result => setList(result)
            )
            .catch(error => console.error(error))
    }
    function updateList(user) {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
            method: "PUT",
            body: JSON.stringify(taskList),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .catch(error => {
                // Error handling
                console.log(error);
            });
    }
    function deleteTask(item) {
        if (taskList.length === 1) {
            console.log("Es 1")
            setList([])
        } else {
            setList(taskList.filter((i) => i !== item))
            console.log("Mayor a 1")
        }
        updateList(user)

    }
    function addTask(e) {
        if (e.key === "Enter" && task !== "" && user !== "") {
            const taskToPush = {
                label: task,
                done: false
            }
            const handlerList = [...taskList, taskToPush]
            console.log(handlerList)
            setList(handlerList)
            updateList(user)
            setTask('')
        } else if (e.key === "Enter" && task === "" && user !== "") {
            alert("Task cant be empty")
        } else if (e.key === "Enter" && task !== "" && user === "") {
            alert("Log In!")
            setTask('')
        }
    }
    function deleteUser() {
        if (user === "") {
            alert("There is no user to delete");
        } else {
            fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                redirect: "follow"
            })
                .then((response) => response.text())
                .then((result) => {
                    setUser("");
                    setList([])
                })
                .catch((error) => console.error(error));
        }
    }
    const MapTaskList = () => {
        return (
            taskList.map((item, i) =>
                <div className="list-group-item d-flex justify-content-between rounded-0 todo-task" key={i}>
                    <p className='text-center m-0'>{item.label}</p>
                    <span className='text-center m-0 delete-button' onClick={(e) => deleteTask(item)}>X</span>
                </div>
            ))
    }
    return (
        <ul className="list-group">
            <div className="input-group mb-3">
                <label className="input-group-text rounded-0" for="username">Username</label>
                <input className="form-control rounded-0 todo-input" id='username' placeholder={(user === "") ? "Please write your username" : `User : ${user}`} type="text" onKeyDown={(e) => { logIn(e, user) }} value={user} onChange={(e) => { setUser(e.target.value) }} />
                <button type="button" className="btn btn-danger rounded-0" onClick={deleteUser}>Delete User</button>
            </div>
            <input className="list-group-item rounded-0 todo-input" placeholder={(user === "") ? "Please Log In" : ((taskList.length === 0) ? "No tasks, please add a task" : "Write your task")} type="text" onChange={(e) => setTask(e.target.value)} onKeyDown={addTask} value={task} />
            {((user !== "" && taskList.msg !== `The user ${user} doesn't exists`) && taskList.length > 0) ?
                <MapTaskList />
                :
                <div></div>
            }

        </ul>
    )
}

export default ToDoList