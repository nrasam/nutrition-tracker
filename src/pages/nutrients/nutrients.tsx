import styles from "./nutrients.module.css";

export default function Nutrients() {
  return (
    <div className={styles.splitLayout}>
      {/* Left side */}
      <div>
        {/* Toolbar */}
        <div>
          <input type="text" />
          <select name="" id="">
            <option value="All"></option>
            <option value="Vitamins"></option>
            <option value="Minerals"></option>
            <option value="Fats"></option>
          </select>
        </div>
        {/* Scrollable list */}
        <div>
          <div>
            {/* one per nutrient */}
            <div>
              <div>
                <span>name</span>
                <span>category</span>
              </div>
              <div>
                <div>
                  <div></div>
                </div>
                <span>out of goal</span>
              </div>
            </div>
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
