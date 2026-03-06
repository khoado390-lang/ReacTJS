import { useState } from "react";
import "./Task.css";
import { flags } from "../../data/data";
import { FlagFilled } from '@ant-design/icons'

function Task({ closeModal, addTask, statusId, editingTask, updateTask }) {
    const [flagId, setFlagId] = useState(1);
    const [title, setTitle] = useState(editingTask ? editingTask.title : "");
    const [description, setDescription] = useState(editingTask ? editingTask.description : "");
    const [deadline, setDeadline] = useState(
        editingTask
            ? new Date(editingTask.deadline).toISOString().split("T")[0]
            : ""
    );
    const [assignedTo, setAssignedTo] = useState(1);
    const [status, setStatus] = useState(
        editingTask ? editingTask.statusId : statusId
    );
    const [errors, setErrors] = useState({});
    const [showFlags, setShowFlags] = useState(false);
    const handleSave = () => {
        let newErrors = {};

        if (!title) {
            newErrors.title = "Title is required";
        }

        if (!description) {
            newErrors.description = "Description is required";
        }

        if (!deadline) {
            newErrors.deadline = "End date is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }
        const newTask = {
            taskId: editingTask ? editingTask.taskId : Date.now(),
            title: title,
            description: description,
            statusId: Number(statusId),
            flagId: Number(flagId),
            assignedTo: Number(assignedTo),
            deadline: new Date(deadline)
        };
        if (editingTask) {
            updateTask(newTask);
        } else {
            addTask(newTask);
        }


        closeModal();
    };
    return (
        <div className="overlay">
            <div className="task-modal">
                <div className="modal-header">
                    <div className="priority-wrapper">
                        <FlagFilled
                            onClick={() => setShowFlags(!showFlags)}
                            style={{
                                color: flags.find(f => f.flagId === flagId)?.color,
                                fontSize: "22px",
                                cursor: "pointer"
                            }}
                        />
                        {showFlags && (
                            <div className="priority-menu">
                                {flags.map((flag) => (
                                    <FlagFilled
                                        key={flag.flagId}
                                        onClick={() => {
                                            setFlagId(flag.flagId);
                                            setShowFlags(false);
                                        }}
                                        style={{
                                            color: flag.color,
                                            fontSize: "20px",
                                            cursor: "pointer"
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                    <h2>Create a new Task</h2>
                    <span className="close" onClick={closeModal}>✕</span>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Title </label>
                        <input type="text"
                            placeholder="Type title of task" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {errors.title && <p className="error">{errors.title}</p>}
                    </div>
                    <div className="form-group small">
                        <label>End Date</label>
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        {errors.deadline && <p className="error">{errors.deadline}</p>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Description</label>
                        <textarea placeholder="Type description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}> </textarea>
                        {errors.description && <p className="error">{errors.description}</p>}
                    </div>
                    <div className="form-group small">
                        <label>Assign</label>
                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                        >
                            <option value={1}>Nguyễn Văn A</option>
                            <option value={2}>Trịnh Hồng M</option>
                            <option value={3}>Lạc Khôi B</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group small">
                        <label>Status</label>
                        <input
                            type="text"
                            value={
                                statusId === 1 ? "To Do" :
                                    statusId === 2 ? "In Progress" :
                                        statusId === 3 ? "In Review" :
                                            "Done"
                            }
                            disabled
                        />
                    </div>
                </div>
                <div className="form-footer">
                    <button
                        className="cancel"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}
export default Task;