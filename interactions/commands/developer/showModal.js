const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('showmodal')
    .setDescription('Show a example modal.'),
    category: ["Testing"],

    async execute(interaction) {
        const modal = new ModalBuilder()
        .setCustomId('exampleModal')
        .setTitle('This is a example modal');


        const textInput = new TextInputBuilder()
        .setCustomId('exampleInput')
        .setLabel("Input something to get a response.")
        .setStyle(TextInputStyle.Paragraph);

        const modalActionRow = new ActionRowBuilder().addComponents(textInput);
        modal.addComponents(modalActionRow);

        await interaction.showModal(modal);
    }
}