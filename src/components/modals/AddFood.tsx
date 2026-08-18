import styles from "./AddFood.module.css";

import { useState } from "react";

const MICRO_FIELDS: {
  key: string;
  label: string;
  unit: string;
  dailyMax?: number;
}[] = [
  { key: "vitaminD", label: "Vitamin D", unit: "IU", dailyMax: 800 },
  { key: "vitaminC", label: "Vitamin C", unit: "mg", dailyMax: 90 },
  { key: "vitaminB12", label: "Vitamin B12", unit: "mcg", dailyMax: 2.4 },
  { key: "folate", label: "Folate (B9)", unit: "mcg", dailyMax: 400 },
  { key: "iron", label: "Iron", unit: "mg", dailyMax: 18 },
  { key: "calcium", label: "Calcium", unit: "mg", dailyMax: 1000 },
  { key: "magnesium", label: "Magnesium", unit: "mg", dailyMax: 420 },
  { key: "zinc", label: "Zinc", unit: "mg", dailyMax: 11 },
  { key: "potassium", label: "Potassium", unit: "mg", dailyMax: 4700 },
  { key: "omega3", label: "Omega-3 ALA", unit: "g", dailyMax: 1.6 },
  { key: "vitaminA", label: "Vitamin A", unit: "IU", dailyMax: 5000 },
  { key: "vitaminE", label: "Vitamin E", unit: "mg", dailyMax: 15 },
  { key: "vitaminK", label: "Vitamin K", unit: "mcg", dailyMax: 120 },
  { key: "selenium", label: "Selenium", unit: "mcg", dailyMax: 55 },
];

// Creates an object with a separate property for each micro, all set to an empty string
const EMPTY_MICROS = Object.fromEntries(MICRO_FIELDS.map((m) => [m.key, ""]));

interface NewFood {
  name: string;
  category: string;
  serving: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  stocked: boolean;
  micros: Record<string, string>;
  benefits: string[];
  warnings: string[];
}

const EMPTY_FOOD: NewFood = {
  name: "",
  category: "Vegetables",
  serving: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
  fiber: "",
  stocked: true,
  micros: { ...EMPTY_MICROS },
  benefits: [],
  warnings: [],
};

export function AddFood({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<NewFood>({
    ...EMPTY_FOOD,
    micros: { ...EMPTY_MICROS },
  });
  const [microsOpen, setMicrosOpen] = useState(false);
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const [warningsOpen, setWarningsOpen] = useState(false);

  // Update the form with the field 's new value
  const set = (key: keyof NewFood, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }));
  const setMicro = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, micros: { ...prev.micros, [key]: val } }));

  // Count the # of micros in the form that are not empty
  // Checks against what should be there (MIRCO_FIELDS)
  const filledMicroCount = MICRO_FIELDS.filter(
    (m) => form.micros[m.key] !== "",
  ).length;
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
          </div>
        </div>

        {/* Category + Serving */}
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Category</label>
            <select
              className={styles.fieldInput}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {[
                "Vegetables",
                "Fruits",
                "Grains",
                "Legumes",
                "Nuts & Seeds",
                "Dairy & Eggs",
                "Poultry",
                "Fish & Seafood",
                "Red Meat",
                "Other",
              ]
                .sort()
                .map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Serving Size</label>
            <input
              className={styles.fieldInput}
              placeholder="e.g. 1 cup (250 ml)"
              value={form.serving}
              onChange={(e) => set("serving", e.target.value)}
            />
          </div>
        </div>

        {/* Macros */}
        <div className={styles.formSec}>Macros per serving</div>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Calories (kcal)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
              value={form.calories}
              onChange={(e) => set("calories", e.target.value)}
              required={true}
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
              onChange={(e) => set("protein", e.target.value)}
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
              onChange={(e) => set("carbs", e.target.value)}
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
              onChange={(e) => set("fat", e.target.value)}
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
              onChange={(e) => set("fiber", e.target.value)}
            />
          </div>
          <div className={styles.field} style={{ justifyContent: "flex-end" }}>
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
              {MICRO_FIELDS.map((micro) => (
                <div key={micro.key} className={styles.field}>
                  <label className={styles.fieldLbl}>
                    {micro.label} ({micro.unit})
                  </label>
                  <input
                    className={`${styles.fieldInput} ${styles.fieldInputSm}`}
                    type="number"
                    min="0"
                    placeholder="—"
                    value={form.micros[micro.key]}
                    onChange={(e) => setMicro(micro.key, e.target.value)}
                  />
                </div>
              ))}
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

        <div className={styles.modalFtr}>
          <button className={styles.btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btnPrimary}>Add Food</button>
        </div>
      </div>
    </div>
  );
}
