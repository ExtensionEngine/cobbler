<template>
  <div>
    <second-bar />
    <div v-if="course" class="form-wrapper">
      <base-form
        v-slot="{ isFormInvalid }"
        @submit="onUpdate"
        class="course-form">
        <field
          v-model="course.name"
          class="form-item-half"
          :debounce="300"
          name="name"
          label="Name*"
          :rules="`required|between:2,50|uniqueCourse:${originalName}`">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              outlined />
          </template>
        </field>
        <field
          v-model="course.Category.name"
          class="form-item-half"
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
          v-model="course.startDate"
          class="form-item-half"
          name="Start date"
          label="Start date">
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
          class="form-item-half"
          name="End date"
          label="End date">
          <template v-slot="{ on, value }">
            <base-input
              v-on="on"
              :value="value"
              :min="course.startDate"
              type="date"
              outlined />
          </template>
        </field>
        <field
          v-model="course.description"
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
        <base-button
          :disabled="isFormInvalid"
          type="submit"
          contained primary>
          Save
        </base-button>
      </base-form>
    </div>
  </div>
</template>

<script>
import { getCourse, updateCourse } from '../../api/courses';
import BaseButton from '../../components/common/BaseButton';
import BaseForm from '../../components/common/BaseForm';
import BaseInput from '../../components/common/BaseInput';
import BaseSelect from '../../components/common/BaseSelect';
import DateFormat from 'date-fns/format';
import Field from '../../components/common/BaseForm/Field';
import { getAllCategories } from '../../api/categories';
import SecondBar from './SecondBar';

export default {
  name: 'edit-course',
  data() {
    return ({
      course: null,
      categories: [],
      originalName: null
    });
  },
  methods: {
    async onUpdate() {
      try {
        const { data } = await updateCourse({
          ...this.course,
          categoryId: this.categories.find(
            category => category.name === this.course.Category.name).id
        });
        // TODO: Add toast notifications when merged with toast branch
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  },
  async created() {
    const [courseResponse, categoriesResponse] = await Promise.all([getCourse(this.$route.params.id), getAllCategories()]);
    this.originalName = courseResponse.data.name;
    this.course = {
      ...courseResponse.data,
      startDate: courseResponse.data.startDate && DateFormat(new Date(courseResponse.data.startDate), 'yyyy-MM-dd'),
      endDate: courseResponse.data.endDate && DateFormat(new Date(courseResponse.data.endDate), 'yyyy-MM-dd')
    };
    this.categories = categoriesResponse.data;
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
.form-wrapper {
  padding: var(--spacing-md) 0;
  display: flex;
  justify-content: center;
}
.course-form {
  max-width: 550px;
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  padding: var(--spacing-sm);

}
.form-item-full {
  margin: var(--spacing-xs) var(--spacing-xxs);
}
.form-item-half {
  display: inline-block;
  margin: var(--spacing-xxs);
  width: calc(50% - 2 * var(--spacing-xxs))
}
.form-item-full input,
.form-item-full select,
.form-item-half input {
  padding: var(--spacing-sm);
}
@media only screen and (max-width: 480px) {
  .form-item-half {
  display: block;
  margin: var(--spacing-sm) var(--spacing-xxs);
  width: auto;
  }
}
</style>
