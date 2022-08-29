import { Routes, SlashCommandBuilder } from 'discord.js'
import { REST } from '@discordjs/rest'

const { BOT_TOKEN, GUILD_ID, CLIENT_ID } = process.env

const commands = [
  new SlashCommandBuilder().setName('major').setDescription('Mostra o tempo restante para o IEM Major Rio 2022')
]

const rest_client = new REST({ version: '10' }).setToken(BOT_TOKEN as string)

rest_client.put(Routes.applicationGuildCommands(CLIENT_ID as string, GUILD_ID as string), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
