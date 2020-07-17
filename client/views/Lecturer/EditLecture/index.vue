<template>
  <div>
    <second-bar />
    <template v-if="lecture">
      <h1>{{ lecture.name }}</h1>
      <p>{{ lecture.description }}</p>
      <div class="lecture-editor">
        <teaching-element-list
          @drop="onDrop"
          @select="onSelect"
          :teaching-elements="lecture.teachingElements"
          class="teching-elements" />
        <te-form :teaching-element="selectedTe" class="teaching-element-form" />
      </div>
    </template>
  </div>
</template>

<script>
import { getLecture } from '../../../api/lectures';
import SecondBar from '../../../components/Lecturer/SecondBar';
import TeachingElementList from './TeachingElementList';
import TeForm from './TeForm';

export default {
  name: 'edit-lecture',
  data() {
    return ({
      lecture: null,
      selectedTe: null
    });
  },
  methods: {
    onDrop(oldIndex, newIndex, element) {
      const { teachingElements } = this.lecture;
      teachingElements.splice(oldIndex, 1);
      teachingElements.splice(newIndex, 0, element);
      teachingElements.forEach((element, index) => { element.position = index; });
    },
    onSelect(lecture) {
      this.selectedTe = lecture;
    }
  },
  async created() {
    try {
      const { data } = await getLecture(this.$route.params.id);
      this.lecture = data;
    } catch (err) {
      this.$toasted.error('Something went wrong while getting lectures!');
    }
  },
  components: {
    SecondBar,
    TeachingElementList,
    TeForm
  }
};
</script>

<style scoped>
.lecture-editor {
  display: flex;
}
.teaching-element-form {
  flex-grow: 1
}
.teaching-elements {
  max-width: var(--measure-sm)
}
</style>
