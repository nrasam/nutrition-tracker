import { GOALS } from "../../data/mockData";
import type { LogEntry, Totals } from "../../types";

import styles from "./TodayLog.module.css";
import sharedStyles from "../shared.module.css";

export default function TodayLog({
  log,
  onRemove,
  onClear,
  totals,
}: {
  log: LogEntry[];
  onRemove: (id: string) => void;
  onClear: () => void;
  totals: Totals;
}) {
  const goals = GOALS;
  return (
    <div className={sharedStyles.pageInner}>
      {/* Total Summary strip */}
      <div className={styles.logSummaryBar}>
        {(
          [
            {
              label: "Calories",
              val: Math.round(totals.calories),
              goal: goals.calories,
              unit: "cal",
              color: "var(--yellow)",
            },
            {
              label: "Protein",
              val: Math.round(totals.protein),
              goal: goals.protein,
              unit: "g",
              color: "var(--green)",
            },
            {
              label: "Carbs",
              val: Math.round(totals.carbs),
              goal: goals.carbs,
              unit: "g",
              color: "var(--blue)",
            },
            {
              label: "Fat",
              val: Math.round(totals.fat),
              goal: goals.fat,
              unit: "g",
              color: "var(--orange)",
            },
            {
              label: "Fiber",
              val: Math.round(totals.fiber),
              goal: goals.fiber,
              unit: "g",
              color: "var(--purple)",
            },
          ] as {
            label: string;
            val: number;
            goal: number;
            unit: string;
            color: string;
          }[]
        ).map((total) => (
          <div key={total.label} className={styles.logSumTile}>
            <div className={styles.logSumVal} style={{ color: total.color }}>
              {total.val.toLocaleString()}
            </div>
            <div className={styles.logSumLbl}>{total.label}</div>
            <div className={styles.logSumSub}>
              / {total.goal} {total.unit}
            </div>
          </div>
        ))}
      </div>

      {/* List */}
      <div className={styles.logActions}>
        {/* The # of entries */}
        <span className={styles.logCountLbl}>
          {log.length} {log.length === 1 ? "entry" : "entries"} today
        </span>
        {/* Clear All button */}
        {log.length > 0 && (
          <button className={styles.logClearBtn} onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {/* If no entries show a no foods logged screen */}
      {log.length === 0 ? (
        <div className={styles.logEmpty}>
          <div className={styles.logEmptyIcon}>🍽</div>
          <div>
            No foods logged yet today.
            <br />
            Go to the Food Library and hit{" "}
            <strong style={{ color: "var(--green)" }}>Eat</strong> to start
            tracking.
          </div>
        </div>
      ) : (
        <div className={styles.logList}>
          {[...log].reverse().map((e) => {
            const cal = Math.round(e.calories * e.servings);
            const pro = Math.round(e.protein * e.servings * 10) / 10;
            const carbs = Math.round(e.carbs * e.servings * 10) / 10;
            const fat = Math.round(e.fat * e.servings * 10) / 10;
            const fiber = Math.round(e.fiber * e.servings * 10) / 10;
            return (
              <div key={e.id} className={styles.logEntry}>
                <span className={styles.logTime}>{e.time}</span>
                <div>
                  <div className={styles.logEntryName}>
                    {e.name} [x{e.servings}]
                  </div>
                  <div className={styles.logEntryServing}>
                    ×{e.servings} · {e.serving}
                  </div>
                </div>
                <div className={styles.logStat}>
                  <span
                    className={styles.logStatVal}
                    style={{ color: "var(--yellow)" }}
                  >
                    {cal}
                  </span>
                  <span className={styles.logStatLbl}>cal</span>
                </div>
                <div className={styles.logStat}>
                  <span
                    className={styles.logStatVal}
                    style={{ color: "var(--green)" }}
                  >
                    {pro}g
                  </span>
                  <span className={styles.logStatLbl}>prot</span>
                </div>
                <div className={styles.logStat}>
                  <span
                    className={styles.logStatVal}
                    style={{ color: "var(--blue)" }}
                  >
                    {carbs}g
                  </span>
                  <span className={styles.logStatLbl}>carbs</span>
                </div>
                <div className={styles.logStat}>
                  <span
                    className={styles.logStatVal}
                    style={{ color: "var(--orange)" }}
                  >
                    {fat}g
                  </span>
                  <span className={styles.logStatLbl}>fat</span>
                </div>
                <div className={styles.logStat}>
                  <span
                    className={styles.logStatVal}
                    style={{ color: "var(--purple)" }}
                  >
                    {fiber}g
                  </span>
                  <span className={styles.logStatLbl}>fiber</span>
                </div>
                <button
                  className={styles.logRemove}
                  onClick={() => onRemove(e.id)}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
