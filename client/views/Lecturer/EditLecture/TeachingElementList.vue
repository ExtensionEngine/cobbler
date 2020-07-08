<template>
  <div>
    <div
      v-for="element in teachingElements"
      :key="element.id"
      class="teaching-element flex-v align-center">
      <h3>{{ element.name }}</h3>
      <p>type: {{ element.type }}</p>
      <p>label: {{ element.label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teaching-element-list',
  props: {
    teachingElements: { type: Array, required: true }
  }
};
</script>

<style scoped>
    .teaching-element {
        border: 1px solid var(--color-black);
        padding: var(--spacing-xs)
    }
</style>
