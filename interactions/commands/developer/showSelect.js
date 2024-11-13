const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('selectmenu')
        .setDescription('Shows an example select menu.'),
        category: ["Testing"],

    async execute(interaction) {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('exampleSelectMenu')
            .setPlaceholder('Choose an option...')
            .addOptions(
                {
                    label: 'Option 1',
                    description: 'This is the first option',
                    value: 'option_1',
                },
                {
                    label: 'Option 2',
                    description: 'This is the second option',
                    value: 'option_2',
                },
                {
                    label: 'Option 3',
                    description: 'This is the third option',
                    value: 'option_3',
                }
            );

        const actionRow = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
            content: 'Please choose an option from the select menu below:',
            components: [actionRow],
            ephemeral: true,
        });
    }
};
