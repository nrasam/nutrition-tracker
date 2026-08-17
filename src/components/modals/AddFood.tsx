import styles from "./AddFood.module.css";

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
};

export function AddFood() {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHd}>
          <span className={styles.modalTitle}>Add Food</span>
          <button className={styles.modalClose}>×</button>
        </div>

        {/* Name */}
        <div className={styles.formRow}>
          <div className={`${styles.field} ${styles.span2}`}>
            <label className={styles.fieldLbl}>Food Name</label>
            <input
              className={styles.fieldInput}
              placeholder="e.g. Greek Yogurt"
            />
          </div>
        </div>

        {/* Category + Serving */}
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Category</label>
            <select className={styles.fieldInput}>
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
              placeholder="e.g. 1 cup (240ml)"
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
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Protein (g)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
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
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLbl}>Fat (g)</label>
            <input
              className={styles.fieldInput}
              type="number"
              min="0"
              placeholder="0"
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
            />
          </div>
          <div className={styles.field} style={{ justifyContent: "flex-end" }}>
            <label
              className={styles.stockToggle}
              style={{ marginBottom: 0, marginTop: "auto" }}
            >
              <input type="checkbox" className={styles.stockCheck} />
              Currently stocked
            </label>
          </div>
        </div>

        {/* Micronutrients — collapsible */}
        <div className={styles.collapseHd}>
          <div className={styles.collapseHdLeft}>
            <span className={styles.collapseHdLbl}>Micronutrients</span>
            {1 > 0 && (
              <span className={styles.collapseHdCount}>{0} entered</span>
            )}
          </div>
          <span
            className={`${styles.collapseArrow} ${true ? styles.open : ""}`}
          >
            ▼
          </span>
        </div>
        {true && (
          <div className={styles.collapseBody}>
            <div className={styles.microGrid}>
              {MICRO_FIELDS.map((m) => (
                <div key={m.key} className={styles.field}>
                  <label className={styles.fieldLbl}>
                    {m.label} ({m.unit})
                  </label>
                  <input
                    className={`${styles.fieldInput} ${styles.fieldInputSm}`}
                    type="number"
                    min="0"
                    placeholder="—"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.modalFtr}>
          <button className={styles.btnGhost}>Cancel</button>
          <button className={styles.btnPrimary}>Add Food</button>
        </div>
      </div>
    </div>
  );
}
