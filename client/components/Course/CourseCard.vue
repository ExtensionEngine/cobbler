<template>
  <div class="course-card">
    <div class="course-card-title">
      <h1>{{ title }}</h1>
    </div>
    <div class="course-card-description">
      <p>{{ description }}</p>
      <p>Start: {{ new Date(start).toDateString() }}</p>
      <p>End: {{ new Date(end).toDateString() }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'course-card',
  props: {
    title: { type: String, default: 'Course title' },
    description: { type: String, default: 'This is a course description' },
    start: { type: String, default: '' },
    end: { type: Date, default: '' }
  }
};
</script>

<style scoped>
  .course-card {
    border: 1px solid black;
    box-shadow: 2px 2px 4px 0px var(--color-gray);
    height: 220px;
    margin: 5px;
  }

  .course-card:hover {
    cursor: pointer;
  }
  .course-card-title {
    background-color: var(--color-primary);
    color: white;
    height: 50%;
    display:table;
    text-align: center;
    width: 100%;
  }
  .course-card-title h1 {
   margin: 0;
   display: table-cell;
   vertical-align: middle;
  }
  .course-card-description {
    padding: var(--spacing-md);
  }
</style>
