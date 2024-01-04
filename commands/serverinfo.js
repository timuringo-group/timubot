const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('サーバー情報を表示します'),
  async execute(interaction) {
    await interaction.reply({embeds: [
                             {
                                author: {
                             icon_url:interaction.guild.iconURL(),
                             name: interaction.guild.name,
                           },
                                title: "サーバー情報",
                               color: 0x0B5EE3,
                               description: "名前:"+interaction.guild.name+'\n人数:'+interaction.guild.memberCount+'人\nアイコン'+interaction.guild.iconURL()+'\nブースト数:'+interaction.guild.premiumSubscriptionCount+'\nブーストレベル:'+interaction.guild.premiumTier,
                                timestamp: new Date(),
                                image: {
                           url: interaction.guild.iconURL()
                           },
                             },
                           ]});
  },
};



