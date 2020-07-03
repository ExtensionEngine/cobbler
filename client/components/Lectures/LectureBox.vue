<template>
  <div class="container">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'lecture-box',
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }
};
</script>

<style lang="css" scoped>
.container {
  padding: 0 15px;
}
</style>
