import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="content">
        <form className="column">
          <h3>Choices</h3>

          <div className="field">
            <h4>Key scheme</h4>
            <label>
              <input name="key-scheme" type="radio" /> Default (recommended)
            </label>
            <label>
              <input name="key-scheme" type="radio" /> Synthetic
            </label>
            <label>
              <input name="key-scheme" type="radio" /> Synthetic + Default
            </label>
          </div>

          <div className="field">
            <h4>How do you compile translations?</h4>
            <label>
              <input name="catlogs" type="radio" /> Catolg
              for ecach languge e.g. <code>main.js</code> and one of <code>i18n.en.js</code>, <code>i18n.cs.js</code>
            </label>
            <label>
              <input name="catlogs" type="radio" /> Separate JS bundle for each language e.g. <code>main.en.js</code> or <code>main.cs.js</code>
            </label>
          </div>

          <div className="field">
            <h4>What JS library do you use?</h4>
            <label>
              <input name="react" type="checkbox" /> React
            </label>
            <label>
              <input name="plain-js" type="checkbox" /> Plain JS
            </label>
          </div>

          <div className="field">
            <h4>How did you configure Babel?</h4>
            <label>
              <input name="babel" type="radio" /> macros (recommended)
            </label>
            <label>
              <input name="babel" type="radio" /> babel-transform plugin
            </label>
          </div>

        </form>
        <div className="column">
          <h3>Recommendations</h3>
        </div>
      </div>
    );
  }
}

export default App;
