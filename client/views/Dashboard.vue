<template>
  <div class="wrapper">
    <side-bar />
    <div class="main-content">
      <div class="card-container">
        <div class="cards">
          <course-card
            v-for="course in courses"
            :key="course.id"
            :course="course"
            :enrolled="checkEnrolled(course)" />
        </div>
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
import SideBar from '../components/Course/SideBar';
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
    paginateForward() {
      if (this.courses.length === this.limit) { this.offset += this.limit; }
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
    },
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
      return sortBy(courses, this.checkEnrolled).reverse();
    }
  },
  watch: {
    offset() {
      get(`?limit=${this.limit}&offset=${this.offset}`).then(({ data }) => {
        this.courses =
        this.sortByEnrollment(this.sortByUpdated(data.data));
      });
    }
  },
  mounted() {
    get(`?limit=${this.limit}&offset=${this.offset}`).then(({ data }) => {
      this.courses =
        this.sortByEnrollment(this.sortByUpdated(data.data));
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
  height: 100%;
}
.page-btns {
  display: flex;
  justify-content: center;

}

.main-content {
  padding: var(--spacing-lg);
}

i {
  font-size: var(--text-lg);
}
  padding: var(--spacing-md);
.container {
  font-size: var(--text-sm);
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
@media (min-width: 748px) {
  .cards {
    grid: auto-flow auto / repeat(2, 1fr);
  }
}
@media (min-width: 1140px) {
  .cards {
    grid: auto-flow auto / repeat(3, 1fr);
  }
}
</style>
