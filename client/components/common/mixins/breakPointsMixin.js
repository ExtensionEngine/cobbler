const mixin = {
  data() {
    const tabletQuery = window.matchMedia('screen and (min-width: 768px)');
    const smallScreenQuery = window.matchMedia('screen and (min-width: 1024px)');
    return {
      tabletQuery,
      smallScreenQuery,
      isTablet: false,
      isSmallScreen: false
    };
  },
  created() {
    this.isTablet = this.tabletQuery.matches;
    this.isSmallScreen = this.smallScreenQuery.matches;
    this.tabletQuery.addListener(mediaQueryList => {
      this.isTablet = mediaQueryList.matches;
    });
    this.smallScreenQuery.addListener(mediaQueryList => {
      this.isSmallScreen = mediaQueryList.matches;
    });
  }
};

export default mixin;
