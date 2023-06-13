const { StreamChat } = require('stream-chat');

module.exports = {
  chatToken: (req, res) => {
    const client = new StreamChat(process.env.CHAT_KEY, process.env.CHAT_SECRET, { timeout: 6000 });
    const { input } = req.body;
    console.log(input);
    if (input) {
      const token = client.createToken(input);
      return res.json(token);
    }

    return res.json('Could not generate token');
  },
};
