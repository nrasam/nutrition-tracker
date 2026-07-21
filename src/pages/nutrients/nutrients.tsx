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
      <div>
        {/* If selected */}
        <div>
          <div>name</div>
          <div>
            <div>
              <div>Current</div>
              <div>
                <span>unit</span>
              </div>
            </div>
            <div>
              <div>Goal</div>
              <div>
                <span>unit</span>
              </div>
            </div>
            {/* If max */}
            <div>
              <div>Upper Limits</div>
              <div>
                <span>unit</span>
              </div>
            </div>
          </div>
        </div>
        {/* Panel prog */}
        <div>
          <div>
            <div></div>
          </div>
          <div>
            <span>0</span>
            <span>% of goal</span>
            <span>goal unit</span>
          </div>
        </div>
        {/* Panel body */}
        <div>
          <div>Best food sources (per serving, highest first)</div>
          {/* Food sources */}
          <div>
            <span>#</span>
            <span>food</span>
            <div>
              <div>
                <div></div>
              </div>
            </div>
            <span>unit</span>
          </div>
        </div>
        {/* OR if empty */}
        <div>
          <div>🔬</div>
          <div>
            Select a micronutrient to see food sources ranked highest to lowest
          </div>
        </div>
      </div>
    </div>
  );
}
