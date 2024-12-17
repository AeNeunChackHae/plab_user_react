const teamImages = {
  redTeam: 'https://d31wz4d3hgve8q.cloudfront.net/media/tongue.svg', // 이름없는교회
  blueTeam: 'https://d31wz4d3hgve8q.cloudfront.net/media/lion.svg', // BAU_백석FC
  yellowTeam: 'https://d31wz4d3hgve8q.cloudfront.net/media/emblem/613241_1000017967.jpg', // 못친소FC
};

const teamNames = {
  redTeam: '이름없는교회',
  blueTeam: 'BAU_백석FC',
  yellowTeam: '못친소FC',
};

export const matchData = {
  results: [
    {
      round: 1,
      team1: { name: teamNames.redTeam, score: 3, emblem: teamImages.redTeam },
      team2: { name: teamNames.blueTeam, score: 9, emblem: teamImages.blueTeam },
    },
    {
      round: 2,
      team1: { name: teamNames.redTeam, score: 1, emblem: teamImages.redTeam },
      team2: { name: teamNames.yellowTeam, score: 2, emblem: teamImages.yellowTeam },
    },
    {
      round: 3,
      team1: { name: teamNames.blueTeam, score: 3, emblem: teamImages.blueTeam },
      team2: { name: teamNames.yellowTeam, score: 5, emblem: teamImages.yellowTeam },
    },
    {
      round: 4,
      team1: { name: teamNames.yellowTeam, score: 9, emblem: teamImages.yellowTeam },
      team2: { name: teamNames.redTeam, score: 3, emblem: teamImages.redTeam },
    },
    {
      round: 5,
      team1: { name: teamNames.blueTeam, score: 9, emblem: teamImages.blueTeam },
      team2: { name: teamNames.yellowTeam, score: 2, emblem: teamImages.yellowTeam },
    },
    {
      round: 6,
      team1: { name: teamNames.blueTeam, score: 9, emblem: teamImages.blueTeam },
      team2: { name: teamNames.redTeam, score: 2, emblem: teamImages.redTeam },
    },
    {
      round: 7,
      team1: { name: teamNames.yellowTeam, score: 5, emblem: teamImages.yellowTeam },
      team2: { name: teamNames.blueTeam, score: 9, emblem: teamImages.blueTeam },
    },
    {
      round: 8,
      team1: { name: teamNames.yellowTeam, score: 5, emblem: teamImages.yellowTeam },
      team2: { name: teamNames.redTeam, score: 1, emblem: teamImages.redTeam },
    },
    {
      round: 9,
      team1: { name: teamNames.blueTeam, score: 0, emblem: teamImages.blueTeam },
      team2: { name: teamNames.yellowTeam, score: 9, emblem: teamImages.yellowTeam },
    },
  ],
};

export { teamImages, teamNames };
