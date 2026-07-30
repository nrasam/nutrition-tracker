import styles from "./nutrients.module.css";

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

  return (
    <div className={styles.splitLayout}>
      {/* Left side */}
      <div className={styles.splitLeft}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <input
            className={styles.search}
            placeholder="Search micronutrients"
            type="text"
          />
          <select className={styles.fsel} name="" id="">
            <option value="All">All</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Minerals">Minerals</option>
            <option value="Fats">Fats</option>
          </select>
        </div>
        {/* Scrollable list */}
        <div className={styles.scrollable}>
          <div className={styles.microList}>
            {/* one per nutrient */}
            {MICROS.map((micro) => {
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
      <div className={`${styles.splitRight} ${styles.w360}`}>
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
              {selected.sources
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
          <div className={styles.panelEmpty}>
            <div className={styles.panelEmptyIcon}>🔬</div>
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
