<template>
  <div>
    <field
      v-model="date"
      name="start">
      <base-input
        @input="$emit('input', date)"
        v-on="$listeners"
        type="date"
        v-bind="$attrs"
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
  data: () => ({ date: '' }),
  components: {
    BaseInput, Field
  }
};
</script>
