<template>
  <base-form
    v-if="teachingElement"
    v-slot="{ isFormInvalid }"
    @submit="handleLectureSubmit"
    class="te-form flex-v justify-center align-center">
    <field
      v-model="teachingElement.name"
      name="name"
      label="Name"
      rules="required|lengthBetween:2,50"
      class="te-input">
      <template v-slot="{ on, value }">
        <base-input
          v-on="on"
          :value="value"
          outlined />
      </template>
    </field>
    <field
      v-model="teachingElement.label"
      name="label"
      label="Label (optional)"
      class="te-input">
      <template v-slot="{ on, value }">
        <base-input
          v-on="on"
          :value="value"
          outlined />
      </template>
    </field>
    <base-button
      :disabled="isFormInvalid"
      type="submit"
      primary
      contained>
      Add
    </base-button>
  </base-form>
</template>

<script>
import BaseButton from '../../../components/common/BaseButton';
import BaseForm from '../../../components/common/BaseForm';
import BaseInput from '../../../components/common/BaseInput';
import Field from '../../../components/common/BaseForm/Field';

export default {
  name: 'te-form',
  props: {
    teachingElement: { type: Object, default: null }
  },
  methods: {
    handleLectureSubmit() {
      console.log('hwlwel');
    }
  },
  components: {
    BaseButton,
    BaseForm,
    BaseInput,
    Field
  }
};
</script>

<style scoped>
.te-form {
    padding: var(--spacing-xl);
}
.te-input {
    width: 100%;
    margin: var(--spacing-xxs) 0;
}
</style>
