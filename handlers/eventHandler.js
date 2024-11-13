const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '../events');

    function loadEvents(dir) {
        const files = fs.readdirSync(dir, { withFileTypes: true });

        for (const file of files) {
            const filePath = path.join(dir, file.name);

            if (file.isDirectory()) {
                loadEvents(filePath);
            } else if (file.isFile() && file.name.endsWith('.js')) {
                const event = require(filePath);

                if (event.name && event.execute) {
                    if (event.once) {
                        client.once(event.name, (...args) => event.execute(...args, client));
                    } else {
                        client.on(event.name, (...args) => event.execute(...args, client));
                    }
                } else {
                    console.warn(`The event at ${filePath} is missing required properties.`);
                }
            }
        }
    }

    loadEvents(eventsPath);
};
