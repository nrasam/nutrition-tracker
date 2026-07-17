import styles from "./foods.module.css";

export default function Foods() {
  return (
    <div>
      {/* Split layout */}
      <div>
        {/* Left side */}
        <div>
          {/* Toolbar */}
          <div>
            <input type="text" />
            <select name="" id="">
              <option value=""></option>
            </select>
            <button>Stocked Only</button>
            <button>+ Add Food</button>
          </div>

          {/* Sort bar */}
          <div>
            <button></button>
          </div>

          {/* List */}
          <div>
            <div>
              {/* One per food */}
              <div>
                <div>
                  <div>name</div>
                  <div>
                    <span>category</span>
                    <span>stocked</span>
                  </div>
                </div>
                <div>
                  <span></span>
                </div>
                <div>
                  <span></span>
                </div>
                <div>
                  <span></span>
                </div>
                <div>
                  <span></span>
                </div>
                <div>
                  <span></span>
                </div>
              </div>
              {/* If no foods match */}
              <div>No foods match</div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div>
          {/* If selected */}
          <div>
            {/* Food panel */}
            <div>
              <div>name</div>
              <div>per serving</div>
              <div>
                <div>
                  <div>calories</div>
                </div>
                <div>
                  <div>protein</div>
                </div>
                <div>
                  <div>carbs</div>
                </div>
                <div>
                  <div>fat</div>
                </div>
                <div>
                  <div>fiber</div>
                </div>
              </div>
              {/* Panel body */}
              <div>
                {/* If food has nutrients */}
                <div>
                  <div>Micronutrients</div>
                  <div>
                    {/* Per nutrient */}
                    <div>
                      <span>name</span>
                      <div>
                        <div></div>
                      </div>
                      <span>value unit</span>
                    </div>
                  </div>
                </div>
                {/* Benefits */}
                <div>
                  <div>Benfits</div>
                  {/* If food has benefits; one per benefit */}
                  <div>
                    <span>✦</span>
                    <span>benefit</span>
                  </div>
                </div>
                {/* Warnings */}
                <div>
                  <div>Warnings</div>
                  {/* If food has warnings; one per warning */}
                  <div>
                    <span>⚠</span>
                    <span>warning</span>
                  </div>
                </div>
                {/* If nothing */}
                <div>No detailed nutrition data for this food.</div>
              </div>
            </div>
            {/* Or if no food is selected */}
            <div className={styles.panelEmpty}>
              <div>🥦</div>
              <div>
                Select a food to see its full nutrition profile, benefits, and
                warnings
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add food modal */}
      <div></div>
    </div>
  );
}
