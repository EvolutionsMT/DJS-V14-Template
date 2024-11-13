module.exports = {
    name: 'interactionCreate',
    /**
 * 
 * @param {import('discord.js').Interaction} interaction 
 * @param {import('discord.js').Client} client 
 */
    async execute(interaction, client) {
        if (interaction.isStringSelectMenu()) {
            const selectMenuHandler = client.selectMenus.get(interaction.customId);
            if (!selectMenuHandler) {
                return;
            }

            if (interaction.user.id !== interaction.message.interaction.user.id) {
                await interaction.reply({
                    content: "You can't use this menu!",
                    ephemeral: true
                });
                return;
            }

            try {
                await selectMenuHandler.execute(interaction, client);
            } catch (error) {
                console.error(`Error executing select menu ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'There was an error executing this select menu.',
                    ephemeral: true,
                });
            }
        }
    },
};
