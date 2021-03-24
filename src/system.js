/**
 * System.js creates the Design System Library.
 * It’s used in the system itself and when exporting it.
 *
 * You should & can add your own dependencies here if needed.
 */

// Define contexts to require
const contexts = [require.context("./components/", true, /\.vue$/)]

// Define components
const components = []
contexts.forEach(context => {
  context.keys().forEach(key => components.push(context(key).default))
})

// Install the above defined components
const System = {
  install(Vue, options = {}) {
    const themeOptions = options.tokens

    for (const colorVar in themeOptions?.colorPalette) {
      document
        .querySelector(":root")
        .style.setProperty("--oc-" + colorVar, themeOptions.colorPalette[colorVar])
    }
    components.forEach(component => Vue.component(component.name, component))
  },
}

// eslint-disable-next-line no-unused-vars
import Styles from "./styles/styles.scss"

// Automatic installation if Vue has been added to the global scope
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(System)
}

// Finally export as default
export default System
