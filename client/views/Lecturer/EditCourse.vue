<template>
  <div>
    <second-bar />
    <div v-if="course" class="course-wrapper">
      <base-form
        v-slot="{ isFormInvalid }"
        @submit="onUpdate"
        class="course-form">
        <span class="course-title">{{ originalName }}</span>
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
          v-model="course.category"
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
    <div class="lecture-wrapper">
      <div v-for="lecture in lectures" :key="lecture.id">{{ lecture.name }}</div>
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
      lectures: [],
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
            category => category.name === this.course.category).id
        });
        this.originalName = data.name;
        console.log(data);
        // TODO: Add toast notifications when merged with toast branch
      } catch (err) {
        console.log(err);
      }
    }
  },
  async created() {
    const [courseResponse, categoriesResponse] = await Promise.all([
      getCourse(this.$route.params.id),
      getAllCategories()
    ]);

    const { id, name, description, startDate, endDate, Category, Lectures } = courseResponse.data;
    this.originalName = name;
    this.course = {
      id,
      name,
      description,
      category: Category.name,
      startDate: courseResponse.data.startDate &&
        DateFormat(new Date(startDate), 'yyyy-MM-dd'),
      endDate: courseResponse.data.endDate &&
        DateFormat(new Date(endDate), 'yyyy-MM-dd')
    };
    this.lectures = Lectures;
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
.course-wrapper {
  padding: var(--spacing-md) 0;
  display: flex;
  justify-content: center;
}
.course-form {
  max-width: 550px;
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  padding: var(--spacing-sm);
  padding-top: var(--spacing-md);
  position: relative;
}
.course-title {
  position: absolute;
  top: -12px;
  left: 14px;
  background: var(--color-white);
  padding: 0 5px;
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
