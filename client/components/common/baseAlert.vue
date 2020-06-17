<template>
  <div
    :class="{
      'alert-wrapper': true,
      error,
      warning,
      info,
      success
    }">
    <div><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'base-alert',
  props: {
    error: { type: Boolean, default: false },
    warning: { type: Boolean, default: false },
    info: { type: Boolean, default: false },
    success: { type: Boolean, default: false }
  }
};
</script>

<style lang="css" scoped>
.alert-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    border-radius: 3px;
}
.error {
  background: var(--color-error-500);
}
.warning {
    background: var(--color-warning-500);
}
.info {
    background: var(--color-info-500);
}
.success {
    background: var(--color-success-500);
}
</style>
