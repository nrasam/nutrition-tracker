import { useState } from "react";
import type { Food, FoodEntry } from "../../types";
import styles from "./modal.module.css";
import { createFoodEntry } from "../../services/api";

export default function EatFood({
  food,
  onClose,
  onConfirm,
}: {
  food: Food;
  onClose: () => void;
  onConfirm: (entry: FoodEntry) => void;
}) {
  const [servings, setServings] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const cal = Math.round(food.calories * servings);
  const prot = Math.round(food.protein * servings * 10) / 10;
  const carb = Math.round(food.carbs * servings * 10) / 10;
  const fat = Math.round(food.fat * servings * 10) / 10;
  const fib = Math.round(food.fiber * servings * 10) / 10;

  async function handleLog() {
    setSubmitting(true);

    try {
      const loggedFood = await createFoodEntry(food.id, servings);
      onConfirm(loggedFood);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }

    onClose();
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal} style={{ maxWidth: 380 }}>
        <div className={styles.modalHd}>
          <span className={styles.modalTitle}>Log Food</span>
          <button className={styles.modalClose} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.eatFoodName}>{food.name}</div>
        <div className={styles.eatServingLbl}>
          per {food.serving} {food.unit}
        </div>
        <div className={styles.eatServingsRow}>
          <label>Servings</label>
          <input
            className={styles.eatServingsInput}
            type="number"
            min="0.25"
            step="0.25"
            value={servings}
            onChange={(e) =>
              setServings(Math.max(0.25, parseFloat(e.target.value) || 1))
            }
          />
        </div>
        <div className={styles.eatPreview}>
          <div className={styles.eatPrevTile}>
            <div
              className={styles.eatPrevVal}
              style={{ color: "var(--yellow)" }}
            >
              {cal}
            </div>
            <div className={styles.eatPrevLbl}>cal</div>
          </div>
          <div className={styles.eatPrevTile}>
            <div
              className={styles.eatPrevVal}
              style={{ color: "var(--green)" }}
            >
              {prot}g
            </div>
            <div className={styles.eatPrevLbl}>protein</div>
          </div>
          <div className={styles.eatPrevTile}>
            <div className={styles.eatPrevVal} style={{ color: "var(--blue)" }}>
              {carb}g
            </div>
            <div className={styles.eatPrevLbl}>carbs</div>
          </div>
          <div className={styles.eatPrevTile}>
            <div
              className={styles.eatPrevVal}
              style={{ color: "var(--orange)" }}
            >
              {fat}g
            </div>
            <div className={styles.eatPrevLbl}>fat</div>
          </div>
          <div className={styles.eatPrevTile}>
            <div
              className={styles.eatPrevVal}
              style={{ color: "var(--purple)" }}
            >
              {fib}g
            </div>
            <div className={styles.eatPrevLbl}>fiber</div>
          </div>
        </div>
        <div className={styles.modalFtr}>
          <button className={styles.btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.btnPrimary}
            style={{ background: "var(--green)" }}
            onClick={handleLog}
          >
            {submitting ? "Logging..." : "Log Food"}
          </button>
        </div>
      </div>
    </div>
  );
}
