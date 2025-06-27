import styles from "./TodoFilter.module.css";

const TodoFilter = ({ currentFilter, setFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${
          currentFilter === "all" ? styles.active : ""
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`${styles.filterButton} ${
          currentFilter === "completed" ? styles.active : ""
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={`${styles.filterButton} ${
          currentFilter === "incomplete" ? styles.active : ""
        }`}
        onClick={() => setFilter("incomplete")}
      >
        Incomplete
      </button>
    </div>
  );
};

export default TodoFilter;
