import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "./App.css";
import { useState, useEffect } from "react";
import WelcomeMessage from "./components/WelcomeMessage";
import TodoFilter from "./components/TodoFilter"; 
import NotificationSettings from "./components/NotificationSettings";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [reminderTime, setReminderTime] = useState(30);

  const handleNewItem = (todoName, todoDate) => {
    if (todoName.trim() === "" || todoDate === "") {
      alert("Please fill in both fields");
      return;
    }

    setTodoItems((currValue) => [
      ...currValue,
        {
        id: Date.now(),
        name: todoName,
        date: todoDate,
        completed: false,
      }
    ]);

    // const newItems = {
    //   id: Date.now(),
    //   name: todoName,
    //   date: todoDate,
    //   completed: false,
    // };
    // setTodoItems((prev) => [...prev, newItems]);
  };

  // Add filtered items function
  const getFilteredItems = () => {
    switch (currentFilter) {
      case "completed":
        return todoItems.filter((item) => item.completed);
      case "incomplete":
        return todoItems.filter((item) => !item.completed);
      default:
        return todoItems;
    }
  };

  const handleDelete = (id) => {
    const newTodos = todoItems.filter((item) => item.id !== id);
    setTodoItems(newTodos);
  };

  const toggleTodo = (id) => {
    const changeStatus = todoItems.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoItems(changeStatus);
  };

  const handleEdit = (id) => {
    const todoToEdit = todoItems.find((todo) => todo.id === id);
    setEditTodo(todoToEdit);
  };

  const handleUpdateTodo = (id, newName) => {
    const updatedTodos = todoItems.map((todo) =>
      todo.id === id ? { ...todo, name: newName } : todo
    );
    setTodoItems(updatedTodos);
  };

  const handleReorder = (reorderedItems) => {
    setTodoItems(reorderedItems);
  };

  const filteredItems = getFilteredItems();

  // Check and request notification permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        }
      });
    }
  }, []);

  // Check for due tasks
  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();
      const soon = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now

      todoItems.forEach((task) => {
        if (task.date && !task.completed) {
          const dueDate = new Date(task.date);

          // If due within 30 minutes
          if (dueDate > now && dueDate <= soon) {
            showNotification(`Task due soon: ${task.name}`, {
              // body: `Due at ${dueDate.toLocaleTimeString()}`,
              body: `Due at ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              icon: "/todo-icon.png",
            });
          }
        }
      });
    };

    // Check every 5 minutes
    const interval = setInterval(checkDueTasks, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [todoItems, reminderTime]);

  const showNotification = (title, options) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, options);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        }
      });
    }
  };

  // Update reminder time from child component
  const handleReminderTimeChange = (newTime) => {
    setReminderTime(parseInt(newTime));
  };



  return (
    <center className="todo-container">
      <AppName />
      <AddTodo
        handleTodo={handleNewItem}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        setTodoItems={setTodoItems}
      />

      {/* Add TodoFilter component */}
      <TodoFilter currentFilter={currentFilter} setFilter={setCurrentFilter} />

      {filteredItems.length === 0 && <WelcomeMessage />}

      <TodoItems
        todoItems={[...filteredItems].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )}
        handleEdit={handleEdit}
        handleUpdateTodo={handleUpdateTodo}
        handleDelete={handleDelete}
        handleToggleTodo={toggleTodo}
        handleReorder={handleReorder}
      />

      <NotificationSettings onReminderTimeChange={handleReminderTimeChange} />
    </center>
  );
}

export default App;
