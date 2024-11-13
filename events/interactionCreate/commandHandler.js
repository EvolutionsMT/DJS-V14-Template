module.exports = {
    name: 'interactionCreate',
    /**
 * 
 * @param {import('discord.js').Interaction} interaction 
 * @param {import('discord.js').Client} client 
 */
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) {
            return;
        }

        //if (!command.permissions && interaction.member.permissions.has(command.permissions)) return interaction.reply({ content: `You do not have the correct permissions to use this command.`, ephemeral: true });

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}:`, error);
            await interaction.reply({
                content: 'There was an error executing this command.',
                ephemeral: true,
            });
        }
    },
};
