<template>
  <div>
    <div class="course-tags">
      <span class="small-label category-label">{{ course.Category.name }}</span>
      <span class="small-label date-label">
        {{ course | getDateRange }}
      </span>
    </div>
    <div class="course-content">
      <div>
        <div class="course-title">
          <h1>{{ course.name }}</h1>
          <div class="btn-container">
            <base-button @click="sendEnrollRequest" :disabled="enrolled" class="enroll-btn" contained>
              Enroll
            </base-button>
          </div>
        </div>
        <p>{{ course.description }}</p>
        <p>By: {{ lecturers }}</p>
      </div>
    </div>
    <lecture-container class="lectures" />
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
import { enroll } from '../../api/enroll';
import format from 'date-fns/format';
import LectureContainer from '../Lectures/LectureContainer';

export default {
  name: 'course-page',
  props: {
    course: { type: Object, required: true },
    enrolled: { type: Boolean, default: false }
  },
  computed: {
    lecturers() {
      const lecturers = [];
      if (!this.course.Users) return;
      this.course.Users.forEach(user => {
        lecturers.push(`${user.firstName} ${user.lastName}`);
      });
      return lecturers.join(', ');
    }
  },
  methods: {
    sendEnrollRequest() {
      if (this.course.id) {
        enroll(this.course.id)
          .then(success => {
            this.$router.push('/');
          });
      }
    },
    formatDate(dateString) {
      return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : '';
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
  },
  components: {
    BaseButton, LectureContainer
  }
};
</script>

<style scoped>

  .course-title {
    display: flex;
  }
  .course-title h1{
    margin-right: var(--spacing-md);
  }
  .category-label {
    background: var(--color-info);
    color: var(--color-white);
  }

  .date-label {
    background: var(--color-gray);
    color: var(--color-white);
  }
  .btn-container *{
    margin-top: 30%;
  }

  .enroll-btn {
    color: var(--color-white);
    background-color: var(--color-success);
    box-shadow: 0 2px 3px var(--color-gray), 0 2px 3px var(--color-gray);
    padding: var(--spacing-xs) var(--spacing-sd);
    font-size: var(--spacing-sm);
    text-transform: uppercase;
    letter-spacing: var(--spacing-xxxs);
  }

  .enroll-btn:focus {
    outline: none;
    box-shadow: inset 0px 0px 5px #c1c1c1;
  }

  .small-label{
    font-size: var(--text-sm);
    border-radius: var(--spacing-xxs);
    padding: var(--spacing-xxs) var(--spacing-sm);
    margin-right: var(--spacing-xs);
  }

  .course-tags {
    display: flex;
    justify-content: flex-start;
  }

  .lectures {
    width: 100%;
  }

</style>
