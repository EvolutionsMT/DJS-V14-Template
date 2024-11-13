const { ActionRowBuilder } = require('discord.js');
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('showbutton')
    .setDescription('Shows a example button.'),

    category: ["Testing"],

    async execute(interaction) {
        const button = new ButtonBuilder()
        .setLabel('Click me')
        .setStyle(ButtonStyle.Success)
        .setCustomId('exampleButton')
        .setEmoji('👍')

    const row = new ActionRowBuilder()
    .addComponents(button);

    await interaction.reply({ components: [row] });
    }
}