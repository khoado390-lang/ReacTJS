import React from 'react'
import CardItem from '../CardItem/CardItem'
import "./CardContainer.css"

function CardContainer({ title, statusId, tasks, openModal, openEdit }) {

    const filteredTasks = tasks.filter(
        task => task.statusId === statusId
    );

    return (
        <div className="column">
            <div className="header1">
                <div>
                    <span className='headertitle'>{title}</span>
                    <span className='headernumber'>{filteredTasks.length}</span>
                </div>

                <div>
                    <button onClick={() => openModal(statusId)}>+</button>
                    <button>...</button>
                </div>
            </div>

            <div className="card-content">
                {filteredTasks.map((task) => (
                    <CardItem
                        key={task.taskId}
                        taskData={task}
                        openEdit={openEdit}
                    />
                ))}
            </div>
        </div>
    )
}

export default CardContainer