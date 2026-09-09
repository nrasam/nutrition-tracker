import type { NewFood, Food, Micro, FoodCategory } from "../../types";
import styles from "./modal.module.css";

import { useState } from "react";
import { createFood } from "../../services/api";

const CATEGORY_LABELS: Record<FoodCategory, string> = {
  DAIRY: "Dairy",
  EGGS: "Eggs",
  FISH_SEAFOOD: "Fish & Seafood",
  FRUITS: "Fruits",
  GRAINS: "Grains",
  LEGUMES: "Legumes",
  NUTS_SEEDS: "Nuts & Seeds",
  POULTRY: "Poultry",
  RED_MEAT: "Red Meat",
  VEGETABLES: "Vegetables",
  DRINKS: "Drinks",
};

const EMPTY_FOOD: NewFood = {
  name: "",
  category: "DAIRY",
  serving: 1,
  unit: "",
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  stocked: true,
  nutrients: [],
  benefits: [],
  warnings: [],
};

export function AddFood({
  onClose,
  onAdd,
  microsList,
}: {
  onClose: () => void;
  onAdd: (food: Food) => void;
  microsList: Micro[];
}) {
  const [micros] = useState<Micro[]>(microsList);
  const [form, setForm] = useState<NewFood>({
    ...EMPTY_FOOD,
  });
  const [microsOpen, setMicrosOpen] = useState(false);
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const [warningsOpen, setWarningsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Update the form with the field 's new value
  const set = (key: keyof NewFood, val: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [key]: val }));

    // Clear error for this field when user starts typing
    if (errors[key as string]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const setNutrient = (microId: number, val: string) =>
    setForm((prev) => {
      const parsed = parseFloat(val) || 0;
      const existing = prev.nutrients.filter((n) => n.microId !== microId);

      // Only keep the entry if parsed is non-zero
      return {
        ...prev,
        nutrients:
          parsed !== 0 ? [...existing, { microId, value: parsed }] : existing,
      };
    });

  // Count the # of nutrients in the form that are not empty
  const filledMicroCount = form.nutrients.length;
  const filledBenefits = form.benefits.filter((b) => b.trim() !== "").length;
  const filledWarnings = form.warnings.filter((w) => w.trim() !== "").length;

  // Adds an empty benefit or warning to the form's benefit/warning array
  const addBenOrWarning = (field: "benefits" | "warnings") =>
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  // Update Benefits or warnings list with the new value
  const updateList = (field: "benefits" | "warnings", i: number, val: string) =>
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[i] = val;
      return { ...prev, [field]: arr };
    });
  // Removes the item from the benefits or warnings array at position i
  const removeItem = (field: "benefits" | "warnings", i: number) =>
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, idx) => idx !== i),
    }));

  async function handleAdd() {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!form.name.trim()) {
      newErrors.name = "Food name is required!";
    }

    // If there are errors, show them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    const test = {
      name: form.name.trim(),
      category: form.category,
      serving: form.serving || 1,
      unit: form.unit || "serving",
      calories: form.calories || 0,
      protein: form.protein || 0,
      carbs: form.carbs || 0,
      fat: form.fat || 0,
      fiber: form.fiber || 0,
      stocked: form.stocked,
      benefits: form.benefits.filter((b) => b.trim() !== ""),
      warnings: form.warnings.filter((w) => w.trim() !== ""),
      nutrients: form.nutrients, // already { microId, value }, matches FoodNutrient's create shape
    };

    console.log(test);

    try {
      const newFood = await createFood(test);

      onAdd(newFood);
      onClose();
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Couldn't save this food. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={styles.overlay}
      // Only close when clicking on the overlay
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.modalHd}>
          <span className={styles.modalTitle}>Add Food</span>
          <button className={styles.modalClose} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Name */}
        <div className={styles.formRow}>
          <div className={`${styles.field} ${styles.span2}`}>
            <label className={styles.fieldLbl}>Food Name</label>
            <input
              className={styles.fieldInput}
              placeholder="e.g. Greek Yogurt"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required={true}
            />
            {errors.name && (
              <span className={styles.validationErrorMsg}>{errors.name}</span>
            )}
          </div>
        </div>

        {/* Category + Serving */}
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Category</label>
            <select
              className={styles.fieldInput}
              value={form.category}
              onChange={(e) => set("category", e.target.value as FoodCategory)}
            >
              {Object.entries(CATEGORY_LABELS)
                .sort((a, b) => a[1].localeCompare(b[1]))
                .map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Serving Size</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="e.g. 1"
              value={form.serving}
              onChange={(e) => set("serving", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Serving Unit</label>
            <input
              className={styles.fieldInput}
              placeholder="e.g. cup"
              value={form.unit}
              onChange={(e) => set("unit", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.stockToggle}>
              <input
                type="checkbox"
                className={styles.stockCheck}
                checked={form.stocked}
                onChange={(e) => set("stocked", e.target.checked)}
              />
              Currently stocked
            </label>
          </div>
        </div>

        {/* Macros */}
        <div className={styles.formSec}>Macros per serving</div>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Calories (cal)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              value={form.calories}
              onChange={(e) => set("calories", parseFloat(e.target.value) || 0)}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Protein (g)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              value={form.protein}
              onChange={(e) => set("protein", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Carbs (g)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              value={form.carbs}
              onChange={(e) => set("carbs", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Fat (g)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              value={form.fat}
              onChange={(e) => set("fat", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Fiber (g)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              value={form.fiber}
              onChange={(e) => set("fiber", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Micronutrients — collapsible */}
        <div
          className={styles.collapseHd}
          onClick={() => setMicrosOpen((p) => !p)}
        >
          <div className={styles.collapseHdLeft}>
            <span className={styles.collapseHdLbl}>Micronutrients</span>
            {filledMicroCount > 0 && (
              <span className={styles.collapseHdCount}>
                {filledMicroCount} entered
              </span>
            )}
          </div>
          <span
            className={`${styles.collapseArrow} ${microsOpen ? styles.open : ""}`}
          >
            ▼
          </span>
        </div>

        {microsOpen && (
          <div className={styles.collapseBody}>
            <div className={styles.microGrid}>
              {micros.map((micro) => {
                const existing = form.nutrients.find(
                  (n) => n.microId === micro.id,
                );
                return (
                  <div key={micro.id} className={styles.field}>
                    <label className={styles.fieldLbl}>
                      {micro.name} ({micro.unit})
                    </label>
                    <input
                      className={`${styles.fieldInput} ${styles.fieldInputSm}`}
                      type="number"
                      min="0"
                      placeholder="—"
                      value={existing?.value || ""}
                      onChange={(e) => setNutrient(micro.id, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Benefits — collapsible */}
        <div
          className={styles.collapseHd}
          onClick={() => setBenefitsOpen((p) => !p)}
        >
          <div className={styles.collapseHdLeft}>
            <span className={styles.collapseHdLbl}>Benefits</span>
            {filledBenefits > 0 && (
              <span className={`${styles.collapseHdCount} ${styles.green}`}>
                {filledBenefits} added
              </span>
            )}
          </div>
          <span
            className={`${styles.collapseArrow} ${benefitsOpen ? styles.open : ""}`}
          >
            ▼
          </span>
        </div>

        {benefitsOpen && (
          <div className={styles.collapseBody}>
            {form.benefits.map((ben, i) => (
              <div key={i} className={styles.listItemRow}>
                <input
                  className={`${styles.fieldInput} ${styles.fieldInputSm}`}
                  placeholder="e.g. Rich in antioxidants that reduce inflammation"
                  value={ben}
                  onChange={(e) => updateList("benefits", i, e.target.value)}
                />
                <button
                  className={styles.listRemoveBtn}
                  onClick={() => removeItem("benefits", i)}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className={styles.listAddBtn}
              onClick={() => {
                addBenOrWarning("benefits");
                setBenefitsOpen(true);
              }}
            >
              ＋ Add benefit
            </button>
          </div>
        )}

        {/* Warnings — collapsible */}
        <div
          className={styles.collapseHd}
          onClick={() => setWarningsOpen((p) => !p)}
        >
          <div className={styles.collapseHdLeft}>
            <span className={styles.collapseHdLbl}>Warnings</span>
            {filledWarnings > 0 && (
              <span className={`${styles.collapseHdCount} ${styles.orange}`}>
                {filledWarnings} added
              </span>
            )}
          </div>
          <span
            className={`${styles.collapseArrow} ${warningsOpen ? styles.open : ""}`}
          >
            ▼
          </span>
        </div>

        {warningsOpen && (
          <div className={styles.collapseBody}>
            {form.warnings.map((warn, i) => (
              <div key={i} className={styles.listItemRow}>
                <input
                  className={`${styles.fieldInput} ${styles.fieldInputSm}`}
                  placeholder="e.g. High in sodium — limit if managing blood pressure"
                  value={warn}
                  onChange={(e) => updateList("warnings", i, e.target.value)}
                />
                <button
                  className={styles.listRemoveBtn}
                  onClick={() => removeItem("warnings", i)}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className={styles.listAddBtn}
              onClick={() => {
                addBenOrWarning("warnings");
                setWarningsOpen(true);
              }}
            >
              ＋ Add warning
            </button>
          </div>
        )}

        {errors.submit && (
          <span className={styles.validationErrorMsg}>{errors.submit}</span>
        )}

        <div className={styles.modalFtr}>
          <button
            className={styles.btnGhost}
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            className={styles.btnPrimary}
            onClick={handleAdd}
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add Food"}
          </button>
        </div>
      </div>
    </div>
  );
}
