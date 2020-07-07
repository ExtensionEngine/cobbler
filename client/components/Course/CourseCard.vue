<template>
  <div
    @click="showCourse"
    :class="{ enrolled }"
    class="course-card">
    <div class="course-card-title">
      <p class="category-name">{{ course.Category.name }}</p>
      <h3>{{ course.name }}</h3>
    </div>
    <div class="course-card-description">
      <p>{{ course.description }}</p>
      <p>By: {{ lecturer }}</p>
      <p class="date">
        {{ course | getDateRange }}
      </p>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';

export default {
  name: 'course-card',
  props: {
    course: {
      type: Object,
      required: true,
      default() {
        return {
          id: '',
          name: '',
          category: {},
          description: '',
          users: [],
          start: '',
          end: ''
        };
      }
    },
    enrolled: { type: Boolean, default: false }
  },
  computed: {
    lecturer() {
      const lecturer = this.course.Users
        .find(user => user.role === 'LECTURER');
      if (!lecturer) return 'No Lecturer specified';
      return `${lecturer.firstName} ${lecturer.lastName}`;
    }
  },
  methods: {
    showCourse() {
      this.$router.push(`courses/${this.course.id}`);
    },
    formatDate(dateString) {
      return format(new Date(dateString), 'dd/MM/yyyy');
    }
  },
  filters: {
    getDateRange(course) {
      const { startDate, endDate } = course;
      if (!(startDate || endDate)) {
        return 'No Date specified';
      }
      return `${format(new Date(startDate), 'dd/MM/yyyy')} - 
              ${format(new Date(endDate), 'dd/MM/yyyy')}`;
    }
  }
};
</script>

<style scoped>
.course-card {
  box-shadow: 3px 3px 8px 0px var(--color-gray);
  min-height: 150px;
  min-width: 300px;
  position: relative;
  font-size: var(--text-sm);
}

.course-card:empty {
  border: none;
  background-repeat: no-repeat;
  opacity: 0.6;
}

.course-card:empty:before {
  content: "";
  height: 60px;
  position: absolute;
  left: var(--spacing-lg);
  right: var(--spacing-lg);
  bottom: 30%;
  background: linear-gradient(to left, #c3c1c1da 0, #dadadae3);
  background-size: 300% 300%;
  background-position: 15px 140px;
  animation: loadingGradient 1s infinite;
}

.course-card:empty:after {
  content: "";
  height: 80px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(to left, #c3c1c1da 0, #dadadae3);
  background-size: 300% 300%;
  animation: loadingGradient 1s infinite;
}

@keyframes loadingGradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: -300% 0%;
  }
}

.course-card:hover {
  z-index: 1;
  cursor: pointer;
  transform: scale(1.1);
  transition-duration: 0.3s;
}

.course-card-title {
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 100%;
  max-height: 50%;
  padding: var(--spacing-sm);
}
.course-card-title h1 {
  font-size: var(--text-md);
}
.course-card-description {
  padding: 0 var(--spacing-md);
  font-size: var(--text-sm);
}

.date {
  text-align: right;
}

.enrolled {
  border: var(--spacing-xxxs) solid var(--color-success);
}
</style>
