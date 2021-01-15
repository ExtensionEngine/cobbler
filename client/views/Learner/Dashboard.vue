<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="text">
      <input type="submit">
    </form>
    <div v-for="post in posts" :key="post">{{ post }}</div>
  </div>
</template>

<script>
import { addPost, subscribe } from '../../api/sse';
import miss from 'mississippi';
import mitt from 'mitt';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';

export default {
  name: 'learner-dashboard',
  data: () => ({ posts: [], text: '', emitter: mitt() }),
  methods: {
    async onSubmit() {
      try {
        await addPost({ post: this.text });
        this.text = '';
      } catch (error) {
        console.log(error);
      }
    },
    emit(buf, enc, next) {
      const { event, data } = JSON.parse(buf.toString());
      this.emitter.emit(event, data);
      next();
    }
  },
  async created() {
    const response = await subscribe();
    const sse = new ReadableWebToNodeStream(response.data);
    miss.pipe(sse, miss.through.obj(this.emit));
    this.emitter.on('CONNECTED', () => {
      console.log('Connected');
    });
    this.emitter.on('POST_CREATED', ({ post }) => {
      this.posts.push(post);
    });
  }
};
</script>
