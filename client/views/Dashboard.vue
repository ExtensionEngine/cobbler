<template>
  <div
    class="wrapper flex-h justify-center"
    :class="{overlayed: menu}">
    <search-group v-show="isSmallScreen" @filter="refreshCourseList" class="search-bar" />
    <side-bar
      v-if="menu"
      @closed="handleCloseMenu" />
    <div
      class="main-content">
      <base-button
        v-if="!isSmallScreen"
        @click="showMenu"
        class="material-btn filter-btn">
        Filter
      </base-button>
      <div class="card-container">
        <div class="cards">
          <template v-if="loading">
            <course-card
              v-for="n in 6"
              :key="n" />
          </template>
          <course-card
            v-for="course in courses"
            v-else
            :key="course.id"
            :course="course"
            :enrolled="course.isEnrolled"
            :available="course.available" />
        </div>
      </div>
      <div v-if="isSmallScreen" class="page-btns">
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
      <div v-if="!isSmallScreen" class="mobile-btn-group">
        <base-button
          @click="paginateBack"
          class="material-btn mobile-page-btn">
          Previous
        </base-button>
        <base-button
          @click="paginateForward"
          class="material-btn mobile-page-btn">
          Next
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/common/BaseButton';
import breakPointsMixin from '../components/common/mixins/breakPointsMixin';
import CourseCard from '../components/Course/CourseCard';
import { format } from 'date-fns';
import { generateQuery } from '../utils/queryParamGenerator';
import { get } from '../api/courses';
import SearchGroup from '../components/Course/SearchGroup';
import SideBar from '../components/Course/SideBar';

export default {
  mixins: [breakPointsMixin],

  data() {
    return {
      menu: false,
      loading: true,
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
      get(this.queryString)
        .then(({ data }) => {
          this.courses = data.data;
        }).finally(() => {
          this.loading = false;
        });
    },
    showMenu() {
      this.menu = true;
    },
    handleCloseMenu(params) {
      if (params) {
        this.filterParams = params;
        this.getFilteredCourses();
      }
      this.menu = false;
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
    BaseButton, CourseCard, SearchGroup, SideBar
  }
};
</script>

<style lang="css" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  z-index: 100;
}
.page-btns {
  position: absolute;
  bottom: 1%;
}
.mobile-page-btn {
  background: var(--color-info);
  color: var(--color-white);
  padding: var(--spacing-sm) 0;
}
.main-content {
  padding: var(--spacing-md);
  max-width: 80%;
  flex-grow: 2;
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
.filter-btn {
  background-color: var(--color-accent);
  color: var(--color-green);
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}
.cards {
  max-width: 1200px;
  margin: var(--spacing-sm) auto;
  display: grid;
  grid: auto-flow auto / 1fr;
  grid-gap: var(--spacing-lg);
}
.mobile-btn-group {
  width: 100%;
  margin-top: var(--spacing-lg);
  display: flex;
  justify-content: space-around;
}
.mobile-btn-group .material-btn {
  margin: 0 10px;
}
.search-bar {
  max-width: 20%;
  flex-grow: 1;
  justify-self: flex-start;
}
.overlayed:after {
  content: '';
  height: 100%;
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.726);
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
