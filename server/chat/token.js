// useChatClient.js
import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(process.env.CHAT_KEY);

export default chatClient;
