<template>
  <div>
    <div class="course-info">
      <span class="small-label category-label">{{ category }}</span>
      <span class="small-label date-label">
        {{ new Date(start).toDateString() }} - {{ new Date(end).toDateString() }}
      </span>
    </div>
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
    category: { type: String, default: '' },
    start: { type: Date, default: '' },
    end: { type: Date, default: '' }
  }
};
</script>

<style scoped>

  .category-label {
    background: var(--color-info);
    color: white;
  }

  .date-label {
    background: var(--color-success);
    color: white;
  }

  .small-label{
    font-size: 0.7rem;
    border-radius: 5px;
    width: fit-content;
    padding: 5px 10px;
    margin-right: 10px
  }

</style>
