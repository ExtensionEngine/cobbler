<template>
  <div>
    <div class="flex-h justify-start mb-md">
      <span class="small-label category-label mr-xs pt-xxs pb-xxs pl-sm pr-sm">
        {{ course.Category.name }}
      </span>
      <span class="small-label date-label mr-xs pt-xxs pb-xxs pl-sm pr-sm">
        {{ course | getDateRange }}
      </span>
    </div>
    <div>
      <div class="course-title flex-h">
        <h1 class="mr-md">{{ course.name }}</h1>
        <div class="btn-container">
          <base-button
            @click="sendEnrollRequest"
            :disabled="course.isEnrolled || !course.available"
            class="enroll-btn mt-xxs"
            contained>
            Enroll
          </base-button>
        </div>
      </div>
      <p>{{ course.description }}</p>
      <p>By: {{ lecturers }}</p>
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
    course: { type: Object, required: true }
  },
  computed: {
    lecturers() {
      const lecturers = [];
      if (!this.course.Users) return;
      this.course.Users.forEach(user => {
        if (user.role === 'LECTURER') lecturers.push(`${user.firstName} ${user.lastName}`);
      });
      return lecturers.join(', ');
    }
  },
  methods: {
    async sendEnrollRequest() {
      const enrollment = await enroll(this.course.id);
      if (enrollment) this.$router.push('/');
    },
    formatDate(dateString) {
      return dateString ? format(new Date(dateString), 'yyyy-MM-dd') : '';
    }
  },
  filters: {
    getDateRange(course) {
      const { startDate, endDate } = course;
      if (!(startDate || endDate)) {
        return 'No Date specified';
      }
      return `${format(new Date(startDate), 'yyyy-MM-dd')} - 
              ${format(new Date(endDate), 'yyyy-MM-dd')}`;
    }
  },
  components: {
    BaseButton, LectureContainer
  }
};
</script>

<style lang="css" scoped>
.category-label {
  background: var(--color-info);
  color: var(--color-white);
}
.date-label {
  background: var(--color-gray);
  color: var(--color-white);
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
.small-label{
  font-size: var(--text-sm);
  border-radius: var(--spacing-xxs);
}
.lectures {
  width: 100%;
}
</style>
