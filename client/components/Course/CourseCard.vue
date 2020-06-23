<template>
  <div class="card">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <p>From {{ start }} to {{ end }}</p>
  </div>
</template>

<script>
export default {
  name: 'course-card',
  props: {
    title: { type: String, default: 'Course title' },
    description: { type: String, default: 'This is a course description' }
  },
  data() {
    return {
      start: '',
      end: ''
    };
  }
};
</script>

<style scoped>
  .card {
    border: 1px solid black;
    border-radius: 25px;
    box-shadow: 1px 2px 2px black;
  }
</style>
