<template>
  <div>
    <button @click="handleClick">Create new course</button>
  </div>
</template>

<script>
import paths from '../../router/paths';

export default {
  name: 'lecturer-dashboard',
  methods: {
    handleClick() {
      this.$router.push(paths.lecturer.addCourse);
    }
  }
};
</script>

<style>

</style>
