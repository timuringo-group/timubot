const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('動作確認。'),
  async execute(interaction) {
    // Pong!と返信
    await interaction.reply({
      content: "動いてるよ〜",
      ephemeral: false,
    });
  },
};
