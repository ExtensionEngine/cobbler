<template>
  <div
    class="course-card"
    :class="{ enrolled }">
    <div class="course-card-title">
      <p class="category-name">{{ course.Category.name }}</p>
      <h1>{{ course.name }}</h1>
    </div>
    <div class="course-card-description">
      <p>{{ course.description }}</p>
      <p>By: {{ lecturer }}</p>
      <p class="date">
        {{ formatDate(course.startDate) }} - {{ formatDate(course.endDate) }}
      </p>
    </div>
    <base-button @click="showCourse">{{ enrolled ? 'Continue' : 'Enroll' }}</base-button>
  </div>
</template>

<script>
import format from 'date-fns/format';

export default {
  name: 'course-card',
  props: {
    id: { type: Number, default: null },
    course: {
      type: Object,
      default() {
        return {
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
      return this.course.Users.find(user => user.role === 'LECTURER') || 'No Lecturer specified';
    }
  },
  methods: {
    showCourse() {
      this.$router.push(`courses/${this.course.id}`);
    },
    formatDate(dateString) {
      return format(new Date(dateString), 'dd/MM/yyyy');
    }
  }
};
</script>

<style scoped>
.course-card {
  box-shadow: 2px 2px 8px 0px var(--color-gray);
  min-height: 200px;
  max-height: 250px;
  min-width: 300px;
  position: relative;
  font-size: 0.5rem;
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
  bottom: 20%;
  background: linear-gradient(to left, #c2c1c1da 0, #dadadae3);
  background-size: 200% 200%;
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
  background: linear-gradient(to left, #c2c1c1da 0, #dadadae3);
  background-size: 200% 200%;
  animation: loadingGradient 1s infinite;
}

@keyframes loadingGradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: -200% 0%;
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
  color: white;
  width: 100%;
  max-height: 100px;
  height: fit-content;
  padding: 15px;
}
.course-card-title h1 {
  font-size: 1.3rem;
}
.course-card-description {
  padding: 0 var(--spacing-md);
  font-size: 0.7rem;
}

.date {
  text-align: right;
}

.enrolled {
  border: 2px solid var(--color-success);
}
</style>
