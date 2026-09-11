import styles from "./Settings.module.css";
import sharedStyles from "../shared.module.css";
import modalStyles from "../../components/modals/modal.module.css";

import type { Goals, GoalsInput } from "../../types";
import { useState } from "react";
import { updateGoals } from "../../services/api";

export default function Settings({
  goals,
  onSave,
  currWeightInitial,
}: {
  goals: Goals;
  onSave: (newWeight: number, updatedGoals: Goals) => void;
  currWeightInitial: number;
}) {
  const [form, setForm] = useState<GoalsInput>(goals);
  const [currWeight, setCurrWeight] = useState<number>(currWeightInitial);
  const [submitting, setSubmitting] = useState<boolean>(false);

  function handleDiscard() {
    setForm(goals);
    setCurrWeight(currWeightInitial);
  }

  async function handleSave(newWeight: number, input: GoalsInput) {
    try {
      setSubmitting(true);
      const updatedGoals = await updateGoals(input);
      onSave(newWeight, updatedGoals);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={sharedStyles.pageInner}>
      <div className={styles.gridContainer}>
        <label>Current Weight:</label>
        <input
          type="number"
          max={999}
          min={0}
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
          value={form.weightGoal}
          required={true}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, weightGoal: Number(e.target.value) }))
          }
        />
        <span>(lbs)</span>
        <label>Calorie Goal:</label>
        <input
          type="number"
          max={9999}
          min={0}
          step={10}
          value={form.calorieGoal}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              calorieGoal: Number(e.target.value),
            }))
          }
        />
        <span>(cal)</span>
        <label>Protein Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          value={form.proteinGoal}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              proteinGoal: Number(e.target.value),
            }))
          }
        />
        <span>(g)</span>
        <label>Carb Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          value={form.carbGoal}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, carbGoal: Number(e.target.value) }))
          }
        />
        <span>(g)</span>
        <label>Fat Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          value={form.fatGoal}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, fatGoal: Number(e.target.value) }))
          }
        />
        <span>(g)</span>
        <label>Fiber Goal:</label>
        <input
          type="number"
          max={999}
          min={0}
          value={form.fiberGoal}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, fiberGoal: Number(e.target.value) }))
          }
        />
        <span>(g)</span>
        <button className={modalStyles.btnGhost} onClick={handleDiscard}>
          Discard Changes
        </button>
        <button
          className={modalStyles.btnPrimary}
          onClick={() => handleSave(currWeight, form)}
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
