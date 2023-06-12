import React from 'React';
import { Box, AspectRatio } from 'native-base';

const testProfile = {
  name: 'Duffy',
  imageUrl: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/290988318_109313751840085_5040282127918231405_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HQZ7oPj-PE8AX-E_LdX&_nc_ht=scontent-sjc3-1.xx&oh=00_AfBKhwU_8O1hGjeDk0VRKad5FYT4mTCGpEylscA_jy69Ew&oe=648B951B',
};

const badge = ({ profile, height, width }) => (
  <Box width={width} height={height} />
);

export default badge;
