<template>
  <div class="course-container">
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
        class="name-form-item">
        <template v-slot="{ on, value }">
          <base-input
            v-on="on"
            :value="value"
            outlined />
        </template>
      </field>
      <field
        v-model="course.description"
        rules="required|between:2,50"
        name="description"
        label="Description"
        class="description-form-item">
        <template v-slot="{ on, value }">
          <base-input
            v-on="on"
            :value="value"
            outlined />
        </template>
      </field>
      <field
        v-model="course.category"
        rules="required"
        name="category"
        label="Category"
        class="category-form-item">
        <template v-slot="{ on, value }">
          <base-select
            v-on="on"
            :value="value"
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
        class="button-form-item"
        type="submit"
        contained primary>
        Save
      </base-button>
    </base-form>
  </div>
</template>

<script>
import { checkNameAvailability, updateCourse } from '../../../api/courses';
import BaseButton from '../../../components/common/BaseButton';
import BaseForm from '../../../components/common/BaseForm';
import BaseInput from '../../../components/common/BaseInput';
import BaseSelect from '../../../components/common/BaseSelect';
import Field from '../../../components/common/BaseForm/Field';
import { getAllCategories } from '../../../api/categories';

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
        between: { min: 2, max: 50 },
        uniqueCourse: { checkName: this.checkName, exception: this.originalName }
      };
    }
  },
  methods: {
    async onUpdate() {
      try {
        this.$toasted.global.formSubmitting();
        const { data } = await updateCourse({
          ...this.course,
          categoryId: this.categories.find(
            category => category.name === this.course.category).id
        });
        this.originalName = data.data.name;
        this.$toasted.global.formSuccess({ message: 'Course added successfully!' });
      } catch (err) {
        this.$toasted.global.formError({ message: 'Something went wrong!' });
      }
    },
    async checkName(name) {
      const { data } = await checkNameAvailability(name);
      return data;
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
  display: flex;
  justify-content: center;
}
.course-form {
  width: 100%;
  max-width: var(--measure-md);
  padding: var(--spacing-md);
  display: grid;
  grid-template-columns: [start] 1fr [middle] 1fr [end];
  grid-template-rows: [first] 1fr [second] 1fr [third] 1fr [fourth] 1fr [fifth] 1fr;
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
.name-form-item {
  grid-column: start / end;
  grid-row: first;
}
.description-form-item {
  grid-column: start / end;
  grid-row: second;
}
.category-form-item {
  grid-column: start / end;
  grid-row: third;
}
.start-date-form-item {
  grid-column: start / middle;
  grid-row: fourth;
}
.end-date-form-item {
  grid-column: middle / end;
  grid-row: fourth;
}
.button-form-item {
  grid-column: start / end;
  grid-row: fifth;
  max-height: 30px;
}
@media only screen and (max-width: 480px) {
  .course-form {
    grid-template-rows:
      [first] 1fr [second] 1fr [third] 1fr [fourth] 1fr [fifth] 1fr [sixth] 1fr;
  }
  .start-date-form-item {
    grid-column: start / end;
    grid-row: fourth;
  }
  .end-date-form-item {
    grid-column: start / end;
    grid-row: fifth;
  }
  .button-form-item {
    grid-column: start / end;
    grid-row: sixth;
    max-height: 30px;
  }
}
</style>
