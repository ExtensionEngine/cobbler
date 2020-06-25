<template>
  <div>
    <div class="course-tags">
      <span class="small-label category-label">{{ category }}</span>
      <span class="small-label date-label">
        {{ new Date(start).toDateString() }} - {{ new Date(end).toDateString() }}
      </span>
    </div>
    <div class="course-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <p>By: {{ lecturers }}</p>
    </div>
    <div v-if="!enrolled" class="btn-container">
      <base-button @click="sendEnrollRequest">
        Enroll
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
import { enroll } from '../../api/courses';

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
    }
  },
  components: {
    BaseButton
  }
};
</script>

<style scoped>

  .category-label {
    background: var(--color-info);
    color: white;
  }

  .date-label {
    background: var(--color-success);
    color: white;
  }
  .btn-container {
    width: 10%;
  }

  .small-label{
    font-size: 0.7rem;
    border-radius: 5px;
    width: fit-content;
    padding: 5px 10px;
    margin-right: 10px
  }

</style>
