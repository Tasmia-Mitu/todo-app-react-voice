import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import styles from "./TodoItem.module.css";

const TodoItem = ({
  todoName,
  todoDate,
  dlt,
  edit,
  toggleTodoStatus,
  completed,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todoName);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateTodo(editedText);
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setEditedText(todoName);
      setIsEditing(false);
    }
  };

  const getDateStatus = (dueDate) => {
    if (!dueDate) return "no-date";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    if (due.getTime() === today.getTime()) return "today";
    if (due < today) return "overdue";
    return "upcoming";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      year: date.getFullYear(),
      dayName: date.toLocaleString("default", { weekday: "short" }),

      status: getDateStatus(dateString),

      fullDate: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
  };

  const dateInfo = formatDate(todoDate);

  return (
    <div
      className={`container ${styles.container} ${
        completed ? styles.completed : ""
      }`}
    >
      <div className={styles.contentWrapper}>
        {/* Drag handle */}
        <div
          className="drag-handle"
          style={{ cursor: "move", padding: "0 10px", opacity: 0.5 }}
        >
          ☰
        </div>

        {/* Checkbox */}
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={toggleTodoStatus}
        />

        {/* Task Name or Editable Input */}
        <div className={styles.taskContent}>
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className={styles.editInput}
            />
          ) : (
            <div
              className={`${styles.taskText} ${
                completed ? styles.completedText : ""
              }`}
              onDoubleClick={() => !completed && setIsEditing(true)}
            >
              {todoName}
            </div>
          )}
        </div>

        {/* Date Display with Status */}
        {dateInfo ? (
          <div className={`${styles.dateContainer} ${styles[dateInfo.status]}`}>
            <span className={styles.dayName}>{dateInfo.dayName}</span>
            <div className={styles.dateDayMonth}>
              <span className={styles.dateDay}>{dateInfo.day}</span>
              <span className={styles.dateMonth}>{dateInfo.month}</span>
            </div>
            <span className={styles.dateYear}>{dateInfo.year}</span>
          </div>
        ) : (
          <div className={`${styles.dateContainer} ${styles["no-date"]}`}>
            📅 No date
          </div>
        )}

        {/* Buttons */}
        <div className={styles.actions}>
          {completed ? (
            <button className={styles.editButton}>✓</button>
          ) : (
            <button onClick={edit} className={styles.editButton}>
              <AiFillEdit />
            </button>
          )}
          <button onClick={dlt} className={styles.deleteButton}>
            <AiFillDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
