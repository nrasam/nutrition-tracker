import styles from "./Settings.module.css";
import sharedStyles from "../shared.module.css";

export default function Settings() {
  return (
    <div className={sharedStyles.pageInner}>
      <div className={styles.goalInput}>
        <label>Weight Goal:</label>
        <input type="number" />
      </div>
      <div>
        <label>Calorie Goal:</label>
        <input type="text" />
      </div>
      <div>
        <label>Protein Goal:</label>
        <input type="text" />
      </div>
      <div>
        <label>Carb Goal:</label>
        <input type="text" />
      </div>
      <div>
        <label>Fat Goal:</label>
        <input type="text" />
      </div>
      <div>
        <label>Fiber Goal:</label>
        <input type="text" />
      </div>
      <div className={styles.modalFtr}>
        <button className={styles.btnGhost}>Discard Changes</button>
        <button
          className={styles.btnPrimary}
          style={{ background: "var(--green)" }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
