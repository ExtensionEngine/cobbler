<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'course-page',
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }
};
</script>

<style>

</style>
