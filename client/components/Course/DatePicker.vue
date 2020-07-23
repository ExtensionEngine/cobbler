<template>
  <base-input
    v-on="$listeners"
    v-bind="$attrs"
    type="date"
    class="date-picker"
    outlined />
</template>

<script>
import BaseInput from '../common/BaseInput';

export default {
  name: 'date-picker',
  components: {
    BaseInput
  }
};
</script>

<style lang="css" scoped>
.date-picker {
  border: 1px solid var(--color-gray-500)
}
</style>
