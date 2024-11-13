const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName('getAvatar')
    .setType(ApplicationCommandType.User),
    category: ["Information"],
    /**
     * 
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction, client) {
        const user = await interaction.targetUser;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const AvatarEmbed = new EmbedBuilder()
            .setTitle(`${user.tag}`)
            .setImage(avatarURL)
            .setColor(client.mainColor)
            
        await interaction.reply({ embeds: [AvatarEmbed] });
    },
};