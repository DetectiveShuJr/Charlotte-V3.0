const { SlashCommandBuilder } = require('discord.js');
const db = require('../../utils/db.js');
const { parseISO, isValid, format, isBefore } = require('date-fns');
const { v4: uuid } = require('uuid');
const cron = require('node-cron');
const { buildCalendar } = require('../../utils/calendar.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('plan')
    .setDescription('Create or list your plans')
        .addSubcommand(sub =>
    sub
      .setName('create')
      .setDescription('Schedule a new plan')
      .addStringOption(opt =>
        opt
          .setName('date')
          .setDescription('Use YYYY-MM-DD')
          .setRequired(true))
      .addStringOption(opt =>
        opt
          .setName('description')
          .setDescription('What’s the plan?')
          .setRequired(true)))
  
  // Subcommand: list
  .addSubcommand(sub =>
    sub
      .setName('list')
      .setDescription('Show calendar of plans')
      .addIntegerOption(opt =>
        opt
          .setName('month')
          .setDescription('1–12')
          .setRequired(false))
      .addIntegerOption(opt =>
        opt
          .setName('year')
          .setDescription('YYYY')
          .setRequired(false))),

async execute(interaction) {
    await db.read();
    db.data ||= { plans: [] };

  const sub = interaction.options.getSubcommand();

  if (sub === 'create') {
    const dateStr = interaction.options.getString('date', true);
    const desc = interaction.options.getString('description', true);
    const date = parseISO(dateStr);

    if (!isValid(date)) {
      return interaction.reply({ content: 'Invalid date format. Use YYYY-MM-DD.', ephemeral: true });
    }

    db.data.plans.push({
      id: uuid(),
      guildId: interaction.guildId,
      userId: interaction.user.id,
      date: dateStr,
      description: desc
    });
    await db.write();

    return interaction.reply({ content: `🗓️ Plan set for ${dateStr}: ${desc}`, ephemeral: false });
  }

  if (sub === 'list') {
    const now = new Date();
    const month = interaction.options.getInteger('month') ?? now.getMonth() + 1;
    const year = interaction.options.getInteger('year') ?? now.getFullYear();

    const plans = db.data.plans.filter(p =>
      p.guildId === interaction.guildId &&
      format(parseISO(p.date), 'yyyy') === String(year) &&
      format(parseISO(p.date), 'M') === String(month)
    );

    const calendarEmbed = buildCalendar(month, year, plans);
    return interaction.reply({ embeds: [calendarEmbed] });
  }
}
}

cron.schedule('0 0 * * *', async () => {
  await db.read();
  db.data.plans = db.data.plans.filter(plan =>
    !isBefore(parseISO(plan.date), new Date())
  );
  await db.write();
  console.log('Expired plans purged.');
});
