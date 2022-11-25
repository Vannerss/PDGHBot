const {SlashCommandBuilder, bold } = require('@discordjs/builders');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Returns your or another users avatar.')
        .addUserOption(option => option.setName('target').setDescription('The user of the avatar you want to see.')),
    async execute(interaction){
        const user = interaction.options.getUser('target');
        if(user){
            const embed = new EmbedBuilder()
            .setColor([245, 167, 96])
            .setDescription(bold(user.username))
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            return interaction.reply({embeds: [embed]})
        } else {
            const embed = new EmbedBuilder  ()
            .setColor([245, 167, 96])
            .setDescription(bold(interaction.client.user))
            .setImage(interaction.user.displayAvatarURL({dynamic: true, size: 4096}))
            return interaction.reply({embeds: [embed]})
        }
    }
}