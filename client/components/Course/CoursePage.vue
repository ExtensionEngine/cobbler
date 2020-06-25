<template>
  <div>
    <p class="small-label">{{ category }}</p>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <p>{{ new Date(start).toDateString() }} - {{ new Date(end).toDateString() }}</p>
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
  .small-label{
    font-size: 0.7rem;
    border-radius: 5px;
    background: var(--color-info);
    color: white;
    width: fit-content;
    padding: 5px 10px;
  }

</style>
