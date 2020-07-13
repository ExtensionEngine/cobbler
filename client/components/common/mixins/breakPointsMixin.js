const mixin = {
  data() {
    const tablet = window.matchMedia('screen and (min-width: 768px)');
    const smallScreen = window.matchMedia('screen and (min-width: 1024px)');
    return {
      tablet,
      smallScreen
    };
  },
  mounted() {
    this.tablet.addListener(mediaQueryList => {
      this.tablet = mediaQueryList.matches;
    });
    this.smallScreen.addListener(mediaQueryList => {
      this.smallScreen = mediaQueryList.matches;
    });
  }
};

export default mixin;
