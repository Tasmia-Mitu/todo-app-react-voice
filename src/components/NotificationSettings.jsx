import { useState, useEffect } from "react";
import styles from "./NotificationSettings.module.css";

const NotificationSettings = ({ onReminderTimeChange }) => {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result);
    });
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    onReminderTimeChange(newTime); // Send to parent
  };

  return (
    <div className={`container ${styles.settingsContainer}`}>
      <h3>Notification Settings</h3>

      <div className={styles.settingItem}>
        <label>Browser Notifications:</label>
        {permission === "granted" ? (
          <span className={styles.permissionGranted}>✓ Enabled</span>
        ) : (
          <button
            onClick={requestPermission}
            className={styles.permissionButton}
          >
            {permission === "denied"
              ? "Notifications Blocked"
              : "Enable Notifications"}
          </button>
        )}
      </div>

      <div className={styles.settingItem}>
        <label>Remind me before due:</label>
        <select
          defaultValue="30"
          onChange={handleTimeChange}
          className={styles.timeSelect}
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="1440">1 day</option>
        </select>
      </div>
    </div>
  );
};

export default NotificationSettings;
