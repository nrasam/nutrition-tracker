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

export default function Nutrients() {
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
                <div key={micro.id} className={`${styles.microRow}`}>
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
        <div className={styles.panelHd}>
          <div className={styles.panelTitle}>name</div>
          <div className={styles.panelStatsRow}>
            <div className={styles.pstat}>
              <div className={styles.pstatLbl}>Current</div>
              <div className={styles.pstatVal}>
                # <span className={styles.pstatUnit}>unit</span>
              </div>
            </div>
            <div className={styles.pstat}>
              <div className={styles.pstatLbl}>Goal</div>
              <div className={styles.pstatVal}>
                # <span className={styles.pstatUnit}>unit</span>
              </div>
            </div>
            {/* If max exists*/}
            <div className={styles.pstat}>
              <div className={styles.pstatLbl}>Upper Limits</div>
              <div className={styles.pstatVal}>
                # <span className={styles.pstatUnit}>unit</span>
              </div>
            </div>
          </div>
        </div>
        {/* Panel prog */}
        <div className={styles.panelProg}>
          <div className={styles.panelTrack}>
            <div className={styles.panelFill} />
          </div>
          <div className={styles.panelBarLbls}>
            <span>0</span>
            <span>% of goal</span>
            <span># unit</span>
          </div>
        </div>
        {/* Panel body */}
        <div className={styles.panelBody}>
          <div className={styles.panelSecLbl}>
            Best food sources (per serving, highest first)
          </div>
          {/* Food sources */}
          {MICROS[0].sources
            .sort((a, b) => b.amount - a.amount)
            .map((source, i) => (
              <div className={styles.sourceRow}>
                <span className={styles.srcRank}>#{i + 1}</span>
                <span className={styles.srcName}>{source.food}</span>
                <div className={styles.srcBarWrap}>
                  <div className={styles.srcBarTrack}>
                    <div className={styles.srcBarFill} />
                  </div>
                </div>
                <span className={styles.srcVal}>unit</span>
              </div>
            ))}
        </div>
        {/* OR if empty */}
        <div className={styles.panelEmpty}>
          <div className={styles.panelEmptyIcon}>🔬</div>
          <div>
            Select a micronutrient to see food sources ranked highest to lowest
          </div>
        </div>
      </div>
    </div>
  );
}
