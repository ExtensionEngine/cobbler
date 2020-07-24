import mitt from 'mitt';
const emmiter = mitt();

class SSEClient {
  constructor(connection, emitCb) {
    this.connection = connection.data;
    this.emitCb = emitCb;

    emmiter.on('new-post', this.emitCb);
  }

  subscribe() {
    this.connection
        .pipeThrough(new window.TextDecoderStream())
        .pipeThrough(SSEClient.parseToJsonStream())
        .pipeTo(new WritableStream({
          write: chunck => {
            emmiter.emit('new-post', chunck);
          }
        }));
  }

  static parseToJsonStream() {
    return new window.TransformStream({
      start(controller) {
        controller.buffer = '';
      },
      transform(payload, controller) {
        for (let i = 0; i < payload.length; i++) {
          if (payload.charCodeAt(i) === 10 && controller.buffer) {
            controller.enqueue(JSON.parse(controller.buffer));
            controller.buffer = '';
            continue;
          }
          controller.buffer += payload[i];
        }
      }
    });
  }
}

export default SSEClient;
