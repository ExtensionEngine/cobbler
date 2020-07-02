<template>
  <div>
    <div class="second-bar">
      <span @click="goBack" class="back-button">Go back</span>
    </div>
    <div class="course-container">
      <base-form
        v-slot="{ isFormInvalid }"
        @submit="onSubmit"
        class="course-form">
        <field
          v-model="name"
          class="form-item-full"
          name="name"
          label="Name*"
          rules="required|between:2,50|uniqueCourse">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              outlined />
          </template>
        </field>
        <field
          v-model="description"
          class="form-item-full"
          name="description"
          label="Description*"
          rules="required|between:2,50">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              outlined />
          </template>
        </field>
        <field
          v-model="category"
          class="form-item-full"
          name="category"
          label="Category*"
          rules="required">
          <template v-slot="{ on, value }">
            <base-select
              v-on="on"
              :value="value"
              :options="categories" />
          </template>
        </field>
        <field
          v-model="startDate"
          class="form-item-half"
          name="Start date"
          label="Start date">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              :max="endDate"
              type="date"
              outlined />
          </template>
        </field>
        <field
          v-model="endDate"
          class="form-item-half"
          name="End date"
          label="End date">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              :min="startDate"
              type="date"
              outlined />
          </template>
        </field>
        <base-button
          :disabled="isFormInvalid"
          type="submit"
          contained primary>
          Submit
        </base-button>
      </base-form>
    </div>
  </div>
</template>

<script>
import { addCourse } from '../../api/courses';
import BaseButton from '../../components/common/BaseButton';
import BaseForm from '../../components/common/BaseForm';
import BaseInput from '../../components/common/BaseInput';
import BaseSelect from '../../components/common/BaseSelect';
import Field from '../../components/common/BaseForm/Field';
import { getAllCategories } from '../../api/categories';
import paths from '../../router/paths';

export default {
  name: 'add-course',
  data() {
    return ({
      name: '',
      description: '',
      category: '',
      categories: [],
      startDate: null,
      endDate: null
    });
  },
  methods: {
    async onSubmit() {
      const categoryId = this.categories.find(category => category.name === this.category).id;

      const courseToAdd = {
        name: this.name,
        description: this.description,
        categoryId,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.$toasted.global.formSubmitting();
      try {
        await addCourse(courseToAdd);
        this.$toasted.global.formSuccess({ message: 'Course add successful!' });
        this.$router.push(paths.lecturer.base);
      } catch (err) {
        this.$toasted.global.formError({ message: 'Something went wrong' });
      }
    },
    goBack() {
      this.$router.push(paths.lecturer.base);
    }
  },
  async created() {
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
  padding: var(--spacing-xl) var(--spacing-md);
  display: flex;
  justify-content: center;
}
.course-form {
  width: 100%;
  max-width: var(--measure-md);
}
.form-item-full {
  margin: var(--spacing-sm) var(--spacing-xxs);
}
.form-item-half {
  display: inline-block;
  margin: var(--spacing-sm) var(--spacing-xxs);
  width: calc(50% - 2 * var(--spacing-xxs))
}
.second-bar {
  background: var(--color-gray-500);
  padding: var(--spacing-sm) var(--spacing-lg);
}
.back-button {
  background: var(--color-gray);
  border-radius: 3px;
  padding: var(--spacing-xxs) var(--spacing-xs);
  cursor: pointer;
  color: var(--color-white)
}
.back-button:hover {
  opacity: .8;
}
@media only screen and (max-width: 480px) {
  .form-item-half {
    display: block;
    margin: var(--spacing-sm) var(--spacing-xxs);
    width: auto;
  }
}
</style>
