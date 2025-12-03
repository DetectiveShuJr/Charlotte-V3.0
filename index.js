<<<<<<< HEAD
require('dotenv').config()
const { Client, Collection, IntentsBitField} = require(`discord.js`);
const fs = require('node:fs');
const path = require('node:path');

// ----------------------------------------------------------------------------------
const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages);

const charlotte = new Client({ intents: myIntents });
const Angel = new Client({ intents: myIntents});

// ----------------------------------------------------------------------------------
    Angel.on('clientReady', () =>{
    console.log(`Angel Mode: on... I'm all set now`);
    Angel.user.setActivity('Test test')
})
// ----------------------------------------------------------------------------------
charlotte.on('clientReady', () =>{
    console.log('Im ready to go!');
    charlotte.user.setActivity()
})
// ----------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------

charlotte.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			charlotte.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		charlotte.once(event.name, (...args) => event.execute(...args));
	} else {
		charlotte.on(event.name, (...args) => event.execute(...args));
		console.log('Events have been read')
	}
}

charlotte.login(process.env.Charlotte_Token);
Angel.login(process.env.Angel_Token);
=======
require('dotenv').config();
const { Client, Collection, IntentsBitField } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Define intents for both bots
const myIntents = new IntentsBitField([
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
]);

// Initialize both bots
const charlotte = new Client({ intents: myIntents });
const angel = new Client({ intents: myIntents });

// ----------------------------------------------------------------------------------
// Angel Bot Setup
// ----------------------------------------------------------------------------------
angel.on('ready', () => {
    console.log(`Angel Mode: on... I'm all set now`);
    angel.user.setActivity('Test test');
});

// ----------------------------------------------------------------------------------
// Charlotte Bot Setup
// ----------------------------------------------------------------------------------
charlotte.commands = new Collection();

charlotte.on('ready', () => {
    console.log('Charlotte is ready to go!');
    charlotte.user.setActivity('Helping out!');
});

// ----------------------------------------------------------------------------------
// Load Commands
// ----------------------------------------------------------------------------------
const loadCommands = () => {
    const foldersPath = path.join(__dirname, 'commands');
    const userCommandsPath = path.join(__dirname, 'user-commands'); // Path for user commands

    const commandFolders = fs.readdirSync(foldersPath);
    const userCommandFiles = fs.existsSync(userCommandsPath)
        ? fs.readdirSync(userCommandsPath).filter(file => file.endsWith('.js'))
        : [];

    // Load core commands
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                charlotte.commands.set(command.data.name, command);
                console.log(`Loaded core command: ${command.data.name}`);
            } else {
                console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    // Load user-installed commands
    for (const file of userCommandFiles) {
        const filePath = path.join(userCommandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            charlotte.commands.set(command.data.name, command);
            console.log(`Loaded user command: ${command.data.name}`);
        } else {
            console.warn(`[WARNING] The user command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
};

// ----------------------------------------------------------------------------------
// Load Events
// ----------------------------------------------------------------------------------
const loadEvents = () => {
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) {
            charlotte.once(event.name, (...args) => event.execute(...args));
        } else {
            charlotte.on(event.name, (...args) => event.execute(...args));
        }
        console.log(`Loaded event: ${event.name}`);
    }
};

// ----------------------------------------------------------------------------------
// Initialize Bots
// ----------------------------------------------------------------------------------
const initializeBots = () => {
    loadCommands();
    loadEvents();

    charlotte.login(process.env.Charlotte_Token).then(() => {
        console.log('Charlotte logged in successfully!');
    }).catch(err => {
        console.error('Failed to log in Charlotte:', err);
    });

    angel.login(process.env.Angel_Token).then(() => {
        console.log('Angel logged in successfully!');
    }).catch(err => {
        console.error('Failed to log in Angel:', err);
    });
};

// Start the bots
initializeBots();
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
