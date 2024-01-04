const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('randamelevator')
    .setDescription('ランダムにエレベーター関連用語もどきを言います。'),
  async execute(interaction) {
    const arr = ['三菱', '日立', '東芝', 'ロープ式', '油圧式', 'ネクスキューブ', 'アクシーズ', 'エレモーション', 'エレベーター', 'アクシーズリンクス', 'エレアド', 'エレパック', 'ネタ無いや（'];
    await interaction.reply(arr[Math.floor(Math.random() * arr.length)]);
  },
};



