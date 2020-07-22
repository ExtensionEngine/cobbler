export default function install(Vue, options) {
  const queries = [];
  const state = {};

  // Parse queries and create state object
  Object.entries(options).map(([key, value]) => {
    queries.push({ [key]: window.matchMedia(value) });
    state[key] = window.matchMedia(value).matches;
  });

  // Create reactive state of watchers
  const screenState = Vue.observable(state);

  // Dynamically create computed properties for breakpoints
  const mixin = { computed: {} };
  Object.entries(screenState).forEach(([key, value]) => {
    mixin.computed[`$${key}`] = () => screenState[key];
  });

  Vue.mixin(mixin);

  // Start listeners for every defined breakpoint
  queries.forEach(query => {
    query[Object.keys(query)[0]].addListener(mediaQueryList => {
      screenState[Object.keys(query)[0]] = mediaQueryList.matches;
    });
  });
}
