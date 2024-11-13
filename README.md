# Discord.js v14 Bot Template

Welcome to the **Discord.js v14 Bot Template**! This template provides a clean, modular, and scalable structure to kickstart your Discord bot development. With support for all key Discord interaction types (modals, buttons, select menus, and context menus), this template is designed to streamline your bot-building process while keeping the code organized and maintainable.

## ✨ Features

- **Commands**: Easily add slash commands.
- **Modals**: Supports interactive modals for gathering user input.
- **Buttons**: Integrate buttons for richer interactivity within messages.
- **Select Menus**: Create dropdown menus for quick user selections.
- **Context Menus**: Provides context menus for user and message actions.
- **Clean Code**: Organized structure for clear, maintainable code.

## 🗂️ Project Structure

The template is designed with modularity in mind, making it easy to locate and manage files:

```plaintext
📦DJS-V14-Template
 ┣ 📂interactions/commands        # All command files, grouped by category
 ┣ 📂interactions/selectmenus     # Select menu interaction handlers
 ┣ 📂interactions/buttons         # Button interaction handlers
 ┣ 📂interactions/modals          # Modal interaction handlers
 ┣ 📂handlers                     # Handlers for command, event, button, select, and modals
 ┣ 📂Data/Config.js               # Configuration file (Token, ClientID, GuildID)
 ┣ 📂events          # Event handlers
 ┣ 📜bot.js        # Main entry point
 ┗ 📜README.md       # Project documentation
```

## 🛠️ Usage

## Adding Slash Commands
```plaintext
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yourcommand')
        .setDescription('Description of your command'),
    async execute(interaction) {
        // Command logic here
    }
};
```
## Adding Events
```plaintext
module.exports = {
    name: 'eventName',
    once: false, // Set to true if this event should run only once
    async execute(...args) {
        // Event logic here
    },
};
```

## 📝 License

This project is licensed under the MIT License.
