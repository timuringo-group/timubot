const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
});
const fs = require('fs');
client.on('ready', client => {
  console.log(`${client.user.tag}`);
  console.log(`起動に成功しました`);
  client.user.setPresence({ activities: [{ name: `ちむのサーバー` }], status: "online" });
});


const dotenv = require('dotenv');

dotenv.config();




client.once("ready", async () => {
  console.log("Ready!");
  //コマンド登録
  const { REST, Routes } = require('discord.js');
  const { clientId, guildId } = require('./dvc.json');
  const clientId = "1152453551835070514"
  const clientId = "1092451952585080852"
  const fs = require('node:fs');

  const commands = [];
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(config.token);

  (async () => {
    try {


      const data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );

      console.log(`${data.length} 個のアプリケーションコマンドを登録しました。`);
    } catch (error) {
      console.error(error);
    }
  })();

});



client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`${filePath} に必要な "data" か "execute" がありません。`);
  }
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`${interaction.commandName} が見つかりません。`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
  }
});

client.on('messageCreate', async message => {
  if (message.content == ('tm.ping')) {
    message.channel.send({
      embeds: [
        {
          title: "Ping情報",
          color: 0x0B5EE3,
          description: "### WebSocket\n" + client.ws.ping + "ms\n### APIレイテンシ\n" + `${Date.now() - message.createdTimestamp}ms`,
          timestamp: new Date(),
        },
      ]
    }).catch(console.error);
  }
});






client.on('guildMemberAdd', member => {
  const date = new Date();
  const currentTime = formattedDateTime(date);
  

  

  client.channels.cache.get('1092451953180692563').send(`ようこそ！<@${member.id}>さんが参加しました`)
  client.channels.cache.get('1188767059182616617').send(`<@${member.id}>(${member.id})${currentTime}`)
  function formattedDateTime(date) {
    const y = date.getFullYear();
    const m = ('0' + (date.getMonth() + 1)).slice(-2);
    const d = ('0' + date.getDate()).slice(-2);
    const h = ('0' + date.getHours()).slice(-2);
    const mi = ('0' + date.getMinutes()).slice(-2);
    const s = ('0' + date.getSeconds()).slice(-2);

    return y + m + d + h + mi + s;
  }
})

client.on('messageCreate', async message => {
  const useridinfo2 = message.content
  const useridinfo = useridinfo2.split(' ')[1]
  if (message.content.includes('tm.userinfo')) {
    //client.users.cache.get(id)
    if (message.content === 'tm.userinfo' || message.content === 'tm.userinfo true') {

      if (useridinfo2.split(' ')[1] === 'true') {
        message.channel.send({
          embeds: [
            {
              author: {
                icon_url: message.member.displayAvatarURL({ extension: 'png' }),
                name: message.member.username,
              },
              title: "ユーザー情報(サーバー)",
              color: 0x0B5EE3,
              description: 'ユーザーネーム:' + message.author.username + '\nアイコンURL:' + message.member.displayAvatarURL({ size: 1024 }) + "\n下にアイコン",
              timestamp: new Date(),
              image: {
                url: message.member.displayAvatarURL()
              },
            },
          ]
        }).catch(console.error);
      } else {
        message.channel.send({
          embeds: [
            {
              author: {
                icon_url: message.author.displayAvatarURL(),
                name: message.author.username,
              },
              title: "ユーザー情報(ユーザー)",
              color: 0x0B5EE3,
              description: 'ユーザーネーム:' + message.author.username + '\nアイコンURL:' + message.author.displayAvatarURL({ size: 1024 }) + "\n下にアイコン",
              timestamp: new Date(),
              image: {
                url: message.author.displayAvatarURL()
              },
            },
          ]
        }).catch(console.error);
      }
    } else {
      message.channel.send({
        embeds: [
          {
            author: {
              icon_url: client.users.cache.get(useridinfo).displayAvatarURL(),
              name: client.users.cache.get(useridinfo).username,
            },
            title: "ユーザー情報(IDから)",
            color: 0x0B5EE3,
            description: 'ユーザーネーム:' + client.users.cache.get(useridinfo).username + '\nアイコンURL:' + client.users.cache.get(useridinfo).displayAvatarURL({ size: 1024 }) + "\n下にアイコン",
            timestamp: new Date(),
            image: {
              url: client.users.cache.get(useridinfo).displayAvatarURL()
            },
          },
        ]
      }).catch(console.error);
    }
  }
}
);



//node.js f##k

//チケット
client.on('messageCreate', async message => {
  if (message.channel.id === '1170950076517056522') {
    if (message.author.bot) return;
    // message.channel.send("").catch(console.error);
    message.guild.channels.create({
      name: message.author.username + "のチケット",
      topic: message.author.id,
      parent: message.channel.parent
    })
  }
});
//2024年に削除

client.on('messageCreate', async message => {
  if (message.content == ('get.info')) {
    if (message.author.username === 'tmyt105_official') {
      message.channel.send({
  "content": "<@&1190841515883368519>",
  "tts": false,
  "embeds": [
    {
      "title": "明けましておめでとうございます！🎉",
      "description": "今年もちむりんごグループ及びちむのサーバーをよろしくお願いします！\n今日は2024年です！\n<#1092472261069508629>で何か喋ってくれたらうれしいです！\n何かイベントやれって？...面倒くさい(((\nてか年越しマップ作るの忘れた...",
      "timestamp": "2023-12-31T15:00:00+00:00",
      "color": 16385791,
      "author": {
        "name": "Happy New Year 2024！",
        "icon_url": "https://cdn.discordapp.com/avatars/1152453551835070514/9544f828758ce696c0b174c210f8c934.png?size=1024"
      },
    "fields": [
        {
          "id": 120540274,
          "name": "Happy New Year 2024！",
          "value": "Thank you for supporting timuringoGroup and timu's server this year!\nJapan time is 2024!\nI would be happy if you could say something at <#1092472261069508629>!\nDo you want to do some event? ...Bothersome(((\nI forgot to make a New Year's map..."
        }
      ]
    }
  ],
})
      message.delete()
    } else {
      message.channel.send('権限がありません-🤔 ')
    }

  }
});


//2024削除範囲終了


client.on('messageCreate', async message => {
  if (message.channel.parent.id === '1170949980765294592') {
    if (message.channel.id === '1170950076517056522') return;
    if (message.content == ('tm.close')) {
      if (message.author.id === '1077534771476975656' || message.author.id === message.channel.topic) {
        message.channel.delete(message.author.username + "によるコマンド");

      }
    }
  }
});
const { EmbedBuilder } = require('discord.js')


client.on('messageCreate', (message) => {
  if (message.author.id === '302050872383242240') {
    if (message.embeds[0].description.match("をアップしたよ") ) {
      message.channel.send(
        new EmbedBuilder()
          .setTitle('Upが実行されました！')
          .setDescription('</dissoku up:828002256690610256> ショートカット用')
      )


    }
  }
})


client.on('channelCreate', async chat => {
  if (chat.parent.id === '1170949980765294592') {

    const usercontact = chat.topic
    chat.permissionOverwrites.edit(usercontact, {
      ViewChannel: true
    })
    chat.send({
      embeds: [
        {
          title: "チケットへようこそ。",
          color: 0x0B5EE3,
          description: "ようこそ！チケットを作成しました。\nチケットを閉じるには、`tm.close`を入力して下さい。",
          timestamp: new Date(),
        },
      ]
    })
  }
}
);
//v14

//よく分からんgetの数字にチャンネルid
client.on('messageCreate', message => {
  if (message.channel.id === '1141737074110775307') {
    if (message.author.bot) return;
    client.users.cache.get('1070973946968678450').send(message.content);
  }
});
//タイムアウトストレス発散用
//client.on('messageCreate', message => {
//if (message.author.username === 'rain.pooh') {
//if (message.channel.id === '1138358816853983343') {
//message.delete();
// }}
//});
//上テンプレ
//終わり

client.on('messageCreate', async message => {
  if (message.content == ('ma.shutdown')) {
    if (message.author.username === 'tmyt105_official') {
      message.channel.send('シャットダウンしました https://maisanbotd.tmyt105.repl.co')
      client.user.setPresence({ activities: [{ name: `シャットダウン` }], status: "idol" });
      message.channel.send()
    } else {
      message.channel.send('権限がありません-🤔 ')
    }

  }
});



//以下ログイン
client.login(process.env.DISCORD_TOKEN);
