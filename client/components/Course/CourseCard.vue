<template>
  <div @click="showCourse" class="course-card" :class="{ enrolled }">
    <div class="course-card-title">
      <p class="category-name">{{ category }}</p>
      <h1>{{ title }}</h1>
    </div>
    <div class="course-card-description">
      <p>{{ description }}</p>
      <p>By: {{ lecturer }}</p>
      <p class="date">{{ new Date(start).toDateString() }} - {{ new Date(end).toDateString() }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'course-card',
  props: {
    id: { type: Number, default: null },
    title: { type: String, default: 'Course title' },
    category: { type: String, default: 'Category' },
    description: { type: String, default: 'This is a course description' },
    users: { type: Array, default: () => [] },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
    enrolled: { type: Boolean, default: false }
  },
  computed: {
    lecturer() {
      const lecturer = this.users.find(user => user.role === 'LECTURER');
      return lecturer ? `${lecturer.firstName} ${lecturer.lastName}` : '';
    }
  },
  methods: {
    showCourse() {
      this.$router.push(`courses/${this.id}`);
    }
  }
};
</script>

<style scoped>
  .course-card {
    border: 1px solid black;
    box-shadow: 2px 2px 4px 0px var(--color-gray);
    height: fit-content;
    min-height: 230px;
    min-width: 300px;
    border-radius: 5px;
    background-color: white;
    position: relative;
  }

  .course-card:empty {
    border: none;
    background-repeat: no-repeat;
    opacity: 0.6;
  }

  .course-card:empty:before {
    content: '';
    height:  60px;
    width: 90%;
    position: absolute;
    left: 5%;
    bottom: 20%;
    background: linear-gradient(to left, #c2c1c1da 0, #dadadae3);
    background-size: 200% 200%;
    background-position: 15px 140px;
    animation: loadingGradient 1s infinite;
  }

  .course-card:empty:after {
    content: '';
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
    display:table;
    text-align: center;
    width: 100%;
    min-height: 100px;
    height: fit-content;
    padding: 10px;
  }
  .course-card-title h1 {
   margin: 0;
   display: table-cell;
   vertical-align: middle;
  }
  .course-card-description {
    padding: 0 var(--spacing-md);
    margin: 0;
  }

  .date {
    text-align: right;
  }

  .enrolled {
    border: 5px solid var(--color-success);
  }

</style>
