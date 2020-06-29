<template>
  <h1>edit here</h1>
</template>

<script>
import { getCourse } from '../../api/courses';

export default {
  name: 'edit-course',
  data() {
    return ({
      course: null
    });
  },
  async mounted() {
    const { data } = await getCourse(this.$route.params.id);
    this.course = data;
  }
};
</script>

<style>

</style>
