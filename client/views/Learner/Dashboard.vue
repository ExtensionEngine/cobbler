<template>
  <div>
    <div v-for="({ post }, i) in posts" :key="i">
      {{ post }}
    </div>
    <form @submit.prevent="onSubmit">
      <input v-model="post">
      <input type="submit">
    </form>
  </div>
</template>

<script>
import { addPost, subscribe } from '../../api/sse';
import SSEClient from '../../SSEClient';

export default {
  name: 'learner-dashboard',
  data() {
    return ({
      sseClient: null,
      post: '',
      posts: []
    });
  },
  methods: {
    async onSubmit() {
      try {
        await addPost({ post: this.post });
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    this.sseClient = new SSEClient(
      await subscribe(),
      payload => this.posts.push(payload)
    );
    this.sseClient.subscribe();
  }
};
</script>
