const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.config = require('./Data/Config');
client.mainColor = "DarkBlue";

const handlersPath = path.join(__dirname, 'handlers');

fs.readdirSync(handlersPath).forEach(file => {
    if (file.endsWith('.js')) {
        const handler = require(path.join(handlersPath, file));
        
        if (typeof handler === 'function') {
            try {
                handler(client);
            } catch (error) {
                console.error(`Failed to load handler at ${file}:`, error);
            }
        } else {
            console.warn(`Handler at ${file} does not export a function and was skipped.`);
        }
    }
});

client.login(client.config.token);