<template>
  <div>
    <second-bar />
    <template v-if="lecture">
      <h1>{{ lecture.name }}</h1>
      <p>{{ lecture.description }}</p>
      <teaching-element-list :teaching-elements="lecture.teachingElements" />
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
  async created() {
    try {
      const { data } = await getLecture(this.$route.params.id);
      this.lecture = data;
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    SecondBar,
    TeachingElementList
  }
};
</script>
