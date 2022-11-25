const {SlashCommandBuilder} = require('discord.js');

const apiUrl = 'https://api.thecatapi.com/v1/images/search'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Random picture of a cat.'),
    async execute(interaction){
        fetch(apiUrl).then(res => {
            return res.json()
        }).then((data) => {
            const img = data[0].url;
            interaction.reply(img)
        })
    },
}