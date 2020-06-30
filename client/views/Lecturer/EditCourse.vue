<template>
  <div v-if="course">
    <second-bar />
    <div class="course-wrapper">
      <base-form
        v-slot="{ isFormInvalid }"
        @submit="onUpdate"
        class="course-container">
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
    <div class="lectures-wrapper">
      <div class="lectures-container">
        <span class="lectures-title">Lectures</span>
        <base-button
          @click="toggleAddLecture"
          :class="{'add-lecture-btn-active': lectureAdd.isActive}"
          class="add-lecture-btn"
          outlined>
          <span :class="{rotate: lectureAdd.isActive}">+</span>
        </base-button>
        <div :class="{'lecture-add-active': lectureAdd.isActive}" class="lecture-add">
          <base-form
            v-slot="{ isFormInvalid }"
            @submit="handleLectureSubmit"
            class="lecture-form">
            <field
              v-model="lectureAdd.name"
              class="form-item-half"
              name="name"
              label="Name*"
              rules="required|between:2,50">
              <template v-slot="{ on, value }">
                <base-input
                  v-on="on"
                  :value="value"
                  outlined />
              </template>
            </field>
            <field
              v-model="lectureAdd.description"
              class="form-item-half"
              name="description"
              label="Description">
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
        <collapsible
          v-for="lecture in lectures"
          :key="lecture.id"
          @toggleExpand="handleExpandToggle"
          :id="lecture.id"
          :title="lecture.name"
          :expanded="lecture.expanded"
          class="lecture">
          <p>{{ lecture.description || 'No description available yet' }}</p>
        </collapsible>
        <p v-if="!lectures.length">No lectures added yet!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourse, updateCourse } from '../../api/courses';
import { addLecture } from '../../api/lectures';
import BaseButton from '../../components/common/BaseButton';
import BaseForm from '../../components/common/BaseForm';
import BaseInput from '../../components/common/BaseInput';
import BaseSelect from '../../components/common/BaseSelect';
import Collapsible from '../../components/common/Collapsible';
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
      originalName: null,
      lectureAdd: {
        isActive: false,
        name: '',
        description: ''
      }
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
    },
    handleExpandToggle(lectureId) {
      this.lectures = this.lectures.map(lecture => lecture.id === lectureId
        ? { ...lecture, expanded: !lecture.expanded }
        : lecture);
    },
    toggleAddLecture() {
      this.lectureAdd = {
        isActive: !this.lectureAdd.isActive,
        name: '',
        description: ''
      };
    },
    async handleLectureSubmit() {
      try {
        // TODO: Add toast
        const { data } = await addLecture({ ...this.lectureAdd, courseId: this.course.id });
        this.lectures.push(data);
        console.log(data);
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
    Collapsible,
    Field,
    SecondBar
  }
};
</script>

<style scoped>
.course-wrapper,
.lectures-wrapper {
  padding: var(--spacing-md) 0;
  display: flex;
  justify-content: center;
}
.lectures-wrapper {
  padding: 0;
}
.course-container {
  max-width: 550px;
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  padding: var(--spacing-sm);
  padding-top: var(--spacing-md);
  position: relative;
}
.course-title,
.lectures-title {
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
.lectures-container {
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: solid 1px var(--color-gray);
  border-radius: 3px;
  padding: var(--spacing-sm);
  padding-top: var(--spacing-md);
  position: relative;
}
.lecture {
  margin: var(--spacing-sm) 0;
  flex-basis: 50%;
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
@media only screen and (max-width: 480px) {
  .lecture {
    flex-basis: 100%;
  }
}
</style>
