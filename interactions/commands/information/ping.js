const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong.'),

    category: ["Information"],
    
    async execute(interaction) {
        await interaction.reply('Ping.');
    },
};