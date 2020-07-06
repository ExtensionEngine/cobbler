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
      <div class="page-btns">
        <button @click="paginateBack" class="arrow-btn">
          <i class="material-icons">
            keyboard_arrow_left
          </i>
        </button>
        <button @click="paginateForward" class="arrow-btn">
          <i class="material-icons">
            keyboard_arrow_right
          </i>
        </button>
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
      limit: 6,
      offset: 0,
      courses: []
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
    },
    paginateForward() {
      if (this.courses.length === this.limit) { this.offset += this.limit; }
    },
    paginateBack() {
      this.offset = (this.offset > this.limit)
        ? this.offset -= this.limit
        : 0;
    }
  },
  watch: {
    offset() {
      get(`?limit=${this.limit}&offset=${this.offset}`)
        .then(({ data }) => {
          this.courses =
        this.sortByEnrollment(this.sortByUpdated(data.data));
        });
    }
  },
  created() {
    get(`?limit=${this.limit}&offset=${this.offset}`)
      .then(({ data }) => {
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
  font-size: var(--text-sm);
}
.page-btns {
  display: flex;
  justify-content: center;
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
