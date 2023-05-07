import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'ChatBot';

const config = {
  // initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  initialMessages: [createChatBotMessage(`Hi! please enter your query`),createChatBotMessage(`1-how to test my video`),createChatBotMessage(`2-how to check my profile`),createChatBotMessage(`3-Can I correct an erroneous exercise?`),createChatBotMessage(`4-I wish to report a bug`),createChatBotMessage(`5-How can I contact you?`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;