module.exports = {
    name: 'modal',
    customId: 'exampleModal',
    async execute(interaction, client) {
        const userInput = interaction.fields.getTextInputValue('exampleInput');
        await interaction.reply({
            content: `You entered: ${userInput}`,
            ephemeral: true
        });
    },
};
