<template>
  <div>
    <div class="course-tags">
      <span class="small-label category-label">{{ category }}</span>
      <span class="small-label date-label">
        {{ formatDate(start) }} - {{ formatDate(end) }}
      </span>
    </div>
    <div class="course-content">
      <div>
        <div class="course-title">
          <h1>{{ title }}</h1>
          <div class="btn-container">
            <base-button @click="sendEnrollRequest" :disabled="enrolled" class="enroll-btn" contained>
              Enroll
            </base-button>
          </div>
        </div>
        <p>{{ description }}</p>
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
    id: { type: Number, default: null },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
    users: { type: Array, default: () => [] },
    enrolled: { type: Boolean, default: false }
  },
  computed: {
    lecturers() {
      const temp = [];
      this.users.forEach(element => {
        temp.push(`${element.firstName} ${element.lastName}`);
      });
      return temp.join(', ');
    }
  },
  methods: {
    sendEnrollRequest() {
      if (this.id) {
        enroll(this.id)
          .then(success => {
            this.$router.push('/');
          });
      }
    },
    formatDate(dateString) {
      return format(new Date(dateString), 'dd/MM/yyyy');
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
    margin-right: 20px;
  }
  .category-label {
    background: var(--color-info);
    color: white;
  }

  .date-label {
    background: var(--color-gray);
    color: white;
  }
  .btn-container *{
    margin-top: 30%;
  }

  .enroll-btn {
    color: white;
    background-color: var(--color-success);
    box-shadow: 0 2px 3px var(--color-gray), 0 2px 3px var(--color-gray);
    padding: 8px 15px;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing-xxxs);
  }

  .small-label{
    font-size: 0.7rem;
    border-radius: 5px;
    padding: 5px 10px;
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
