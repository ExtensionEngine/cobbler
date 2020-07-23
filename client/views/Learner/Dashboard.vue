<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="post">
      <input type="submit">
    </form>
  </div>
</template>

<script>
import { addPost, subscribe } from '../../api/sse';

export default {
  name: 'learner-dashboard',
  data() { return ({ post: '' }); },
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
    const readableStream = await subscribe();
    const decodedStream =
      await readableStream.data.pipeThrough(new window.TextDecoderStream());
    const jsonStream = await decodedStream.pipeThrough(new window.TransformStream({
      transform: (payload, controller) => controller.enqueue(JSON.parse(payload))
    }));
    console.log(await jsonStream.getReader().read());
    // const writableStream = await jsonStream.pipeTo(new WritableStream());
    // console.log(writableStream);
  }
};
</script>
