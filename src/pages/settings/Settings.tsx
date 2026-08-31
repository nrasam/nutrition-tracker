import styles from "./Settings.module.css";
import sharedStyles from "../shared.module.css";
import modalStyles from "../../components/modals/modal.module.css";

import type { Goals } from "../../types";
import { useState } from "react";

export default function Settings({
  goals,
  onSave,
  currWeightInitial,
}: {
  goals: Goals;
  onSave: (w: number, g: Goals) => void;
  currWeightInitial: number;
}) {
  const [form, setForm] = useState<Goals>(goals);
  const [currWeight, setCurrWeight] = useState<number>(currWeightInitial);

  function handleDiscard() {
    setForm(goals);
    setCurrWeight(currWeightInitial);
  }

  return (
    <div className={sharedStyles.pageInner}>
      <div className={styles.gridContainer}>
        <label>Current Weight:</label>
        <input
          type="number"
          max={999}
          min={0}
          defaultValue={currWeightInitial}
          value={currWeight}
          required={true}
          onChange={(e) => setCurrWeight(parseFloat(e.target.value))}
        />
        <span>(lbs)</span>
        <label>Weight Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          defaultValue={goals.weight}
          value={form.weight}
          required={true}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, weight: Number(e.target.value) }))
          }
        />
        <span>(lbs)</span>
        <label>Calorie Goal:</label>
        <input
          type="number"
          max={9999}
          min={0}
          defaultValue={goals.cal}
          step={10}
          value={form.cal}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, cal: Number(e.target.value) }))
          }
        />
        <span>(cal)</span>
        <label>Protein Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          defaultValue={goals.protein}
          value={form.protein}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, protein: Number(e.target.value) }))
          }
        />
        <span>(g)</span>
        <label>Carb Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          defaultValue={goals.carb}
          value={form.carb}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, carb: Number(e.target.value) }))
          }
        />
        <span>(g)</span>
        <label>Fat Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          defaultValue={goals.fat}
          value={form.fat}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, fat: Number(e.target.value) }))
          }
        />
        <span>(g)</span>
        <label>Fiber Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          defaultValue={goals.fiber}
          value={form.fiber}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, fiber: Number(e.target.value) }))
          }
        />
        <span>(g)</span>
        <button className={modalStyles.btnGhost} onClick={handleDiscard}>
          Discard Changes
        </button>
        <button
          className={modalStyles.btnPrimary}
          onClick={() => onSave(currWeight, form)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
