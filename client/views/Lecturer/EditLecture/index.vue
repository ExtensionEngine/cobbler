<template>
  <div>
    <second-bar />
    <template v-if="lecture">
      <h1>{{ lecture.name }}</h1>
      <p>{{ lecture.description }}</p>
      <teaching-element-list
        @drop="onDrop"
        :teaching-elements="lecture.teachingElements" />
    </template>
  </div>
</template>

<script>
import { getLecture } from '../../../api/lectures';
import SecondBar from '../../../components/Lecturer/SecondBar';
import TeachingElementList from './TeachingElementList';

export default {
  name: 'edit-lecture',
  data() {
    return ({
      lecture: null
    });
  },
  methods: {
    onDrop(oldIndex, newIndex, element) {
      const { teachingElements } = this.lecture;
      teachingElements.splice(oldIndex, 1);
      teachingElements.splice(newIndex, 0, element);
      teachingElements.forEach((element, index) => { element.position = index; });
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
    TeachingElementList
  }
};
</script>
