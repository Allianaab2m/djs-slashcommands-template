import { Client, ApplicationCommandData, Interaction, CommandInteraction } from 'discord.js';
import dotenv from 'dotenv'

dotenv.config()

// guildIDを指定しないとグローバルコマンドになってしまうので反映が遅くて面倒
const guildId = process.env.GUILD_ID

const client = new Client({
    intents: 32767
})

client.once('ready', async () => {
    console.log('Ready!')
    console.log(client.user?.tag)
    // コマンドのデータ定義
    const data: ApplicationCommandData[] = [
        {
            name: 'ping',
            description: 'Pongを返します。',
        },
        {
            name: 'argreturn',
            description: '引数を必須とするコマンド',
            options: [{
                type: 'STRING',
                name: 'arg',
                description: '引数',
                required: true,
            }]
        }
    ]
    if (guildId) {
        await client.application?.commands.set(data, guildId)
    }
})

client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!')
        }
        if (interaction.commandName === 'argreturn') {
            // dataの中で指定したnameに対応した引数を取得
            const returnValue = interaction.options.getString('arg')
            await interaction.reply(`${returnValue}`)
        }
    }
})

client.login(process.env.TOKEN)

