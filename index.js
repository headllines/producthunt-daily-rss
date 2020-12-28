const { Feed } = require('feed');
const dayjs = require('dayjs');
const fs = require('fs');

const feed = new Feed({
  title: 'Product Hunt daily RSS feed',
  description: 'The missing RSS feed for ProductHunt daily top posts',
  link: 'https://github.com/headllines/producthunt-daily-rss',
});

const items = Array(15).fill()
  .map((_, i) => dayjs().subtract(i + 1, 'day'))
  .map(day => ({
    title: `Product Hunt daily top posts @${day.format('YYYY/MM/DD')}`,
    date: day.add(1, 'day').toDate(),
    link: `https://www.producthunt.com/time-travel/${day.format('YYYY/MM/DD')}/`,
  }))
  .forEach(item => feed.addItem(item));

const RSSXML = feed.rss2();
fs.writeFileSync('./rss.xml', RSSXML);
