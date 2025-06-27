import { useEffect, useState, useRef } from "react";
import VoiceInput from "./VoiceInput";
import styles from "./AddTodo.module.css";
import { BiMessageAdd } from "react-icons/bi";

function AddTodo({ handleTodo, editTodo, setEditTodo, setTodoItems }) {
  const [todoName, setTodoName] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const noOfUpdates = useRef(0);

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
    noOfUpdates.current +=1;
  };

  const handleDateChange = (event) => {
    setTodoDate(event.target.value);
  };

  useEffect(() => {
    if (editTodo) {
      setTodoName(editTodo.name);
      setTodoDate(editTodo.date);
    }
  }, [editTodo]);

  const handleAddButton = () => {
    if (editTodo) {
      setTodoItems((prev) =>
        prev.map((todo) =>
          todo.id === editTodo.id
            ? { ...todo, name: todoName, date: todoDate }
            : todo
        )
      );
      setEditTodo(null);
    } else {
      handleTodo(todoName, todoDate);
    }

    setTodoName("");
    setTodoDate("");
  };

  const handleVoiceResult = (transcript) => {
    setTodoName(transcript);
    // Auto-focus the date field after voice input
    document.getElementById("todoDate").focus();
  };

  return (
    <>
      <div
        className={`container row g-2 align-items-center p-4 rounded-3 shadow ${styles.formContainer}`}
      >
        <div className="col-md-6">
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={`form-control ${styles.textInput}`}
              placeholder="✏️ Enter your todo..."
              value={todoName}
              onChange={handleNameChange}
            />
            <div className={styles.voiceButtonWrapper}>
              <VoiceInput onVoiceResult={handleVoiceResult} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <input
            type="date"
            className={`form-control ${styles.dateInput}`}
            value={todoDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="col-md-2">
          <button
            type="button"
            className={`btn w-100 d-flex align-items-center justify-content-center p-2 rounded-3 ${styles.addButton}`}
            onClick={handleAddButton}
          >
            <span className={styles.addIcon}>➕</span>
            <span style={{ color: "white", fontWeight: "bold" }}>
              <BiMessageAdd />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTodo;
