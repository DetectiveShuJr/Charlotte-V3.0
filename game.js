function getFakeProfile(p) {
  return {
    username: `Player${p}`,
    createdAt: '2023-01-01',
    lastPlayed: '2023-05-01',
    stats: {
      level: 10 + p,
      rank: `#${1000 - p}`,
      wins: 20 + p,
      losses: 5 + p,
      realms: 3 + p,
    },
  };
}

function getWikiItem(item) {
  return {
    name: item,
    description: `This is a description for ${item}.`,
    rarity: 'Rare',
  };
}

module.exports = {
  getFakeProfile,
  getWikiItem,
};
