<template>
  <div>
    <field
      v-model="date"
      name="start">
      <template v-slot="{ on, value }">
        <base-input
          v-on="on"
          @input="$emit('input', date)"
          :value="value"
          type="date"
          class="date-picker"
          outlined />
      </template>
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
