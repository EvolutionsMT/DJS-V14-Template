module.exports = {
    name: 'interactionCreate',
    /**
 * 
 * @param {import('discord.js').Interaction} interaction 
 * @param {import('discord.js').Client} client 
 */
    async execute(interaction, client) {
        if (interaction.isModalSubmit()) {
            const modalHandler = client.modals.get(interaction.customId);
            if (!modalHandler) {
                return;
            }

            try {
                await modalHandler.execute(interaction, client);
            } catch (error) {
                console.error(`Error executing modal ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'There was an error executing this modal.',
                    ephemeral: true,
                });
            }
        }
    },
};
