const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a categorized list of available commands'),
    
        category: ["Information"],

    async execute(interaction) {
        const categories = {};

        interaction.client.commands.forEach(command => {
            const category = command.category || 'Other';
            if (!categories[category]) categories[category] = [];
            categories[category].push(command);
        });

        const categoryNames = Object.keys(categories);
        let currentCategoryIndex = 0;

        const generateEmbed = (categoryIndex) => {
            const categoryName = categoryNames[categoryIndex];
            const categoryCommands = categories[categoryName];
            const embed = new EmbedBuilder()
                .setTitle(`${categoryName} Commands`)
                .setDescription('List of available commands:')
                .setColor(0x00FF00)
                .setFooter({ text: `Category ${categoryIndex + 1} of ${categoryNames.length}` });

            categoryCommands.forEach(command => {
                embed.addFields({
                    name: `/${command.data.name}`,
                    value: command.data.description || 'No description available',
                    inline: false
                });
            });

            return embed;
        };

        const getButtons = (categoryIndex) => {
            return new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('prev_category')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(categoryIndex === 0),
                new ButtonBuilder()
                    .setCustomId('next_category')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(categoryIndex === categoryNames.length - 1)
            );
        };

        const initialEmbed = generateEmbed(currentCategoryIndex);
        const message = await interaction.reply({
            embeds: [initialEmbed],
            components: [getButtons(currentCategoryIndex)],
            ephemeral: true
        });

        const collector = message.createMessageComponentCollector({
            filter: (btnInteraction) => btnInteraction.user.id === interaction.user.id,
            time: 60000 // 1 minute
        });

        collector.on('collect', async (btnInteraction) => {
            if (btnInteraction.customId === 'prev_category') {
                currentCategoryIndex = Math.max(currentCategoryIndex - 1, 0);
            } else if (btnInteraction.customId === 'next_category') {
                currentCategoryIndex = Math.min(currentCategoryIndex + 1, categoryNames.length - 1);
            }

            await btnInteraction.update({
                embeds: [generateEmbed(currentCategoryIndex)],
                components: [getButtons(currentCategoryIndex)]
            });
        });

        collector.on('end', async () => {
            await message.edit({ components: [] });
        });
    }
};
