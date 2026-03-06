import { Button } from 'antd'
import { useState } from "react";
import './CardItem.css'
import { users, flags, tasks } from '../../data/data';
import { PaperClipOutlined, FlagFilled, ClockCircleOutlined } from '@ant-design/icons'
import { formatDate } from '../../utils/dateFormat';

function CardItem({ taskData, openEdit }) {
    const { title, description, assignedTo, attachments, flagId, deadline } = taskData
    const flagColor = flags.find(flag => flag.flagId == flagId)?.color || "#000000"
    const userName = users.find(user => user.userId == assignedTo)?.name || "Unassigned"
    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title">{title}</span>
                <button className="card-edit"
                onClick={() => openEdit(taskData)}
                >
                    <i className="fa-solid fa-pen"></i>
                    <div className="line"></div>
                </button>
            </div>
            <div className="card-desc">
                {description}
            </div>

            <Button className="card-btn">
                {userName}
            </Button>
            <div className='linefooter'></div>
            <div className="card-footer">
                <div className="footer-item">
                    <PaperClipOutlined />
                    <span>{attachments?.length || 0}</span>
                </div>

                <div className="footer-item flag">
                    <FlagFilled style={{ color: flagColor }} />
                </div>

                <div className="footer-item time">
                    <ClockCircleOutlined />
                    <span>{formatDate(deadline)}</span>
                </div>
            </div>
        </div>
    )
}

export default CardItem