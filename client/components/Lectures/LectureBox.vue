<template>
  <div class="pb-sm pt-sm">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'lecture-box',
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }
};
</script>
