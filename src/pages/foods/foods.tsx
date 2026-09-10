import styles from "./foods.module.css";
import sharedStyles from "../shared.module.css";

import type { Food, FoodEntry, Micro } from "../../types";
import { useState, useMemo } from "react";
import { AddFood } from "../../components/modals/AddFood";
import EatFood from "../../components/modals/EatFood";
import { deleteFood } from "../../services/api";

type SortKey = "name" | "calories" | "protein" | "carbs" | "fat" | "fiber";

export default function Foods({
  foodsList,
  loading,
  onEat,
  microList,
}: {
  foodsList: Food[];
  loading: Boolean;
  onEat: (entry: FoodEntry) => void;
  microList: Micro[];
}) {
  if (loading) {
    return <p>Loading foods...</p>;
  }

  const [foods, setFoods] = useState<Food[]>(foodsList);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [stockFilter, setStockFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [showAddFood, setShowAddFood] = useState(false);
  const [foodToEat, setFoodToEat] = useState<Food | null>(null);

  const sorted = useMemo(() => {
    let list = foods.filter((food) => {
      const matchSearch = food.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
      const matchCat = catFilter === "ALL" || food.category === catFilter;
      const matchStocked = !stockFilter || food.stocked;

      return matchSearch && matchCat && matchStocked;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "name") {
        return sortDir === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortDir === "asc"
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];
      }
    });

    return list;
  }, [foods, search, catFilter, stockFilter, sortBy, sortDir]);

  const selected = foods.find((food) => food.id === selectedId) ?? null;

  // Dynamically get unique list of food categories
  const categories = [...new Set(foods.map((food) => food.category))].sort();

  function handleSort(key: SortKey) {
    // Reverse sort direction if the same sort is clicked again
    if (sortBy === key) setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    else {
      // Otherwise change sort
      setSortBy(key);
      // Reset sorting direction to desc unless sorting by name
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  // Turns NUTS_SEEDS to Nuts & Seeds
  function formatCategory(cat: string) {
    return cat
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" & ");
  }

  async function handleDeleteFood(id: number | null) {
    if (!id) {
      console.error("Failed to delete food: ID is null!");
      return;
    }

    try {
      await deleteFood(id);
      setFoods((prev) => prev.filter((f) => f.id !== id));
      setSelectedId(null);
    } catch (error) {
      console.error(error);
    }
  }

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className={sharedStyles.fsel}
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {formatCategory(cat)}
                </option>
              ))}
            </select>
            <button
              className={`${sharedStyles.toggleBtn} ${stockFilter ? sharedStyles.active : ""}`}
              onClick={() => setStockFilter((prev) => !prev)}
            >
              Stocked Only
            </button>
            <button
              className={styles.addBtn}
              onClick={() => setShowAddFood(true)}
            >
              + Add Food
            </button>
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
              <button
                key={key}
                className={`${sharedStyles.sortBtn} ${sortBy === key ? sharedStyles.active : ""}`}
                onClick={() => handleSort(key)}
              >
                {key.toUpperCase()}
                {sortBy === key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
              </button>
            ))}
          </div>

          {/* Food List */}
          <div
            className={sharedStyles.scrollable}
            style={{ paddingRight: "28px" }}
          >
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
                      <span className={styles.foodCat}>
                        {formatCategory(food.category)} | {food.serving}
                      </span>
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
                    <span className={styles.foodStatLbl}>cal</span>
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
                  <button
                    className={styles.eatBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFoodToEat(food);
                    }}
                  >
                    Eat
                  </button>
                </div>
              ))}
              {/* If no foods match */}
              {sorted.length === 0 && !loading && (
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
                <div className={styles.foodPanelHdTop}>
                  <div className={styles.foodPanelName}>{selected.name}</div>
                  <div className={styles.panelActions}>
                    <button className={styles.panelEditBtn} disabled>
                      Edit (WIP)
                    </button>
                    <button
                      className={styles.panelDeleteBtn}
                      onClick={() => handleDeleteFood(selectedId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className={styles.foodPanelServing}>
                  per {selected.serving} {selected.unit}
                </div>
                <div className={styles.macroTiles}>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--yellow)" }}
                    >
                      {selected.calories}
                    </div>
                    <div className={styles.macroTileLbl}>cal</div>
                  </div>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--green)" }}
                    >
                      {selected.protein}g
                    </div>
                    <div className={styles.macroTileLbl}>protein</div>
                  </div>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--blue)" }}
                    >
                      {selected.carbs}g
                    </div>
                    <div className={styles.macroTileLbl}>carbs</div>
                  </div>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--orange)" }}
                    >
                      {selected.fat}g
                    </div>
                    <div className={styles.macroTileLbl}>fat</div>
                  </div>
                  <div className={styles.macroTile}>
                    <div
                      className={styles.macroTileVal}
                      style={{ color: "var(--purple)" }}
                    >
                      {selected.fiber}g
                    </div>
                    <div className={styles.macroTileLbl}>fiber</div>
                  </div>
                </div>
              </div>
              {/* Panel body */}
              <div className={sharedStyles.panelBody}>
                {/* If food has nutrients */}
                {selected.nutrients.length > 0 && (
                  <>
                    <div className={styles.foodSectionLbl}>Micronutrients</div>
                    <div className={styles.nutrientList}>
                      {/* Per nutrient */}
                      {selected.nutrients
                        .sort(
                          (a, b) =>
                            b.amount / b.micro.goal - a.amount / a.micro.goal,
                        )
                        .map((nut) => {
                          const max = nut.micro.goal ?? nut.amount * 2;
                          const percent = Math.min(
                            100,
                            (nut.amount / max) * 100,
                          );
                          return (
                            <div
                              key={nut.micro.name}
                              className={styles.nutrientItem}
                            >
                              <span className={styles.nutrientLbl}>
                                {nut.micro.name}
                              </span>
                              <div className={styles.nutrientTrack}>
                                <div
                                  className={styles.nutrientFill}
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <span className={styles.nutrientVal}>
                                {Number(percent).toFixed(1)}%
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
      {showAddFood && (
        <AddFood
          onClose={() => setShowAddFood(false)}
          onAdd={(food) => setFoods((prev) => [...prev, food])}
          microsList={microList}
        />
      )}
      {/* Eat food modal */}
      {foodToEat && (
        <EatFood
          food={foodToEat}
          onClose={() => setFoodToEat(null)}
          onConfirm={onEat}
        />
      )}
    </>
  );
}
