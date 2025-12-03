// utils/calendar.js
const {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  isToday,
  parseISO
} = require('date-fns');

const { EmbedBuilder } = require('discord.js');

function buildCalendar(month, year, plans) {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });

  // Group plans by day
  const eventsByDay = {};
  for (const plan of plans) {
    const d = format(parseISO(plan.date), 'd');
    // If your Node version doesn’t support ||=, use this:
    // if (!eventsByDay[d]) eventsByDay[d] = [];
    eventsByDay[d] ||= [];
    eventsByDay[d].push(plan.description);
  }

  // Build grid text
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  let grid = weekdays.join(' ') + '\n' + '   '.repeat(getDay(start));

  days.forEach((date) => {
    const d = date.getDate();
    let cell = String(d).padStart(2, ' ');
    if (eventsByDay[d]) cell = `${cell}`;
    if (isToday(date)) cell = `${cell}`;

    grid += cell + ' ';
    if (getDay(date) === 6) grid += '\n';
  });

  const embed = new EmbedBuilder()
    .setTitle(`📅 ${format(start, 'MMMM yyyy')}`)
    .setDescription('`' + grid.trim() + '`')
    .setColor('#87CEEB');

  // List events under calendar
  for (const [day, descs] of Object.entries(eventsByDay)) {
    embed.addFields({
      name: `Day ${day}`,
      value: descs.map((d, i) => `${i + 1}. ${d}`).join('\n')
    });
  }

  return embed;
}

module.exports = { buildCalendar };