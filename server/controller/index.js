const { StreamChat } = require('stream-chat');

module.exports = {
  chatToken: (req, res) => {
    // console.log(process.env.CHAT_KEY);
    const client = new StreamChat(process.env.CHAT_KEY, process.env.CHAT_SECRET);
    const { input } = req.body;

    if (input) {
      const token = client.createToken(input);
      // console.log(input, token);
      return res.json(token);
    }

    return res.json('Could not generate token');
  },
};
