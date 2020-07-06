<template>
  <div class="wrapper">
    <side-bar />
    <div class="main-content">
      <div class="card-container">
        <div class="cards">
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

export default {
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

        <course-card
          v-for="course in courses"
          :key="course.id"
          :course="course"
          :enrolled="checkEnrolled(course)" />
    },
      });
        return compareAsc(parseISO(prev.updatedAt), parseISO(next.updatedAt));
      return courses.sort((prev, next) => {
    sortByUpdated(courses) {
    },
      return false;
      }
        return true;
      if (course.Users.find(user => user.email === this.$store.state.auth.email)) {
      if (!course.Users.length) return false;
    checkEnrolled(course) {
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
i {
  font-size: var(--text-lg);
}
  padding: var(--spacing-md);
.container {
  font-size: var(--text-sm);
}