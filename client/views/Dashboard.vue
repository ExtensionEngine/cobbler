<template>
  <div class="wrapper flex-h">
    <side-bar @filter="refreshCourseList" />
    <div class="main-content">
      <div class="card-container">
        <div class="cards">
          <course-card
            v-for="course in courses"
            :key="course.id"
            :course="course"
            :enrolled="course.isEnrolled"
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
import CourseCard from '../components/Course/CourseCard';
import { format } from 'date-fns';
import { generateQuery } from '../utils/queryParamGenerator';
import { get } from '../api/courses';
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
        startDate: format(new Date(), 'yyyy-MM-dd')
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
    refreshCourseList(filterParams) {
      this.filterParams = filterParams;
      this.getFilteredCourses();
    },
    getFilteredCourses() {
      get(this.queryString).then(({ data }) => {
        this.courses = data.data;
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
  height: 100%;
  width: 100%;
}
.page-btns {
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
