import styles from "./foods.module.css";
import sharedStyles from "../shared.module.css";

import type { Food } from "../../types";
import { INITIAL_FOODS } from "../../data/mockData";
import { useState } from "react";
import { statusColor, formatMicro } from "../pagesHelpers";

type SortKey = "name" | "calories" | "protein" | "carbs" | "fat" | "fiber";

export default function Foods() {
  const [foods, setFoods] = useState<Food[]>(INITIAL_FOODS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stockFilter, setStockFilter] = useState(false);

  const sorted = [...foods].sort((a, b) => a.name.localeCompare(b.name));

  const selected = foods.find((food) => food.id === selectedId) ?? null;

  return (
    <>
      {/* Split layout */}
      <div className={sharedStyles.splitLayout}>
        {/* Left side */}
        <div className={sharedStyles.splitLeft}>
          {/* Toolbar */}
          <div className={sharedStyles.toolbar}>
            <input
              className={sharedStyles.search}
              type="text"
              placeholder="Search foods"
            />
            <select className={sharedStyles.fsel} name="" id="">
              <option value=""></option>
            </select>
            <button
              className={`${sharedStyles.toggleBtn} ${stockFilter ? sharedStyles.active : ""}`}
              onClick={() => setStockFilter((prev) => !prev)}
            >
              Stocked Only
            </button>
            <button className={styles.addBtn}>+ Add Food</button>
          </div>
          {/* Sort bar */}
          <div className={sharedStyles.sortBar}>
            {(
              [
                "name",
                "calories",
                "protein",
                "carbs",
                "fat",
                "fiber",
              ] as SortKey[]
            ).map((key) => (
              <button key={key} className={`${sharedStyles.sortBtn}`}>
                {key.toUpperCase()}
              </button>
            ))}
          </div>
          {/* List */}
          <div className={sharedStyles.scrollable} style={{ paddingRight: "28px" }}>
            <div className={styles.foodList}>
              {sorted.map((food) => (
                <div
                  key={food.id}
                  className={`${styles.foodRow} ${selectedId === food.id ? styles.sel : ""}`}
                  onClick={() =>
                    setSelectedId(selectedId === food.id ? null : food.id)
                  }
                >
                  <div className={styles.foodRowInfo}>
                    <div className={styles.foodRowName}>{food.name}</div>
                    <div className={styles.foodRowMeta}>
                      <span className={styles.foodCat}>{food.category}</span>
                      <span
                        className={`${styles.stockBadge} ${food.stocked ? styles.yes : styles.no}`}
                      >
                        {food.stocked ? "stocked" : "not stocked"}
                      </span>
                    </div>
                  </div>
                  <div className={styles.foodStat}>
                    <span
                      className={styles.foodStatVal}
                      style={{ color: "var(--yellow)" }}
                    >
                      {food.calories}
                    </span>
                    <span className={styles.foodStatLbl}>kcal</span>
                  </div>
                  <div className={styles.foodStat}>
                    <span
                      className={styles.foodStatVal}
                      style={{ color: "var(--green)" }}
                    >
                      {food.protein}g
                    </span>
                    <span className={styles.foodStatLbl}>prot</span>
                  </div>
                  <div className={styles.foodStat}>
                    <span
                      className={styles.foodStatVal}
                      style={{ color: "var(--blue)" }}
                    >
                      {food.carbs}g
                    </span>
                    <span className={styles.foodStatLbl}>carbs</span>
                  </div>
                  <div className={styles.foodStat}>
                    <span
                      className={styles.foodStatVal}
                      style={{ color: "var(--orange)" }}
                    >
                      {food.fat}g
                    </span>
                    <span className={styles.foodStatLbl}>fat</span>
                  </div>
                  <div className={styles.foodStat}>
                    <span
                      className={styles.foodStatVal}
                      style={{ color: "var(--purple)" }}
                    >
                      {food.fiber}g
                    </span>
                    <span className={styles.foodStatLbl}>fiber</span>
                  </div>
                </div>
              ))}
              {/* If no foods match */}
              {sorted.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    color: "var(--text3)",
                    padding: "40px",
                    fontFamily: "var(--mono)",
                    fontSize: "13px",
                  }}
                >
                  No foods match
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className={`${sharedStyles.splitRight} ${sharedStyles.w400}`}>
          {/* If selected */}
          {selected ? (
            <>
              {/* Food panel */}
              <div className={styles.foodPanelHd}>
                <div className={styles.foodPanelName}>{selected.name}</div>
                <div className={styles.foodPanelServing}>
                  per {selected.serving}
                </div>
                <div className={styles.macroTiles}>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--yellow)" }}
                    >
                      {selected.calories}
                    </div>
                    <div className={styles.macroTileLbl}>kcal</div>
                  </div>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--green)" }}
                    >
                      {selected.protein}
                    </div>
                    <div className={styles.macroTileLbl}>protein</div>
                  </div>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--blue)" }}
                    >
                      {selected.carbs}
                    </div>
                    <div className={styles.macroTileLbl}>carbs</div>
                  </div>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--orange)" }}
                    >
                      {selected.fat}
                    </div>
                    <div className={styles.macroTileLbl}>fat</div>
                  </div>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--purple)" }}
                    >
                      {selected.fiber}
                    </div>
                    <div className={styles.macroTileLbl}>fiber</div>
                  </div>
                </div>
                {/* Panel body */}
                <div className={styles.panelBody}>
                  {/* If food has nutrients */}
                  {selected.nutrients.length > 0 && (
                    <>
                      <div className={styles.foodSectionLbl}>
                        Micronutrients
                      </div>
                      <div className={styles.nutrientList}>
                        {/* Per nutrient */}
                        {selected.nutrients.map((nut) => {
                          const max = nut.dailyMax ?? nut.value * 2;
                          const percent = Math.min(
                            100,
                            (nut.value / max) * 100,
                          );
                          return (
                            <div
                              key={nut.label}
                              className={styles.nutrientItem}
                            >
                              <span className={styles.nutrientLbl}>
                                {nut.label}
                              </span>
                              <div className={styles.nutrientTrack}>
                                <div
                                  className={styles.nutrientFill}
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <span className={styles.nutrientVal}>
                                {formatMicro(nut.value)} {nut.unit}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                  {/* Benefits */}
                  {selected.benefits.length > 0 && (
                    <>
                      <div
                        className={styles.foodSectionLbl}
                        style={{ marginTop: "16px" }}
                      >
                        Benfits
                      </div>
                      {/* If food has benefits; one per benefit */}
                      {selected.benefits.map((ben, i) => (
                        <div key={i} className={styles.benefitItem}>
                          <span className={styles.benefitDot}>✦</span>
                          <span>{ben}</span>
                        </div>
                      ))}
                    </>
                  )}
                  {/* Warnings */}
                  {selected.warnings.length > 0 && (
                    <>
                      <div
                        className={styles.foodSectionLbl}
                        style={{ marginTop: "16px" }}
                      >
                        Warnings
                      </div>
                      {/* If food has warnings; one per warning */}
                      {selected.warnings.map((warn, i) => (
                        <div key={i} className={styles.warnItem}>
                          <span className={styles.warnDot}>⚠</span>
                          <span>{warn}</span>
                        </div>
                      ))}
                    </>
                  )}
                  {/* If no nutrients or benefits */}
                  {selected.nutrients.length === 0 &&
                    selected.benefits.length === 0 && (
                      <div
                        style={{
                          color: "var(--text3)",
                          fontSize: "12px",
                          fontFamily: "var(--mono)",
                          padding: "16px 0",
                        }}
                      >
                        No detailed nutrition data for this food.
                      </div>
                    )}
                </div>
              </div>
            </>
          ) : (
            <div className={sharedStyles.panelEmpty}>
              <div className={sharedStyles.panelEmptyIcon}>🥦</div>
              <div>
                Select a food to see its full nutrition profile, benefits, and
                warnings
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Add food modal */}
      <div></div>
    </>
  );
}
