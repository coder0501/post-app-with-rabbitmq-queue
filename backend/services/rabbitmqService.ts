const amqp = require('amqplib/callback_api');
import type { Channel } from 'amqplib'; // TypeScript import for type only

let channel: Channel | undefined;

/** 
 * Connects to RabbitMQ and creates a channel.
 */
const connectRabbitMQ = (): void => {
  amqp.connect('amqp://localhost', (error0: Error, connection: any) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1: Error, ch: Channel) => {
      if (error1) {
        throw error1;
      }
      channel = ch;
      channel.assertQueue('post_queue', { durable: true });
    });
  });
};

/**
 * Adds a Post object to the RabbitMQ queue.
 * @param post - The Post object to be added to the queue.
 */
const addToQueue = (post: object): void => {
  if (channel) {
    channel.sendToQueue('post_queue', Buffer.from(JSON.stringify(post)));
  }
};

export { connectRabbitMQ, addToQueue };
