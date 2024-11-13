module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {import('discord.js').Interaction} interaction 
     * @param {import('discord.js').Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        const buttonHandler = client.buttons.get(interaction.customId);
        if (!buttonHandler) {
            return;
        }

        if (interaction.user.id !== interaction.message.interaction.user.id) {
            await interaction.reply({
                content: "You can't use this button!",
                ephemeral: true
            });
            return;
        }

        try {
            await buttonHandler.execute(interaction, client);
        } catch (error) {
            console.error(`Error executing button ${interaction.customId}`, error.message);
            await interaction.reply({
                content: `There was an error executing this button.`,
                ephemeral: true,
            });
        }
    },
};