import { useState } from "react";
import "./App.css";
import CardContainer from "./components/CardContainer/CardContainer";
import Task from "./components/Task/Task";
import { tasks as initialTasks } from "./data/data";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [editingTask, setEditingTask] = useState(null);

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      )
    );
  };
  const openEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };
  const openModal = (status) => {
    setEditingTask(null);
    setCurrentStatus(status);
    setShowModal(true);
  };
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className='container'>
      <main>

        <div className='searchBar'>
          <div className='search'>
            <input type="text" placeholder="Search Items" />
          </div>

          <button
            className='newitembtt'
            onClick={() => {
              setEditingTask(null);
              setCurrentStatus(null);
              setShowModal(true);
            }}
          >
            New Item
          </button>
        </div>

        <div className="board">
          <CardContainer
            title="To Do"
            statusId={1}
            tasks={tasks}
            openModal={openModal}
            openEdit={openEdit}
          />

          <CardContainer
            title="In Progress"
            statusId={2}
            tasks={tasks}
            openModal={openModal}
            openEdit={openEdit}
          />

          <CardContainer
            title="In Review"
            statusId={3}
            tasks={tasks}
            openModal={openModal}
            openEdit={openEdit}
          />

          <CardContainer
            title="Done"
            statusId={4}
            tasks={tasks}
            openModal={openModal}
            openEdit={openEdit}
          />
        </div>

        {showModal && (
          <Task
            closeModal={() => setShowModal(false)}
            addTask={addTask}
            statusId={currentStatus}
            editingTask={editingTask}
            updateTask={updateTask} 
          />
        )}  
      </main>
    </div>
  );
}
export default App;