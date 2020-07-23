<template>
  <div
    class="wrapper flex-h justify-center"
    :class="{ overlayed: menu }">
    <search-group
      v-if="$isSmallScreen"
      @filter="refreshCourseList"
      class="search-bar" />
    <transition name="slide">
      <course-filters-drawer
        v-if="menu"
        @closed="closeMenu" />
    </transition>
    <div
      class="main-content">
      <base-button
        v-if="!$isSmallScreen"
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
            :course="course" />
        </div>
      </div>
      <div v-if="$isSmallScreen" class="desktop-page-btns">
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
      <div v-if="!$isSmallScreen" class="mobile-page-btns flex-h justify-space-around">
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
import CourseCard from '../components/Course/CourseCard';
import CourseFiltersDrawer from '../components/Course/CourseFiltersDrawer';
import { format } from 'date-fns';
import { generateQuery } from '../utils/queryParamGenerator';
import { get } from '../api/courses';
import SearchGroup from '../components/Course/SearchGroup';

export default {
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
      const { limit, offset, filterParams } = this;
      get(generateQuery(filterParams, limit, offset))
        .then(({ data }) => {
          this.courses = data.data;
        }).finally(() => {
          this.loading = false;
        });
    },
    showMenu() {
      this.menu = true;
    },
    closeMenu(params) {
      if (params) {
        this.filterParams = params;
        this.getFilteredCourses();
      }
      this.menu = false;
    }
  },
  watch: {
    offset: {
      handler: 'getFilteredCourses',
      immediate: true
    }
  },
  components: {
    BaseButton, CourseCard, SearchGroup, CourseFiltersDrawer
  }
};
</script>

<style lang="css" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  z-index: var(--z-dashboard);

}
.desktop-page-btns {
  position: absolute;
  bottom: var(--spacing-sm);
}
.mobile-page-btn {
  background: var(--color-info);
  color: var(--color-white);
  padding: var(--spacing-sm) 0;
}
.main-content {
  padding: var(--spacing-md);
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
.filter-btn {
  background-color: var(--color-accent);
  color: var(--color-green);
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}
.cards {
  max-width: var(--measure-xxl);
  margin: var(--spacing-sm) auto;
  display: grid;
  grid: auto-flow auto / 1fr;
  grid-gap: var(--spacing-lg);
}
.mobile-page-btns {
  width: 100%;
  margin-top: var(--spacing-lg);
}
.mobile-page-btns .material-btn {
  margin: 0 var(--spacing-sm);
}
.search-bar {
  max-width: 20%;
  flex-grow: 1;
  border-right: 1px solid var(--color-gray-500);
}
.overlayed:after {
  content: '';
  height: 100%;
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  width: 100%;
  z-index: var(--z-dashboard);
  background-color: rgba(0, 0, 0, 0.726);
}
.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
}
.slide-leave-active {
  animation: slide-out 0.2s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(var(--spacing-lg));
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0)
  }
  to {
    transform: translateY(var(--spacing-md))
  }
}

@media (min-width: 748px) {
  .cards {
    grid: auto-flow auto / repeat(2, 1fr);
  }
  .main-content {
    max-width: var(--measure-xl);
    width: 100%;
  }
}
@media (min-width: 1140px) {
  .cards {
    grid: auto-flow auto / repeat(3, 1fr);
  }
}
</style>
