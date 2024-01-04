const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping'),
  async execute(interaction) {
    // Pong!と返信
    await interaction.reply({
      embeds: [
        {
          title: "Ping情報",
          color: 0x0B5EE3,
          description: "APIレイテンシ\n" + `${Date.now() - interaction.createdTimestamp}ms\n詳細は「tm.ping」`,
          timestamp: new Date(),
        },
      ]
    });
  },
};
