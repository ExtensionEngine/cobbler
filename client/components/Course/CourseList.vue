<template>
  <div class="wrapper">
    <side-bar />
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
import CourseCard from './CourseCard';
import { get } from '../../api/courses';
import parseISO from 'date-fns/parseISO';
import SideBar from './SideBar';

export default {
  name: 'course-list',
  props: {
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      limit: 6,
      offset: 0,
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
  methods: {
    paginateForward() {
      if (this.courses.data.length === this.limit) { this.offset += this.limit; }
    },
    paginateBack() {
      this.offset = (this.offset > this.limit)
        ? this.offset -= this.limit
        : 0;
    },
    handleSearch(searchTerm) {
      get(`?limit=${this.limit}&offset=${this.offset}&name=ts.${searchTerm}`)
        .then(courses => {
          this.courses = courses.data;
        });
    }
  },
  watch: {
    offset() {
      get(`?limit=${this.limit}&offset=${this.offset}`)
        .then(courses => {
          this.courses = courses.data;
        });
    }
  },
  created() {
    get(`?limit=${this.limit}&offset=${this.offset}`)
      .then(courses => {
        this.courses = courses.data;
      });
  },
  components: {
    CourseCard, SideBar
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
