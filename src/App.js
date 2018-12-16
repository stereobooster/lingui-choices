import React, { Component } from "react";
import "./App.css";
import Radio from "./components/Radio";
import Checkbox from "./components/Checkbox";

class App extends Component {
  state = {};
  render() {
    const stateProvider = {
      state: this.state,
      setState: this.setState.bind(this)
    };

    return (
      <div className="content">
        <form className="column">
          <h3>Choices</h3>

          <div className="field">
            <h4>Key scheme</h4>
            <div className="hint">
              {" "}
              Read more{" "}
              <a href="https://github.com/lingui/js-lingui/issues/412#issue-387479674">
                here
              </a>
            </div>
            <Radio name="keyScheme" value="default" {...stateProvider}>
              Default (recommended)
            </Radio>
            <Radio name="keyScheme" value="synthetic" {...stateProvider}>
              Synthetic
            </Radio>
            <Radio
              name="keyScheme"
              value="syntheticAndDefault"
              {...stateProvider}
            >
              Synthetic + Default
            </Radio>
          </div>

          <div className="field">
            <h4>How do you compile translations?</h4>
            <Radio name="catalogs" value="catalog" {...stateProvider}>
              Catalog for ecach languge e.g. <code>main.js</code> and one of{" "}
              <code>i18n.en.js</code>, <code>i18n.cs.js</code>
            </Radio>
            <Radio name="catalogs" value="separateBundle" {...stateProvider}>
              Separate JS bundle for each language e.g. <code>main.en.js</code>{" "}
              or <code>main.cs.js</code>
            </Radio>
          </div>

          <div className="field">
            <h4>What JS library do you use?</h4>
            <Checkbox name="react" {...stateProvider}>
              React
            </Checkbox>
            <Checkbox name="plainJs" {...stateProvider}>
              Plain JS
            </Checkbox>
          </div>

          <div className="field">
            <h4>Do you have prerendered HTML?</h4>
            <Radio name="html" value="ssr" {...stateProvider}>
              Yes, Server Side Rendering
            </Radio>
            <Radio name="html" value="prerendering" {...stateProvider}>
              Yes, prerendering, for example react-snap, react-static or Gatsby
            </Radio>
            <Radio name="html" value="no" {...stateProvider}>
              No
            </Radio>
          </div>

          <div className="field">
            <h4>How did you configure Babel?</h4>
            <Radio name="babel" value="macros" {...stateProvider}>
              macros (recommended)
            </Radio>
            <Radio name="babel" value="transform" {...stateProvider}>
              babel-transform plugin
            </Radio>
          </div>

          <div className="field">
            <h4>What bundler do you use?</h4>
            <Radio name="bundler" value="webpack" {...stateProvider}>
              Webpack
            </Radio>
            <Radio name="bundler" value="other" {...stateProvider}>
              Other
            </Radio>
          </div>

          <div className="field">
            <h4>Where do you store locale?</h4>
            <Radio name="locale" value="inUrl" {...stateProvider}>
              in URL e.g. <code>example.com/en/foo</code> or{" "}
              <code>example.com/cs/foo</code>
            </Radio>
            <Radio name="locale" value="notInUrl" {...stateProvider}>
              not in URL, for example in <code>cookies</code> or{" "}
              <code>localStorage</code> or server session or server database
            </Radio>
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
