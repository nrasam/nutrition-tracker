import styles from "./dashboard.module.css";

import {
  TODAY_INTAKE,
  GOALS,
  CURRENT_WEIGHT,
  GOAL_WEIGHT,
  WEIGHT_HISTORY,
} from "../../data/mockData";

import Ring from "../../components/Ring";

function statusColor(p: number) {
  if (p > 100) return "var(--red)";
  if (p >= 75) return "var(--green)";
  if (p >= 40) return "var(--yellow)";
  return "var(--text3)";
}

export default function Dashboard() {
  const remaining = GOALS.calories - TODAY_INTAKE.calories;

  const calorieProgress = Math.round(
    (TODAY_INTAKE.calories / GOALS.calories) * 100,
  );

  const weightGainOrLossRate = ((remaining * 7) / 3500).toFixed(2);
  const weightGoalDiff = CURRENT_WEIGHT - GOAL_WEIGHT;

  const weightMin = Math.min(...WEIGHT_HISTORY);
  const weightMax = Math.max(...WEIGHT_HISTORY);
  const weightRange = weightMax - weightMin || 1;

  const macros = [
    {
      name: "Protein",
      cur: TODAY_INTAKE.protein,
      goal: GOALS.protein,
      unit: "g",
      color: "var(--green)",
    },
    {
      name: "Carbs",
      cur: TODAY_INTAKE.carbs,
      goal: GOALS.carbs,
      unit: "g",
      color: "var(--blue)",
    },
    {
      name: "Fat",
      cur: TODAY_INTAKE.fat,
      goal: GOALS.fat,
      unit: "g",
      color: "var(--orange)",
    },
    {
      name: "Fiber",
      cur: TODAY_INTAKE.fiber,
      goal: GOALS.fiber,
      unit: "g",
      color: "var(--purple)",
    },
  ];

  return (
    <div className={styles.pageInner}>
      <div className={styles.dashTop}>
        {/* Calorie Card */}
        <div className={`${styles.card} ${styles.calCard}`}>
          <div className={styles.ringWrap}>
            <Ring
              value={TODAY_INTAKE.calories}
              max={GOALS.calories}
              color="var(--yellow)"
            />
            <div className={styles.ringCenter}>
              <span className={styles.ringNum}>
                {TODAY_INTAKE.calories.toLocaleString()}
              </span>
              <span className={styles.ringSub}>cal</span>
            </div>
          </div>
          {/* Calorie stats */}
          <div className={styles.calStats}>
            <div className={styles.cardLbl}>Calories Today</div>
            <div className={styles.calRow}>
              <span className={styles.calRowLbl}>Goal</span>
              <span className={styles.calRowVal}>
                {GOALS.calories.toLocaleString()}
              </span>
            </div>
            <div className={styles.calRow}>
              <span className={styles.calRowLbl}>Consumed</span>
              <span className={styles.calRowVal}>
                {TODAY_INTAKE.calories.toLocaleString()}
              </span>
            </div>
            <div className={styles.calRow}>
              <span className={styles.calRowLbl}>Remaining</span>
              <span
                className={styles.calRowVal}
                style={{
                  color: remaining >= 0 ? "var(--green)" : "var(--red)",
                }}
              >
                {remaining}
              </span>
            </div>
            <div className={styles.calRow}>
              <span className={styles.calRowLbl}>Progress</span>
              <span
                className={styles.calRowVal}
                style={{ color: statusColor(calorieProgress) }}
              >
                {calorieProgress}%
              </span>
            </div>
          </div>
        </div>
        {/* Deficit Card */}
        <div className={`${styles.card} ${styles.deficitCard}`}>
          <div className={styles.cardLbl}>⚖ Energy Balance</div>
          <div className={styles.deficitMain}>
            <span
              className={styles.deficitNum}
              style={{ color: remaining > 0 ? "var(--green)" : "var(--red)" }}
            >
              {remaining}
            </span>
            <span
              className={styles.deficitTag}
              style={{ color: remaining > 0 ? "var(--green)" : "var(--red)" }}
            >
              cal {remaining > 0 ? "deficit" : "surplus"}
            </span>
          </div>
          <div className={styles.deficitDesc}>
            {remaining > 0
              ? `At this rate you'll lose ~${weightGainOrLossRate} lbs/week. ${weightGoalDiff > 0 ? `${weightGoalDiff.toFixed(1)} lbs to goal.` : "At goal weight!"}`
              : `Calorie surplus today — add an activity to stay on track.`}
          </div>
          <div className={styles.deficitBarTrack}>
            <div
              className={styles.deficitBar}
              style={{
                width: `${calorieProgress}%`,
                background:
                  calorieProgress > 100 ? "var(--red)" : "var(--green)",
              }}
            ></div>
          </div>
        </div>
        {/* Weight Card */}
        <div className={`${styles.card} ${styles.wtCard}`}>
          <div className={styles.cardLbl}>Weight Tracking</div>
          <div className={styles.wtBody}>
            <div className={styles.wtMain}>
              <div className={styles.wtCurrWeight}>
                <span className={styles.wtVal}>{CURRENT_WEIGHT}</span>
                <span className={styles.wtUnit}>lbs</span>
              </div>
              <div className={styles.wtGoal}>Goal: {GOAL_WEIGHT} lbs</div>
              <div className={styles.wtDelta}>
                ▼ {(WEIGHT_HISTORY[0] - CURRENT_WEIGHT).toFixed(1)} lbs lost
              </div>
            </div>
            <div className={styles.sparkline}>
              {WEIGHT_HISTORY.map((weight, idx) => {
                // maps weight to a 0–1 range: the lightest weight becomes 0, the heaviest becomes 1
                // scale it by 28 pixels and add a min of 10 pixels
                const height = ((weight - weightMin) / weightRange) * 28 + 10;
                return (
                  <div
                    key={idx}
                    className={`${styles.spark} ${idx === WEIGHT_HISTORY.length - 1 ? styles.last : ""}`}
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Macro Bars */}
        <div className={styles.macrosRow}>
          {macros.map((m) => {
            return (
              <div key={m.name} className={styles.macroCard}>
                <div className={styles.macroName}>{m.name}</div>
                <div className={styles.macroVals}>
                  <span className={styles.macroCur}>{m.cur}</span>
                  <span className={styles.macroUnit}>{m.unit}</span>
                  <span className={styles.macroGoalTxt}>
                    / {m.goal}
                    {m.unit}
                  </span>
                </div>
                <div className={styles.macroTrack}>
                  <div className={styles.macroFill}></div>
                </div>
                <div className={styles.macroPot}>{}%</div>
              </div>
            );
          })}
        </div>
        {/* Key Micros */}
        <div className={styles.sectionLbl}>
          Key Micronutrients - <span>view all</span>
        </div>
        <div className={styles.microsDashGrid}>
          <div className={styles.mdCard}>
            <div className={styles.mdName}>
              <span>nutrient name</span>
              <span className={styles.mdPct}>%</span>
            </div>
            <div className={styles.mdTrack}>
              <div className={styles.mdFill}></div>
            </div>
            <div className={styles.mdVals}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
