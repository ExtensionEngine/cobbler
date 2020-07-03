<template>
  <div class="page">
    <div class="tags">
      <span class="small-label mr-xs category-label">{{ category }}</span>
      <span class="small-label mr-xs date-label">
        {{ formatDate(start) }} - {{ formatDate(end) }}
      </span>
    </div>
    <base-button
      @click="sendEnrollRequest"
      :disabled="enrolled"
      class="enroll-btn justify-end"
      contained>
      Enroll
    </base-button>
    <div class="overview">
      <div>
        <div class="flex-h">
          <h1>{{ title }}</h1>
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
  .page {
    display: grid;
    height: 100%;
    padding: var(--spacing-xl);
    gap: var(--spacing-md);
    grid-template: repeat(3, auto) 1fr / 1fr;
    grid-template-areas:
    'tags'
    'enroll'
    'overview'
    'lectures';
  }

  .category-label {
    background: var(--color-info);
    color: white;
  }

  .date-label {
    background: var(--color-gray);
    color: white;
  }

  .enroll-btn {
    grid-area: enroll;
    color: white;
    background-color: var(--color-success);
    box-shadow: 0 2px 3px var(--color-gray), 0 2px 3px var(--color-gray);
    padding: 8px 15px;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing-xxxs);
  }

  .enroll-btn:focus {
    outline: none;
    box-shadow: inset 0px 0px 5px #c1c1c1;
  }

  .small-label {
    font-size: 0.7rem;
    border-radius: 5px;
    padding: 5px 10px;
  }

  .tags {
    display: flex;
    justify-content: flex-start;
    grid-area: tags;
  }

  .lectures {
    width: 100%;
    grid-area: lectures;
  }

</style>
