module.exports = {
    customId: 'exampleButton',
    async execute(interaction) {
        await interaction.reply({
            content: 'Button Clicked', 
            ephemeral: true
        });
    },
};