import { StreamChat } from 'stream-chat';

const pirates = ['Monkey D. Luffy', 'Roronoa Zoro', 'Nami', 'Usopp', 'Sanji', 'Tony Tony Chopper', 'Nico Robin', 'Franky', 'Brook', 'Jinbe', 'Trafalgar D. Water Law', 'Eustass Kid', 'Basil Hawkins', 'Scratchmen Apoo', 'X Drake', 'Jewelry Bonney', 'Capone Bege', 'Charlotte Katakuri', 'Marshall D. Teach', 'Gol D. Roger'];

const adj = ['Fearless', 'Daring', 'Ruthless', 'Brave', 'Savage', 'Reckless', 'Cunning', 'Bold', 'Unpredictable', 'Fierce', 'Cruel', 'Sly', 'Vicious', 'Intrepid', 'Audacious', 'Resourceful', 'Wily', 'Tenacious', 'Unyielding', 'Adventurous', 'Swashbuckling', 'Relentless', 'Roguish', 'Dastardly', 'Formidable', 'Merciless', 'Wild', 'Ingenious', 'Indomitable', 'Intriguing', 'Cutthroat'];

const fans = ['Enthusiasts', 'Supporters', 'Followers', 'Admirers', 'Devotees', 'Aficionados', 'Fandom', 'Cohort', 'Collective', 'Community', 'Audience', 'Constituency', 'Tribe', 'Clan', 'Clique', 'Syndicate', 'Team', 'Squad', 'Gang', 'Posse', 'Alliance', 'Crew', 'Fellowship', 'Brotherhood', 'Society', 'Association', 'Assembly', 'Congregation', 'Gathering', 'Mob'];

const nameGenerator = () => {
  const rand = (array) => array[Math.floor(Math.random() * array.length)];

  return [rand(adj), rand(pirates), rand(fans), Math.floor(Math.random() * 100)].join(' ');
};

const createChannel = (friends, setChannel, navigation, userId) => {
  const members = friends.map((friend) => friend.uid);
  console.log([userId, ...members]);

  const chatClient = StreamChat.getInstance('626qs6wjba72');
  const channelClient = chatClient.channel('messaging', {
    members: [userId, ...members],
    name: nameGenerator(),
  });

  channelClient.create()
    .then((result) => {
      setChannel(result.channel);
      // navigation.navigate('Nav', {
      //   screen: 'Messaging',
      //   params: {

      //   },
      // });
    })
    .catch((error) => console.log(error));
};

export default createChannel;
