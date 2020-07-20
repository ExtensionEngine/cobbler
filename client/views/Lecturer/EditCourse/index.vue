<template>
  <div v-if="course">
    <navigation-helper-bar />
    <course-form :course="course" />
    <div class="lectures-wrapper flex-h justify-center">
      <div class="lectures-container">
        <span class="lectures-title">Lectures</span>
        <lecture-form @add="handleLectureAdd" />
        <lecture-list @expand="handleExpandToggle" :lectures="lectures" />
      </div>
    </div>
  </div>
</template>

<script>
import CourseForm from './CourseForm';
import dateFormat from 'date-fns/format';
import { getCourse } from '../../../api/courses';
import LectureForm from './LectureForm';
import LectureList from './LectureList';
import NavigationHelperBar from '../../../components/Lecturer/NavigationHelperBar';

export default {
  name: 'edit-course',
  data() {
    return ({
      course: null,
      lectures: []
    });
  },
  methods: {
    handleExpandToggle(lectureId) {
      this.lectures = this.lectures.map(lecture => lecture.id === lectureId
        ? { ...lecture, expanded: !lecture.expanded }
        : lecture);
    },
    handleLectureAdd(lecture) {
      this.lectures.push(lecture);
    }
  },
  async created() {
    const { data } = await getCourse(this.$route.params.id);
    const { id, name, description, startDate, endDate, category, lectures } = data;
    this.course = {
      id,
      name,
      description,
      category,
      startDate: startDate && dateFormat(new Date(startDate), 'yyyy-MM-dd'),
      endDate: endDate && dateFormat(new Date(endDate), 'yyyy-MM-dd')
    };
    this.lectures = lectures;
  },
  components: {
    CourseForm,
    LectureForm,
    LectureList,
    NavigationHelperBar
  }
};
</script>

<style scoped>
.lectures-wrapper {
  padding: 0;
}
.lectures-title {
  position: absolute;
  top: -12px;
  left: 14px;
  background: var(--color-white);
  padding: 0 var(--spacing-xxs);
}
.lectures-container {
  width: var(--measure-md);
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  padding: var(--spacing-sm);
  padding-top: var(--spacing-md);
  position: relative;
}
</style>
