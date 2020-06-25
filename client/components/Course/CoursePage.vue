<template>
  <div>
    <p class="small-label">{{ category }}</p>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'course-page',
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, default: '' }
  }
};
</script>

<style scoped>
  .small-label{
    font-size: 0.4rem;
  }

</style>
