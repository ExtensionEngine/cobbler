<template>
  <div>
    <div class="second-bar">
      <span @click="goBack" class="back-button">Go back</span>
    </div>
    <div class="course-container">
      <base-form
        v-slot="{ isFormValid }"
        @submit="onSubmit"
        class="course-form">
        <field
          v-model="name"
          class="name-form-item"
          name="name"
          label="Name"
          :rules="nameRules">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              outlined />
          </template>
        </field>
        <field
          v-model="description"
          class="description-form-item"
          name="description"
          label="Description"
          rules="required|lengthBetween:2,50">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              outlined />
          </template>
        </field>
        <field
          v-model="category"
          class="category-form-item"
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
          v-model="startDate"
          class="start-date-form-item"
          name="Start date"
          label="Start date (optional)">
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
          class="end-date-form-item"
          name="End date"
          label="End date (optional)">
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
          :disabled="!isFormValid"
          class="button-form-item"
          type="submit"
          contained primary>
          Submit
        </base-button>
      </base-form>
    </div>
  </div>
</template>

<script>
import { addCourse, checkNameAvailability } from '../../api/courses';
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
      category: null,
      categories: [],
      startDate: null,
      endDate: null
    });
  },
  computed: {
    nameRules() {
      return {
        required: true,
        between: { min: 2, max: 50 },
        uniqueCourse: { checkName: this.checkName }
      };
    }
  },
  methods: {
    async onSubmit() {
      const courseToAdd = {
        name: this.name,
        description: this.description,
        categoryId: this.category.id,
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
    },
    async checkName(name) {
      const { data } = await checkNameAvailability(name);
      return data;
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

<style>
.course-container {
  padding: var(--spacing-xl) var(--spacing-md);
  display: flex;
  justify-content: center;
}
.course-form {
  width: 100%;
  max-width: var(--measure-md);
  display: grid;
  grid-template-columns: [start] 1fr [middle] 1fr [end];
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: var(--spacing-xs);
  grid-row-gap: var(--spacing-xs);
}
.name-form-item,
.description-form-item,
.category-form-item,
.button-form-item {
  grid-column: start / end;
}
.button-form-item {
  max-height: 30px;
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
  .start-date-form-item,
  .end-date-form-item {
    grid-column: start / end;
  }
}
</style>
