<template>
  <div>
    <second-bar />
    <div class="course-container flex-h justify-center">
      <base-form
        v-slot="{ isFormValid }"
        @submit="onSubmit"
        class="course-form">
        <field
          v-model="name"
          class="full-bleed-form-item"
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
          class="full-bleed-form-item"
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
          class="button-form-item full-bleed-form-item"
          type="submit"
          contained primary>
          Submit
        </base-button>
      </base-form>
    </div>
  </div>
</template>

<script>
import { addCourse, getByName } from '../../api/courses';
import BaseButton from '../../components/common/BaseButton';
import BaseForm from '../../components/common/BaseForm';
import BaseInput from '../../components/common/BaseInput';
import BaseSelect from '../../components/common/BaseSelect';
import Field from '../../components/common/BaseForm/Field';
import { getAllCategories } from '../../api/categories';
import isEmpty from 'lodash/isEmpty';
import paths from '../../router/paths';
import SecondBar from '../../components/Lecturer/SecondBar';

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
        lengthBetween: { min: 2, max: 50 },
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
    async checkName(name) {
      const { data } = await getByName(name);
      return isEmpty(data);
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
    Field,
    SecondBar
  }
};
</script>

<style scoped>
.course-container {
  padding: var(--spacing-xl) var(--spacing-md);
}
.course-form {
  width: 100%;
  max-width: var(--measure-md);
  display: grid;
  grid-template-columns: [start] 1fr 1fr [end];
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: var(--spacing-xs);
  grid-row-gap: var(--spacing-xs);
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
  .button-form-item {
    grid-column: start / end;
    grid-row: sixth;
    max-height: 30px;
  }
}
</style>
