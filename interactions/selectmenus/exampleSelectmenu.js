module.exports = {
    name: 'selectMenu',
    customId: 'exampleSelectMenu',
    async execute(interaction, client) {
        const selectedValue = interaction.values[0];
        await interaction.reply({
            content: `You selected: ${selectedValue}`,
            ephemeral: true
        });
    },
};
