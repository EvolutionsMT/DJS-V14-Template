const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

module.exports = async (client) => {
    const commands = [];
    const commandsPath = path.join(__dirname, '../interactions/commands');

    if (!client.commands) {
        client.commands = new Map();
    }

    function loadCommands(dir) {
        const files = fs.readdirSync(dir, { withFileTypes: true });

        for (const file of files) {
            const filePath = path.join(dir, file.name);

            if (file.isDirectory()) {
                loadCommands(filePath);
            } else if (file.isFile() && file.name.endsWith('.js')) {
                const command = require(filePath);
                if (command.data && command.execute) {
                    commands.push(command.data.toJSON());
                    client.commands.set(command.data.name, command);
                } else {
                    console.warn(`Command file at ${filePath} is missing required properties.`);
                }
            }
        }
    }

    loadCommands(commandsPath);

    const rest = new REST({ version: '9' }).setToken(client.config.token);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(client.config.clientID, client.config.guildID),
            // Routes.applicationCommands(client.config.clientID),  // Global-based
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('Failed to refresh application (/) commands:', error);
    }
};
