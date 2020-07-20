<template>
  <div class="flex-h justify-center">
    <div class="dashboard-container">
      <base-button
        @click="goToAddCourse"
        class="new-course-btn"
        contained
        primary>
        Create new course
      </base-button>
      <lecturer-course-list />
    </div>
  </div>
</template>

<script>
import BaseButton from '../../components/common/BaseButton';
import LecturerCourseList from '../../components/Lecturer/CourseList';
import paths from '../../router/paths';

export default {
  name: 'lecturer-dashboard',
  methods: {
    goToAddCourse() {
      this.$router.push(paths.lecturer.addCourse);
    }
  },
  components: {
    BaseButton,
    LecturerCourseList
  }
};
</script>

<style scoped>
.dashboard-container {
  width: 90%;
  max-width: var(--measure-md);
  box-shadow: 2px 6px 9px 0px var(--color-gray);
}
.new-course-btn {
  height: 40px;
}
@media only screen and (max-width: 480px) {
  .dashboard-container {
    width: 100%;
  }
}
</style>
