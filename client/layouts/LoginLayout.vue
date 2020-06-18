<template>
  <div>
    <nav class="navbar">
    </nav>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-layout'
};
</script>

<style scoped>
.navbar {
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 40px;
    background: #24292e;
    z-index: 1;
}
</style>
