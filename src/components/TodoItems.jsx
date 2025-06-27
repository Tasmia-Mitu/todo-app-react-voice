import SortableList from "./SortableList";
import TodoItem from "./TodoItem";

function TodoItems({
  todoItems,
  handleDelete,
  handleToggleTodo,
  handleEdit,
  handleUpdateTodo,
  handleReorder,
}) {
  const handleSort = (oldIndex, newIndex) => {
    if (oldIndex === newIndex) return;

    const itemsCopy = [...todoItems];
    const [movedItem] = itemsCopy.splice(oldIndex, 1);
    itemsCopy.splice(newIndex, 0, movedItem);

    // You'll need to pass this up to parent component
    handleReorder(itemsCopy);
  };

  return (
    <SortableList
      items={todoItems}
      onSort={handleSort}
      renderItem={(item) => (
        <div key={item.id} data-id={item.id}>
          <TodoItem
            todoName={item.name}
            todoDate={item.date}
            completed={item.completed}
            edit={() => handleEdit(item.id)}
            updateTodo={(newName) => handleUpdateTodo(item.id, newName)}
            dlt={() => handleDelete(item.id)}
            toggleTodoStatus={() => handleToggleTodo(item.id)}
          />
        </div>
      )}
    />
  );
}

export default TodoItems;
