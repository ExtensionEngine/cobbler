<template>
  <div>
    <button @click="handleExpand" type="button" class="collapsible">{{ title }}</button>
    <div :class="{expanded}" class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'colapsible',
  props: {
    id: { type: Number, required: true },
    title: { type: String, default: null },
    expanded: { type: Boolean, default: false }
  },
  methods: {
    handleExpand() {
      this.$emit('toggleExpand', this.id);
    }
  }
};
</script>

<style scoped>
.collapsible {
  background-color: transparent];
  cursor: pointer;
  padding: var(--spacing-xs);
  width: 100%;
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  text-align: center;
  outline: none;
}
.active, .collapsible:hover {
  background-color: var(--color-gray-500);
}
.content {
  padding: 0 var(--spacing-md);
  overflow: hidden;
  background-color: #f1f1f1;
  border: solid 1px var(--color-gray);
  max-height: 0;
  transition: max-height .5s ease-in-out;
}
.expanded {
  max-height: 100vh;
}
</style>
