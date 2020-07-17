<template>
  <draggable @change="onChange" :value="teachingElements">
    <div
      v-for="element in teachingElements"
      :key="element.id"
      @click="onClick(element)"
      class="teaching-element">
      <h3>{{ element.name }}</h3>
      <ul>
        <li>type: {{ element.type }}</li>
        <li>label: {{ element.label }}</li>
      </ul>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'teaching-element-list',
  props: {
    teachingElements: { type: Array, required: true }
  },
  methods: {
    onChange({ moved: { newIndex, oldIndex, element } }) {
      this.$emit('drop', oldIndex, newIndex, element);
      return false;
    },
    onClick(lecture) {
      this.$emit('select', lecture);
    }
  },
  components: {
    draggable
  }
};
</script>

<style scoped>
.teaching-element {
  border: 1px solid var(--color-black);
  border-radius: 3px;
  padding: var(--spacing-sm);
  cursor: pointer;
  background: var(--color-primary);
  box-shadow: 2px 2px 4px 0px var(--color-gray);
  margin: var(--spacing-xxs) 0;
}
.teaching-element h3,
.teaching-element ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
