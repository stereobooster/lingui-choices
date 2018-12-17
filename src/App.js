import React, { Component } from "react";
import "./App.css";
import Radio from "./components/Radio";
import Checkbox from "./components/Checkbox";

const isReact = state => state["react"];
const isInUrl = state => state["locale"] === "inUrl";
const isPrerendering = state =>
  state["html"] !== "no" && state["html"] !== undefined;
const isGettext = state => state["format"] === "gettext";
const isLingui = state => state["format"] === "lingui";
const isSourceLocale = state => !!state["sourceLocale"];
const isDefault = state => state["keyScheme"] === "default";
const isSynthetic = state => state["keyScheme"] === "synthetic";
const isSyntheticAndDefault = state =>
  state["keyScheme"] === "syntheticAndDefault";

const isCatalogs = state => state["translations"] === "catalogs";
const isSeparateBundles = state => state["translations"] === "separateBundles";

const isWebpack = state => state["bundler"] === "webpack";
const isOtherBundler = state => state["bundler"] === "other";

const isVcsAndThirdPartyService = state =>
  state["translationStore"] === "vcsAndThirdPartyService";

const disabledHtml = state => !isReact(state);
const disabledPrerendering = state => !isReact(state) || !isInUrl(state);

class App extends Component {
  state = {
    keyScheme: "default",
    format: "gettext",
    translations: "catalogs",
    locale: "inUrl",
    bundler: "webpack",
    babel: "macros",
    html: "no",
    translationStore: "vcsAndThirdPartyService"
  };
  render() {
    const { state } = this;
    const stateProvider = { state, setState: this.setState.bind(this) };
    return (
      <div className="content">
        <form className="column">
          <h3>Choices</h3>

          <div className="field">
            <h4>Key scheme</h4>
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
            <h4>
              What <code>format</code> do you use?
            </h4>
            <Radio name="format" value="gettext" {...stateProvider}>
              <code>po</code> (recommended)
            </Radio>
            <Radio name="format" value="lingui" {...stateProvider}>
              <code>lingui</code>
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

          <div className="field">
            <h4>Where do you store translations?</h4>
            <Radio name="translationStore" value="vcs" {...stateProvider}>
              VCS (version control system) along with application code, like git
              or mercurial etc
            </Radio>
            <Radio
              name="translationStore"
              value="thirdPartyService"
              {...stateProvider}
            >
              third party service, like Phraseapp, Crowdin, Transifex etc
            </Radio>
            <Radio
              name="translationStore"
              value="vcsAndThirdPartyService"
              {...stateProvider}
            >
              VCS and third party service
            </Radio>
          </div>
        </form>

        <div className="column">
          <p>
            Source code is{" "}
            <a href="https://github.com/stereobooster/lingui-choices">here</a>
          </p>

          {isDefault(state) && (
            <React.Fragment>
              <p>
                When you use some default text (from mockups) as keys. For
                example:
                <pre>
                  {`<Trans>Credit card number</Trans>
i18n._(t\`The number in the front of your card\`)
<Plural
  value={this.state.duration}
  one="1 hour"
  other="# hours"
/>
i18n._(plural({
  value: value,
  one: "1 hour",
  other: "# hours"
}))`}
                </pre>
              </p>
              <p>
                <b>Pros</b>: you don't need naming rules, very easy to name
                things. Defaults always present.
              </p>
              <p>
                <b>Cons</b>: some text can be confusing without context, like{" "}
                <code>XXXX XXXX XXXX XXXX XXXX</code> in given example, but
                there are comments generated by Lingui, which can be used as
                context, also it is possible to use in context editor and
                something like storybook, styleguidist, cosmos to solve this.
              </p>
            </React.Fragment>
          )}

          {isSynthetic(state) && (
            <React.Fragment>
              <p>
                When you use some synthetic strings for keys. For example:
                <pre>
                  {`<Trans id="name_of_view.form.name_of_field" />
i18n._(t("name_of_view.form.name_of_field.hint")\`\`)
<Plural
  id="name_of_view.duration.value"
  value={this.state.duration}
/>
// I didn't find a way to put id in plural macro`}
                </pre>
              </p>
              <p>
                <b>Pros</b>: you can prevent collisions, you can add some
                semantics in the name and this way help translators
              </p>
              <p>
                <b>Cons</b>: you need manually support consistency of keys, you
                need to check if you already have a key for given string or you
                need to create one, you need naming rules, you need to come up
                with keys, you can argue about naming on code reviews (because
                that what developers do). You need to make sure you provide
                defaults otherwise untranslated keys can go to production
              </p>
            </React.Fragment>
          )}

          {isSyntheticAndDefault(state) && (
            <React.Fragment>
              <p>
                Combination of Synthetic and Default. For example:
                <pre>
                  {`<Trans id="name_of_view.form.name_of_field">Credit card number</Trans>
i18n._(t("name_of_view.form.name_of_field.hint")\`The number in the front of your card\`)
<Plural
  id="name_of_view.duration.value"
  value={this.state.duration}
  one="1 hour"
  other="# hours"
/>
// I didn't find a way to put id in plural macro`}
                </pre>
              </p>
              <p>
                <b>Pros</b>: Defaults always present.
              </p>
              <p>
                <b>Cons</b>: same as synthetic keys and you will have repeating
                defaults.
              </p>
            </React.Fragment>
          )}

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
          {!isLingui(state) &&
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
            <React.Fragment>
              <p>
                Good news! Problem with cache invalidation is solved. Use
                something like this to load catalogs{" "}
                <code>
                  {
                    'import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */ `./locales/${locale}/messages.js`);'
                  }
                </code>
              </p>
              <p>
                Add <code>lingui compile</code> as part of <code>start</code>,{" "}
                <code>build</code> and <code>test</code> commands
              </p>
            </React.Fragment>
          )}
          {isCatalogs(state) && isOtherBundler(state) && (
            <p>You need to figure out how to invalidate cache for catalogs</p>
          )}

          <h3>Workflow</h3>
          {isDefault(state) && isVcsAndThirdPartyService(state) && (
            <ol>
              <li>developer recieves UI specification</li>
              <li>
                developer creates component
                <ol>
                  <li>developer creates keys based on UI</li>
                  <li>developer runs script to extract keys</li>
                </ol>
              </li>
              <li>
                developer commits changes and pushes PR to
                review/testing/deployment
                <ol>
                  <li>
                    CI runs script to check that developer didn't forget to
                    extract keys
                  </li>
                  <li>
                    CI runs script to upload new keys to Third Party Service
                  </li>
                </ol>
              </li>
              <li>
                Eventually, when translations are ready, developer runs script
                to download translations and redeploys application with new
                translations
              </li>
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default App;
