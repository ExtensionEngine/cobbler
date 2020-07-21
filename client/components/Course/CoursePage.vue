<template>
  <div>
    <div class="flex-h justify-start mb-md">
      <span v-if="course.category" class="small-label category-label mr-xs pt-xxs pb-xxs pl-sm pr-sm">
        {{ course.category.name }}
      </span>
      <span class="small-label date-label mr-xs pt-xxs pb-xxs pl-sm pr-sm">
        {{ course.startDate | formatDate }} - {{ course.endDate | formatDate }}
      </span>
    </div>
    <div>
      <div class="course-title flex-h">
        <h1 class="mr-md">{{ course.name }}</h1>
        <div class="btn-container">
          <base-button
            v-if="course.isEnrolled"
            :disabled="!course.available"
            class="material-btn continue mt-xxs"
            contained>
            Continue
          </base-button>
          <base-button
            v-else
            @click="sendEnrollRequest"
            :disabled="!course.available"
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
import { dateFormat } from '../../utils/constants';
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
    }
  },
  filters: {
    formatDate(date) {
      return date ? format(new Date(date), dateFormat) : '';
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
.continue {
  background-color: var(--color-info);
  padding: var(--spacing-xs);
}
</style>
