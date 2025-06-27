// AppName.jsx
import styles from "./AppName.module.css";

function AppName() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        <span className={styles.icon}>✓</span>
        <span className={styles.text}>TASKIFY</span>
        <span className={styles.icon}>✓</span>
      </h1>
      <div className={styles.underline}></div>
    </div>
  );
}

export default AppName;
