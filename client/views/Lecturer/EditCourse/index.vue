<template>
  <div v-if="course">
    <second-bar />
    <course-form :course="course" />
    <div class="lectures-wrapper">
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
import DateFormat from 'date-fns/format';
import { getCourse } from '../../../api/courses';
import LectureForm from './LectureForm';
import LectureList from './LectureList';
import SecondBar from '../../../components/Lecturer/SecondBar';

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
    const { id, name, description, startDate, endDate, Category, Lectures } = data.data;
    this.course = {
      id,
      name,
      description,
      category: Category.name,
      startDate: startDate && DateFormat(new Date(startDate), 'yyyy-MM-dd'),
      endDate: endDate && DateFormat(new Date(endDate), 'yyyy-MM-dd')
    };
    this.lectures = Lectures;
  },
  components: {
    CourseForm,
    LectureForm,
    LectureList,
    SecondBar
  }
};
</script>

<style scoped>
.course-wrapper,
.lectures-wrapper {
  padding: var(--spacing-md) 0;
  display: flex;
  justify-content: center;
}
.lectures-wrapper {
  padding: 0;
}
.lectures-title {
  position: absolute;
  top: -12px;
  left: 14px;
  background: var(--color-white);
  padding: 0 5px;
}
.lectures-container {
  width: 550px;
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  padding: var(--spacing-sm);
  padding-top: var(--spacing-md);
  position: relative;
}
</style>
