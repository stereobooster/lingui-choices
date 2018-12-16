import React, { Component } from "react";
import "./App.css";
import Radio from "./components/Radio";
import Checkbox from "./components/Checkbox";

const isReact = state => state["react"];
const isInUrl = state => state["locale"] === "inUrl";
const isPrerendering = state =>
  state["html"] !== "no" && state["html"] !== undefined;
const isGettext = state => state["format"] === "gettext";
const isJson = state => state["format"] === "json";
const isSourceLocale = state => !!state["sourceLocale"];
const isDefault = state => state["keyScheme"] === "default";
const isSynthetic = state => state["keyScheme"] === "synthetic";
const isSyntheticAndDefault = state =>
  state["keyScheme"] === "syntheticAndDefault";

const isCatalogs = state => state["translations"] === "catalogs";
const isSeparateBundles = state => state["translations"] === "separateBundles";

const isWebpack = state => state["bundler"] === "webpack";
const isOtherBundler = state => state["bundler"] === "other";

const disabledHtml = state => !isReact(state);
const disabledPrerendering = state => !isReact(state) || !isInUrl(state);

class App extends Component {
  state = {
    format: "gettext",
    keyScheme: "default"
  };
  render() {
    const { state } = this;
    const stateProvider = { state, setState: this.setState.bind(this) };
    return (
      <div className="content">
        <form className="column">
          <h3>Choices</h3>

          <div className="field">
            <h4>
              What <code>format</code> do you use?
            </h4>
            <Radio name="format" value="gettext" {...stateProvider}>
              <code>po</code> (recommended)
            </Radio>
            <Radio name="format" value="json" {...stateProvider}>
              <code>json</code>
            </Radio>
          </div>

          <div className="field">
            <h4>
              Do you use <code>sourceLocale</code>?
            </h4>
            <Checkbox name="sourceLocale" {...stateProvider}>
              Yes
            </Checkbox>
          </div>

          <div className="field">
            <h4>Key scheme</h4>
            <div className="hint">
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

          <div className="field">
            <h4>How do you compile translations?</h4>
            <Radio name="translations" value="catalogs" {...stateProvider}>
              Catalog for each languge e.g. <code>main.js</code> and one of{" "}
              <code>i18n.en.js</code>, <code>i18n.cs.js</code>
            </Radio>
            <Radio
              name="translations"
              value="separateBundles"
              {...stateProvider}
            >
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
            <h4 className={disabledHtml(state) ? "disabled" : undefined}>
              Do you have prerendered HTML?
            </h4>
            <Radio
              name="html"
              value="ssr"
              {...stateProvider}
              disabled={disabledHtml(state)}
            >
              Yes, Server Side Rendering
            </Radio>
            <Radio
              name="html"
              value="prerendering"
              {...stateProvider}
              disabled={disabledPrerendering(state)}
            >
              Yes, prerendering, for example react-snap, react-static or Gatsby
            </Radio>
            <Radio
              name="html"
              value="no"
              {...stateProvider}
              disabled={disabledHtml(state)}
            >
              No
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
            <h4>How did you configure Babel?</h4>
            <Radio name="babel" value="macros" {...stateProvider}>
              macros (recommended)
            </Radio>
            <Radio name="babel" value="transform" {...stateProvider}>
              babel-transform plugin
            </Radio>
          </div>
        </form>

        <div className="column">
          <h3>Recommendations</h3>
          {isGettext(state) && isSourceLocale(state) && isDefault(state) && (
            <p>
              You may need <code>#, fuzzy</code> flag. See{" "}
              <a href="https://github.com/lingui/js-lingui/issues/383#issuecomment-435217183">
                #383
              </a>
            </p>
          )}
          {isSourceLocale(state) && isSynthetic(state) && (
            <p>
              You need to make sure you don't deliver synthetic keys to users.
              See{" "}
              <a href="https://github.com/lingui/js-lingui/issues/405">#405</a>
            </p>
          )}
          {!isJson(state) &&
            !isSourceLocale(state) &&
            isSyntheticAndDefault(state) && (
              <p>
                You may want to use <code>sourceLocale</code> otherwise default
                values won't get extracted.
              </p>
            )}
          {isCatalogs(state) && (
            <p>
              You may need to figure out how to do code splitting for catalogs.{" "}
              <a href="https://github.com/lingui/js-lingui/issues/139">#139</a>{" "}
              can improve situation.
            </p>
          )}
          {isSeparateBundles(state) && (
            <p>
              Good news! Problem with code spliting is solved if your bundler
              supports code splitting for JS, like Webpack.
            </p>
          )}
          {isPrerendering(state) && (
            <p>
              <a href="https://dev.to/stereobooster/friday-hack-suspense-concurrent-mode-and-lazy-to-load-locales-for-i18n-hgg">
                You need some workaround to prevent white flash
              </a>
            </p>
          )}
          {isCatalogs(state) && isWebpack(state) && (
            <p>
              Good news! Problem with cache invalidation is solved. Use
              something like this to load catalogs{" "}
              <code>
                {
                  'return import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */ `./locales/${locale}/messages.js`);'
                }
              </code>
            </p>
          )}
          {isCatalogs(state) && isOtherBundler(state) && (
            <p>You need to figure out how to invalidate cache for catalogs</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
