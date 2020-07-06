<template>
  <div class="wrapper">
    <div class="container">
      <div class="cards">
        <course-card
          v-for="course in getEnrolledCourses"
          :key="course.id"
          :course="course"
          :enrolled="true" />
        <course-card
          v-for="course in getNotEnrolledCourses"
          :key="course.id"
          :course="course" />
      </div>
    </div>
  </div>
</template>

<script>
import compareAsc from 'date-fns/compareAsc';
import CourseCard from '../components/Course/CourseCard';
import { get } from '../api/courses';
import parseISO from 'date-fns/parseISO';
export default {
  props: {
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      courses: { data: [] }
    };
  },
  computed: {
    getEnrolledCourses() {
      return this.courses.data.filter(course =>
        course.Users.find(user => user.email === this.$store.state.auth.email)
      );
    },
    getNotEnrolledCourses() {
      return this.courses.data
        .filter(
          course =>
            !course.Users.find(
              user => user.email === this.$store.state.auth.email
            )
        )
        .sort((prev, next) => {
          return compareAsc(parseISO(prev.updatedAt), parseISO(next.updatedAt));
        });
    }
  },
  created() {
    get()
      .then(courses => {
        this.courses = courses.data;
      });
  },
  components: {
    CourseCard
  }
};
</script>

<style lang="css" scoped>
.wrapper {
  display: flex;
  height: 100vh;
}
.container {
  padding: var(--spacing-md);
  font-size: 0.7rem;
}
.page-btns {
  display: flex;
  justify-content: flex-end;
}
i {
  font-size: 2.2rem;
}
.arrow-btn {
  background: none;
  border: none;
}
.arrow-btn:hover {
  cursor: pointer;
}
.arrow-btn:focus {
  outline: none;
}
.cards {
  max-width: 1200px;
  margin: 20px auto;
  display: grid;
  grid: auto-flow auto / 1fr;
  grid-gap: var(--spacing-lg);
}
@media (min-width: 600px) {
  .cards {
    grid: auto-flow auto / repeat(2, 1fr);
  }
}
@media (min-width: 900px) {
  .cards {
    grid: auto-flow auto / repeat(3, 1fr);
  }
}
</style>
