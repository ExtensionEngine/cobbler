<template>
  <div class="date-pick-group">
    <h3>Scheduled date</h3>
    <field label="Start Date">
      <base-input
        v-model="start"
        @input="propagateDate('start')"
        type="date"
        class="date-picker"
        outlined />
    </field>
    <field label="End Date">
      <base-input
        v-model="end"
        @input="propagateDate('end')"
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
      start: '',
      end: ''
    };
  },
  methods: {
    propagateDate(time) {
      if (time === 'start') {
        return this.$emit('addStart', this.start);
      }
      this.$emit('addEnd', this.end);
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
