<template>
  <div class="course-card" :class="{ enrolled: enrolled }">
    <div class="course-card-title">
      <p class="category-name">{{ category }}</p>
      <h1>{{ title }}</h1>
    </div>
    <div class="course-card-description">
      <p>{{ description }}</p>
      <p>By: {{ lecturer }}</p>
      <p style="text-align: right;">{{ new Date(start).toDateString() }} - {{ new Date(end).toDateString() }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'course-card',
  props: {
    title: { type: String, default: 'Course title' },
    category: { type: String, default: 'Category' },
    description: { type: String, default: 'This is a course description' },
    users: { type: Array, default: () => [] },
    start: { type: String, default: '' },
    end: { type: Date, default: '' },
    enrolled: { type: Boolean, default: false }
  },
  computed: {
    lecturer() {
      const lecturer = this.users.find(user => user.role === 'LECTURER');
      return lecturer ? `${lecturer.firstName} ${lecturer.lastName}` : '';
    }
  }
};
</script>

<style scoped>
  .course-card {
    border: 1px solid black;
    box-shadow: 2px 2px 4px 0px var(--color-gray);
    height: fit-content;
    min-height: 230px;
    min-width: 300px;
    margin: 5px;
    border-radius: 5px;
  }

  .course-card:hover {
    cursor: pointer;
  }

  .enrolled {
    border: 2px solid green;
  }

  .course-card-title {
    background-color: var(--color-primary);
    color: white;
    display:table;
    text-align: center;
    width: 100%;
    min-height: 100px;
    height: fit-content;
    padding: 10px;
  }
  .course-card-title h1 {
   margin: 0;
   display: table-cell;
   vertical-align: middle;
  }
  .course-card-description {
    padding: 0 var(--spacing-md);
  }
</style>
