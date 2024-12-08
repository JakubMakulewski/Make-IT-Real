import React from 'react';
import Task from './Task.js'; // assuming this is the path to the Task file
import './Tasks.css';


const Tasks = () => {
    // Sample tasks, replace with actual data from Task.js
    // const tasks = [
    //     {id: 1, title: 'Task 1', status: 'To Do'},
    //     {id: 2, title: 'Task 2', status: 'Doing'},
    //     {id: 3, title: 'Task 3', status: 'Done'},
    // ];
    //
    // const renderTasks = (status) => {
    //     return tasks
    //         .filter(task => task.status === status)
    //         .map(task => (
    //             <Task key={task.id} title={task.title}/>
    //         ));
    // };

    return (
        <div className="tasks_list_wrapper">
            <div className="tasks_list">
                <h3>To Do</h3>
                {/*{renderTasks('To Do')}*/}
                <Task/>
                <Task/>
            </div>
            <div className="tasks_list">
                <h3>Doing</h3>
                {/*{renderTasks('Doing')}*/}
                <Task/>
            </div>
            <div className="tasks_list">
                <h3>Done</h3>
                {/*{renderTasks('Done')}*/}
                <Task/>
            </div>
        </div>
    );
};

export default Tasks;