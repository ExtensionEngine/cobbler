<template>
  <div class="wrapper">
    <div class="container">
      <div class="cards">
        <course-card
          v-for="course in courses"
          :key="course.id"
          :course="course"
          :enrolled="checkEnrolled(course)" />
      </div>
    </div>
  </div>
</template>

<script>
import compareAsc from 'date-fns/compareAsc';
import CourseCard from '../components/Course/CourseCard';
import { get } from '../api/courses';
import parseISO from 'date-fns/parseISO';
import sortBy from 'lodash/sortBy';

export default {
  props: {
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      courses: { data: [] }
    };
  },
  methods: {
    checkEnrolled(course) {
      if (!course.Users.length) return false;
      if (course.Users.find(user => user.email === this.$store.state.auth.email)) {
        return true;
      }
      return false;
    },
    sortByUpdated(courses) {
      return courses.sort((prev, next) => {
        return compareAsc(parseISO(prev.updatedAt), parseISO(next.updatedAt));
      });
    },
    sortByEnrollment(courses) {
      return sortBy(this.sortByUpdated(courses), this.checkEnrolled).reverse();
    }
  },
  mounted() {
    get().then(({ data }) => {
      this.courses =
        this.sortByEnrollment(this.sortByUpdated(data.data));
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
  font-size: var(--text-lg);
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
  margin: var(--spacing-md) auto;
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
