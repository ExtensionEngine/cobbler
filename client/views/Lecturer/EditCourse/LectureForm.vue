<template>
  <div>
    <base-button
      @click="toggleAddLecture"
      :class="{'add-lecture-btn-active': isActive}"
      class="add-lecture-btn"
      outlined>
      <span :class="{ rotate: isActive }">+</span>
    </base-button>
    <div :class="{'lecture-add-active': isActive}" class="lecture-add">
      <base-form
        v-slot="{ isFormInvalid }"
        @submit="handleLectureSubmit"
        class="lecture-form">
        <field
          v-model="name"
          class="form-item-half"
          name="name"
          label="Name"
          rules="required|lengthBetween:2,50">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              outlined />
          </template>
        </field>
        <field
          v-model="description"
          class="form-item-half"
          name="description"
          label="Description (optional)">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              outlined />
          </template>
        </field>
        <base-button
          class="lecture-add-btn"
          :disabled="isFormInvalid"
          type="submit"
          contained>
          Add
        </base-button>
      </base-form>
    </div>
  </div>
</template>

<script>
import { addLecture } from '../../../api/lectures';
import BaseButton from '../../../components/common/BaseButton';
import BaseForm from '../../../components/common/BaseForm';
import BaseInput from '../../../components/common/BaseInput';
import Field from '../../../components/common/BaseForm/Field';

export default {
  name: 'lecture-form',
  data() {
    return ({
      isActive: false,
      name: '',
      description: ''
    });
  },
  methods: {
    async handleLectureSubmit() {
      try {
        this.$toasted.global.formSubmitting();
        const { data } = await addLecture({
          name: this.name,
          description: this.description,
          courseId: this.$route.params.id
        });
        this.isActive = false;
        this.name = '';
        this.description = '';
        this.$emit('add', data);
        this.$toasted.global.formSuccess({ message: 'Lecture added!' });
      } catch (err) {
        this.$toasted.global.formError({ message: 'Error while submitting lecture!' });
      }
    },
    toggleAddLecture() {
      this.isActive = !this.isActive;
      this.name = '';
      this.description = '';
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
.form-item-half {
  display: inline-block;
  margin: var(--spacing-xxs);
  width: calc(50% - 2 * var(--spacing-xxs))
}
.form-item-half input {
  padding: var(--spacing-sm);
}
.add-lecture-btn {
  position: absolute;
  top: -15px;
  right: 10px;
  width: 25px;
  height: 25px;
  padding: 0;
  background: var(--color-success);
  color: var(--color-white);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .5s ease;
}
.add-lecture-btn-active {
  background: var(--color-error);
  transition: all .5s ease;
}
.add-lecture-btn span {
  transition: all .3s ease;
}
.rotate {
  transform: rotate(-45deg);
}
.lecture-form {
  padding: var(--spacing-sm) 0;
}
.lecture-add {
  max-height: 0;
  overflow: hidden;
  transition: all .3s ease;
}
.lecture-add-active {
  max-height: 200px;
}
.lecture-add-btn {
  background: var(--color-success);
  border: 1px var(--color-accent) solid;
}
</style>
