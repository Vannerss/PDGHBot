const fs = require('fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, Activity, ActivityType } = require('discord.js');
const { TOKEN, CLIENT_ID } = require('./config.json');
const { Console } = require('node:console');

//Create a new client instance.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => !(file.endsWith('.js')));

commandFiles.forEach(directory => {
  const newPath = path.join(__dirname, `commands/${directory}`);
  const commands = fs.readdirSync(newPath).filter(file => file.endsWith('.js'));
  console.log(commands);

    //command handler
  for(const file of commands){
    const filePath = path.join(newPath, file);
    const command = require(filePath);
    
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if('data' in command && 'execute' in command){
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`[Warning] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
});


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//event handler
for(const file of eventFiles){
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if(event.once){
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// //interaction handler
// client.on(Events.InteractionCreate, async interaction => {
//   if(!interaction.isChatInputCommand()) return;
//   //console.log(interaction); //for verifying interactions

//   const command = interaction.client.commands.get(interaction.commandName);

//   if(!command){
//     console.error(`No command matching ${interaction.commandName} was found.`);
//   }

//   try{
//     await command.execute(interaction);
//   } catch(error){
//     console.error(error)
//     await interaction.replied({ content: 'There was an error while executing this command!', ephemeral: true});
//   }
// });

// //When the client is ready, run this code (only once)
// //We use 'c' for the event parameter to keep it separate from the already defined 'client'
// client.once(Events.ClientReady, c => {
//   console.log(`Ready! Logged in as ${c.user.tag}`);
//   client.user.setActivity(`its own development.`, {type: ActivityType.Watching});
// })

//Log in to Discord with your Client's token.
client.login(TOKEN);