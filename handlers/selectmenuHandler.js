const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const selectmenuPath = path.join(__dirname, '../interactions/selectmenus');
    fs.readdirSync(selectmenuPath).forEach(file => {
        const selectmenu = require(`${selectmenuPath}/${file}`);
        client.selectMenus.set(selectmenu.customId, selectmenu);
    });
};