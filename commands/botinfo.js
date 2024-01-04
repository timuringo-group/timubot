const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('botの情報が確認できます。'),
  async execute(interaction) {
        // Pong!と返信
    await interaction.reply({
  "content": "",
  "tts": false,
  "embeds": [
    {
      "description": "Made by tmyt105\nVersion v2.02\n",
      "fields": [
        {
          "id": 581893839,
          "name": "アップデートログ",
          "value": "v1.0\nリリース\nv1.2\nスラッシュコマンド実装\nv2.0\nスラッシュコマンドのdiscord.jsv14に対応\nv2.01\nbotinfo機能追加\nv2.02\nSayを実装"
        }
      ],
      "author": {
        "name": "ちむのサーバー専用bot",
        "icon_url": "https://cdn.discordapp.com/avatars/1152453551835070514/9544f828758ce696c0b174c210f8c934.png?size=1024"
      },
      "footer": {
        "text": "tmyt105",
        "icon_url": "https://cdn.discordapp.com/avatars/1077534771476975656/8c731245d2b8ad7e8e903128be97981d.png?size=1024"
      }
    }
  ],
  "components": [],
  "actions": {}
});
  },
};
