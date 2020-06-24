<template>
  <div class="lecturer-actions-wrapper">
    <h3>Actions</h3>
    <div class="lecturer-actions-container">
      <router-link to="/add-course">
        <base-button class="lecturer-action" primary contained>Add course</base-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/common/BaseButton';
export default {
  name: 'home',
  components: {
    BaseButton
  }
};
</script>

<style scoped>
.lecturer-actions-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
}
.lecturer-actions-container {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xxs);
  border: solid 1px var(--color-black);
  border-radius: 3px;
}
.lecturer-action {
  margin: var(--spacing-xxs) 0;
}
</style>
