<template>
  <div :class="alertWrapperClass">
    <div><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'base-alert',
  props: {
    severity: { type: String, default: 'info' }
  },
  computed: {
    alertWrapperClass: cmp => ({
      'alert-wrapper': true,
      error: cmp.severity === 'error',
      warning: cmp.severity === 'warning',
      info: cmp.severity === 'info',
      success: cmp.severity === 'success'
    })
  }
};
</script>

<style lang="css" scoped>
.alert-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    opacity: 0.7;
    border-radius: 3px;
}
.error {
  background: var(--color-error);
}
.warning {
    background: var(--color-warning);
}
.info {
    background: var(--color-info);
}
.success {
    background: var(--color-success);
}
</style>
