const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('あれ')
    .addStringOption(option =>
      option
          .setName('content')
          .setDescription('内容を入力します。')
          .setRequired(true) 
  ),
  async execute(interaction) {
     const content = interaction.options.getString('content');
     await interaction.reply(content);
  },
};
