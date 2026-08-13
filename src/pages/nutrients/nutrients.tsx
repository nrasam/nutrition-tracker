import styles from "./nutrients.module.css";
import sharedStyles from "../shared.module.css";

import {
  TODAY_INTAKE,
  GOALS,
  CURRENT_WEIGHT,
  GOAL_WEIGHT,
  WEIGHT_HISTORY,
  MICROS,
} from "../../data/mockData";

import { statusColor, formatMicro } from "../pagesHelpers";
import { useState } from "react";

export default function Nutrients() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Return null instead of undefined if you can't find the nutrient
  const selected = MICROS.find((micro) => micro.id === selectedId) ?? null;
  // Get greatest amount of micronutrient from the selected nutrient's food sources
  const maxSource = selected
    ? Math.max(...selected.sources.map((s) => s.amount))
    : 1;
  const nutrientPercent = selected
    ? Math.round((selected.current / selected.goal) * 100)
    : 0;

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string>("All");
  const [unmetOnly, setUnmetOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"desc" | "asc" | "name">("name");

  let nutrients = MICROS.filter((micro) => {
    const matchSearch = micro.name
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
    const matchCat = catFilter === "All" || micro.category === catFilter;
    const matchUnmet = !unmetOnly || micro.current / micro.goal < 1;
    return matchSearch && matchCat && matchUnmet;
  });

  switch (sortBy) {
    case "name":
      nutrients.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "desc":
      nutrients.sort((a, b) => b.current / b.goal - a.current / a.goal);
      break;
    case "asc":
      nutrients.sort((a, b) => a.current / a.goal - b.current / b.goal);
      break;
    default:
      nutrients.sort((a, b) => b.current / b.goal - a.current / a.goal);
  }

  return (
    <div className={sharedStyles.splitLayout}>
      {/* Left side */}
      <div className={sharedStyles.splitLeft}>
        {/* Toolbar */}
        <div className={sharedStyles.toolbar}>
          <input
            className={sharedStyles.search}
            placeholder="Search for micronutrients"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={sharedStyles.fsel}
            name=""
            id=""
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Minerals">Minerals</option>
            <option value="Fats">Fats</option>
          </select>
          <button
            className={`${sharedStyles.toggleBtn} ${unmetOnly ? sharedStyles.active : ""}`}
            onClick={() => setUnmetOnly((prev) => !prev)}
          >
            Unmet goals
          </button>
        </div>
        {/* Sort Buttons */}
        <div className={sharedStyles.sortBar}>
          {(
            [
              ["name", "Name (A–Z)"],
              ["asc", "% Low → High"],
              ["desc", "% High → Low"],
            ] as [string, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              className={`${sharedStyles.sortBtn} ${sortBy === key ? sharedStyles.active : ""}`}
              onClick={() => setSortBy(key as "name" | "desc" | "asc")}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Scrollable list */}
        <div className={sharedStyles.scrollable}>
          <div className={styles.microList}>
            {nutrients.length === 0 && (
              <div className={sharedStyles.emptyList}>
                No micronutrients match your filters
              </div>
            )}
            {/* one per nutrient */}
            {nutrients.map((micro) => {
              const p = (micro.current / micro.goal) * 100;
              const color = statusColor(p);
              return (
                <div
                  key={micro.id}
                  className={`${styles.microRow} ${selectedId === micro.id ? styles.sel : ""}`}
                  onClick={() =>
                    setSelectedId(selectedId === micro.id ? null : micro.id)
                  } // If panel is open, close panel by setting to null
                >
                  <div className={styles.microRowTop}>
                    <span className={styles.microRowName}>{micro.name}</span>
                    <span className={styles.microCatBadge}>
                      {micro.category}
                    </span>
                  </div>
                  <div className={styles.microBarRow}>
                    <div className={styles.microBarTrack}>
                      <div
                        className={styles.microBarFill}
                        style={{ width: `${p}%`, background: color }}
                      />
                    </div>
                    <span className={styles.microVals}>
                      {formatMicro(micro.current)} / {formatMicro(micro.goal)}{" "}
                      {micro.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className={`${sharedStyles.splitRight} ${sharedStyles.w360}`}>
        {/* If selected */}
        {selected ? (
          <>
            <div className={styles.panelHd}>
              <div className={styles.panelTitle}>{selected.name}</div>
              <div className={styles.panelStatsRow}>
                <div className={styles.pstat}>
                  <div className={styles.pstatLbl}>Current</div>
                  <div className={styles.pstatVal}>
                    {formatMicro(selected.current)}{" "}
                    <span className={styles.pstatUnit}>{selected.unit}</span>
                  </div>
                </div>
                <div className={styles.pstat}>
                  <div className={styles.pstatLbl}>Goal</div>
                  <div className={styles.pstatVal}>
                    {formatMicro(selected.goal)}{" "}
                    <span className={styles.pstatUnit}>{selected.unit}</span>
                  </div>
                </div>
                {/* If an upper limit exists*/}
                {selected.max && (
                  <div className={styles.pstat}>
                    <div className={styles.pstatLbl}>Upper Limits</div>
                    <div className={styles.pstatVal}>
                      {formatMicro(selected.max)}{" "}
                      <span className={styles.pstatUnit}>{selected.unit}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Panel prog */}
            <div className={styles.panelProg}>
              <div className={styles.panelTrack}>
                <div
                  className={styles.panelFill}
                  style={{
                    width: `${nutrientPercent}%`,
                    background: statusColor(nutrientPercent),
                  }}
                />
              </div>
              <div className={styles.panelBarLbls}>
                <span
                  style={{
                    color: statusColor(nutrientPercent),
                  }}
                >
                  0 {selected.unit}
                </span>
                <span
                  style={{
                    color: statusColor(nutrientPercent),
                  }}
                >
                  {nutrientPercent}% of goal
                </span>
                <span
                  style={{
                    color: statusColor(nutrientPercent),
                  }}
                >
                  {formatMicro(selected.goal)} {selected.unit}
                </span>
              </div>
            </div>
            {/* Panel body */}
            <div className={styles.panelBody}>
              <div className={styles.panelSecLbl}>
                Best food sources (per serving, highest first)
              </div>
              {/* Food sources */}
              {[...selected.sources]
                .sort((a, b) => b.amount - a.amount)
                .map((source, i) => (
                  <div key={i} className={styles.sourceRow}>
                    <span className={styles.srcRank}>#{i + 1}</span>
                    <span className={styles.srcName}>{source.food}</span>
                    <div className={styles.srcBarWrap}>
                      <div className={styles.srcBarTrack}>
                        <div
                          className={styles.srcBarFill}
                          style={{
                            width: `${(source.amount / maxSource) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className={styles.srcVal}>
                      {formatMicro(source.amount)} {source.unit}
                    </span>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className={sharedStyles.panelEmpty}>
            <div className={sharedStyles.panelEmptyIcon}>🔬</div>
            <div>
              Select a micronutrient to see food sources ranked from highest to
              lowest
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
