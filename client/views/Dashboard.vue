<template>
  <div class="wrapper">
    <side-bar @filter="refreshCourseList" />
    <div class="main-content">
      <div class="card-container">
        <div class="cards">
          <course-card
            v-for="course in courses"
            :key="course.id"
            :course="course"
            :enrolled="checkEnrolled(course)"
            :available="course.available" />
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
import { generateQuery } from '../utils/queryParamGenerator';
import { get } from '../api/courses';
import parseISO from 'date-fns/parseISO';
import SideBar from '../components/Course/SideBar';

export default {
  props: {
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      limit: 6,
      offset: 0,
      courses: [],
      filterParams: {
        startDate: new Date()
      }
    };
  },
  computed: {
    queryString() {
      const { limit, offset, filterParams } = this;
      return generateQuery(filterParams, limit, offset);
    }
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

    refreshCourseList(filterParams) {
      this.filterParams = filterParams;
      this.getFilteredCourses();
    },
    getFilteredCourses() {
      get(this.queryString).then(({ data }) => {
        this.courses =
        this.sortByUpdated(data.data);
      });
    }
  },
  watch: {
    offset() {
      this.getFilteredCourses();
    }
  },
  created() {
    this.getFilteredCourses();
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
  width: 100%;
}
.page-btns {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 1%;
}

.main-content {
  padding: var(--spacing-md);
  max-height: calc(100vh - var(--navbar-height));
  max-width: 80%
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
  margin: var(--spacing-sm) auto;
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
