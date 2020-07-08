<template>
  <div>
    <h4 class="mb-sm">Scheduled date</h4>
    <field name="start">
      <base-input
        v-model="start"
        @input="propagateDate"
        type="date"
        class="date-picker"
        outlined />
    </field>
    <field name="end" label="end">
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
import debounce from 'lodash/debounce';
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
    propagateDate: debounce(function () {
      return this.$emit('dateChanged', { startDate: this.start, endDate: this.end });
    }, 400)
  },
  components: {
    BaseInput, Field
  }
};
</script>
