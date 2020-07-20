<template>
  <div class="course-container flex-h justify-center">
    <base-form
      v-slot="{ isFormInvalid }"
      @submit="onUpdate"
      class="course-form">
      <span class="course-title">{{ originalName }}</span>
      <field
        v-model="course.name"
        :rules="nameRules"
        name="name"
        label="Name"
        class="full-bleed-form-item">
        <template v-slot="{ on, value }">
          <base-input
            v-on="on"
            :value="value"
            outlined />
        </template>
      </field>
      <field
        v-model="course.description"
        rules="required|lengthBetween:2,50"
        name="description"
        label="Description"
        class="full-bleed-form-item">
        <template v-slot="{ on, value }">
          <base-input
            v-on="on"
            :value="value"
            outlined />
        </template>
      </field>
      <field
        v-model="course.category"
        class="full-bleed-form-item"
        name="category"
        label="Category"
        rules="required">
        <template v-slot="{ on, value }">
          <base-select
            v-on="on"
            :value="value"
            value-key="id"
            label-key="name"
            :options="categories" />
        </template>
      </field>
      <field
        v-model="course.startDate"
        class="start-date-form-item"
        name="Start date"
        label="Start date (optional)">
        <template v-slot="{ on, value }">
          <base-input
            v-on="on"
            :value="value"
            :max="course.endDate"
            type="date"
            outlined />
        </template>
      </field>
      <field
        v-model="course.endDate"
        class="end-date-form-item"
        name="End date"
        label="End date (optional)">
        <template v-slot="{ on, value }">
          <base-input
            v-on="on"
            :value="value"
            :min="course.startDate"
            type="date"
            outlined />
        </template>
      </field>
      <base-button
        :disabled="isFormInvalid"
        class="button-form-item full-bleed-form-item"
        type="submit"
        contained primary>
        Save
      </base-button>
    </base-form>
  </div>
</template>

<script>
import { getByName, updateCourse } from '../../../api/courses';
import BaseButton from '../../../components/common/BaseButton';
import BaseForm from '../../../components/common/BaseForm';
import BaseInput from '../../../components/common/BaseInput';
import BaseSelect from '../../../components/common/BaseSelect';
import Field from '../../../components/common/BaseForm/Field';
import { getAllCategories } from '../../../api/categories';
import isEmpty from 'lodash/isEmpty';

export default {
  name: 'course-form',
  props: {
    course: { type: Object, required: true }
  },
  data() {
    return ({
      categories: [],
      originalName: null
    });
  },
  computed: {
    nameRules() {
      return {
        required: true,
        lengthBetween: { min: 2, max: 50 },
        uniqueCourse: { checkName: this.checkName, exception: this.originalName }
      };
    }
  },
  methods: {
    async onUpdate() {
      try {
        this.$toasted.global.formSubmitting();
        const { data: [updatedCourse] } = await updateCourse({
          ...this.course,
          categoryId: this.course.category.id
        });
        if (updatedCourse) {
          this.originalName = updatedCourse.name;
          this.$toasted.global.formSuccess({
            message: 'Course updated successfully!'
          });
          return;
        }
        this.$toasted.global.formError({
          message: 'Something went wrong while updating course!'
        });
      } catch (err) {
        this.$toasted.global.formError({ message: 'Something went wrong!' });
      }
    },
    async checkName(name) {
      const { data } = await getByName(name);
      return isEmpty(data);
    }
  },
  async created() {
    this.originalName = this.course.name;
    const { data } = await getAllCategories();
    this.categories = data;
  },
  components: {
    BaseButton,
    BaseForm,
    BaseInput,
    BaseSelect,
    Field
  }
};
</script>

<style scoped>
.course-container {
  padding: var(--spacing-xl) 0;
}
.course-form {
  width: 100%;
  max-width: var(--measure-md);
  padding: var(--spacing-md);
  display: grid;
  grid-template-columns: [start] 1fr 1fr [end];
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: var(--spacing-xs);
  grid-row-gap: var(--spacing-xs);
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  position: relative;
}
.course-title {
  position: absolute;
  top: -10px;
  left: 15px;
  background: var(--color-white);
  padding: 0 var(--spacing-xxs);
}
.full-bleed-form-item {
  grid-column: start / end;
}
.button-form-item {
  max-height: 30px;
}
@media only screen and (max-width: 480px) {
  .start-date-form-item,
  .end-date-form-item {
    grid-column: start / end;
  }
}
</style>
