<template>
  <div class="date-pick-group">
    <h3>Scheduled date</h3>
    <field name="start">
      <base-input
        v-model="start"
        @input="propagateDate"
        type="date"
        class="date-picker"
        outlined />
    </field>
    <field name="end">
      <base-input
        v-model="end"
        @input="propagateDate"
        type="date"
        class="date-picker"
        outlined />
    </field>
  </div>
</template>

<script>
import BaseInput from '../common/BaseInput';
import Field from '../common/BaseForm/Field';

export default {
  name: 'date-picker',
  data() {
    return {
      start: new Date().toString(),
      end: ''
    };
  },
  methods: {
    propagateDate() {
      return this.$emit('dateChanged', { startDate: this.start, endDate: this.end });
    }
  },
  components: {
    BaseInput, Field
  }
};
</script>

<style scoped>
   .date-pick-group {
    margin-bottom: var(--spacing-sm);
  }
</style>
