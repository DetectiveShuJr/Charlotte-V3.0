const { SlashCommandBuilder } = require('discord.js');
const store = require('../../storage/savingsStore');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('savings')
    .setDescription('Manage your savings goal')
    .addSubcommand(sub =>
      sub
        .setName('set')
        .setDescription('Set a savings goal')
        .addNumberOption(o =>
          o.setName('amount')
            .setDescription('Target amount in dollars')
            .setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName('add')
        .setDescription('Add funds to your goal')
        .addNumberOption(o =>
          o.setName('amount')
            .setDescription('Amount to add in dollars')
            .setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName('get')
        .setDescription('Check your current savings progress')
    )
    .addSubcommand(sub =>
      sub
        .setName('delete')
        .setDescription('Delete your savings goal')
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const amount = interaction.options.getNumber('amount');
    const userId = interaction.user.id;

    if (sub === 'set') {
      if (amount <= 0) {
        return interaction.reply({ content: 'Please enter a positive number for your goal.', ephemeral: true });
      }
      await store.set(userId, { goal: amount, current: 0 });
      return interaction.reply(`Your savings goal is set to $${amount.toFixed(2)}.`);
    }

    if (sub === 'add') {
      if (amount <= 0) {
        return interaction.reply({ content: 'Please enter a positive amount to add.', ephemeral: true });
      }

      const data = await store.get(userId);
      if (!data) {
        return interaction.reply({ content: 'No goal found. Use `/savings set <amount>` first.', ephemeral: true });
      }

      const updated = { ...data, current: (data.current || 0) + amount };

      if (updated.current >= updated.goal) {
        await store.del(userId);
        return interaction.reply(`🎉 You reached your goal of $${updated.goal.toFixed(2)}! Congratulations!`);
      }

      await store.set(userId, updated);
      const pct = ((updated.current / updated.goal) * 100).toFixed(2);
      return interaction.reply(`You’ve saved $${updated.current.toFixed(2)} of $${updated.goal.toFixed(2)} (${pct}%).`);
    }

    if (sub === 'get') {
      const data = await store.get(userId);
      if (!data) {
        return interaction.reply({ content: 'No goal found. Use `/savings set <amount>` first.', ephemeral: true });
      }
      const pct = ((data.current / data.goal) * 100).toFixed(2);
      return interaction.reply(`Your current savings: $${data.current.toFixed(2)} of $${data.goal.toFixed(2)} (${pct}%).`);
    }

    if (sub === 'delete') {
      const data = await store.get(userId);
      if (!data) {
        return interaction.reply({ content: 'No goal found to delete.', ephemeral: true });
      }
      await store.del(userId);
      return interaction.reply('Your savings goal has been deleted.');
    }
  }
};