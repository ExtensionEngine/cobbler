<template>
  <div>
    <button @click="$emit('toggle-expand', id)" type="button" class="collapsible text-center">
      {{ title }}
    </button>
    <div :class="{ expanded }" class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collapsible',
  props: {
    id: { type: Number, default: null },
    title: { type: String, default: null },
    expanded: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
.collapsible {
  background-color: var(--color-primary);
  color: var(--color-white);
  cursor: pointer;
  padding: var(--spacing-xs);
  width: 100%;
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  outline: none;
}
.active, .collapsible:hover {
  background-color: var(--color-primary-500);
}
.content {
  padding: 0 var(--spacing-md);
  overflow: hidden;
  background-color: var(--colors-white);
  border: solid 1px var(--color-gray);
  max-height: 0;
  transition: all .3s ease;
}
.expanded {
  max-height: var(--measure-xxs);
}
</style>
