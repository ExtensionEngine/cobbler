<template>
  <div
    :style="{ height, width: computedWidth }"
    class="skeleton-loader"></div>
</template>

<script>
export default {
  name: 'skeleton-loader',
  props: {
    maxWidth: {
      default: 100,
      type: Number
    },
    minWidth: {
      default: 80,
      type: Number
    },
    height: {
      default: '1em',
      type: String
    },
    width: {
      default: null,
      type: String
    }
  },
  computed: {
    computedWidth() {
      return this.width || `${Math.floor((Math.random() * (this.maxWidth - this.minWidth)), this.minWidth)}%`;
    }
  }
};
</script>

<style lang="css" scoped>
.skeleton-loader {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  overflow: hidden;
  background-color: #DDDBDD;
  animation: shimmer 5s infinite;
}

.skeleton-loader::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(100%);
  background-image: linear-gradient(
    90deg,
    rgba(#fff, 0) 0,
    rgba(#fff, 0.2) 20%,
    rgba(#fff, 0.5) 60%,
    rgba(#fff, 0)
  );
  animation: shimmer 5s infinite;
  content: '';

}

@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: -200% 0%;
  }
}

</style>
