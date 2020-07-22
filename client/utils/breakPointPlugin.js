export default function install(Vue, options) {
  const { xs, sm, md, lg } = options;

  const phoneQuery = window.matchMedia(`screen and (min-width: ${xs})`);
  const tabletQuery = window.matchMedia(`screen and (min-width: ${sm})`);
  const smallScreenQuery = window.matchMedia(`screen and (min-width: ${md})`);
  const desktopQuery = window.matchMedia(`screen and (min-width: ${lg})`);

  const screenState = Vue.observable({
    isPhone: phoneQuery.matches,
    isTablet: tabletQuery.matches,
    isSmallScreen: smallScreenQuery.matches,
    isDesktop: desktopQuery.matches
  });

  Object.defineProperties(Vue.prototype, {
    $isPhone: {
      get: () => screenState.isPhone
    },
    $isTablet: {
      get: () => screenState.isTablet
    },
    $isSmallScreen: {
      get: () => screenState.isSmallScreen
    },
    $isDesktop: {
      get: () => screenState.isDesktop
    }
  });

  phoneQuery.addListener(mediaQueryList => {
    screenState.isTablet = mediaQueryList.matches;
  });
  tabletQuery.addListener(mediaQueryList => {
    screenState.isTablet = mediaQueryList.matches;
  });
  smallScreenQuery.addListener(mediaQueryList => {
    screenState.isSmallScreen = mediaQueryList.matches;
  });
  desktopQuery.addListener(mediaQueryList => {
    screenState.isSmallScreen = mediaQueryList.matches;
  });
}
