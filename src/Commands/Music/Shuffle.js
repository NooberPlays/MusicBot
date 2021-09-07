const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');
const { MessageEmbed } = require("discord.js");
const { pagination } = require('discord.js-pagination');

module.exports = class ShuffleCommand extends Command {
  constructor() {
    super('shuffle', {
      aliases: ['sh', 'shuffle'],
      description: {
        content: 'Shuffle the current queue',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg, args, client, prefix) {
    try {
    
		const GuildPlayers = this.client.erela.players.get(msg.guild.id);

      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | There no music playing in this guild')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel to do this.')] });
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel same as me to do this.')] });
        if (!GuildPlayers.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return msg.channel.send({embeds: [thing]});
        }


        GuildPlayers.queue.shuffle();

        let thing = new MessageEmbed()
            .setDescription(`Shuffled the queue`)
            .setColor(msg.client.embedColor)
            .setTimestamp()
      return msg.channel.send({ embeds: [CreateEmbed('info', '👌 | Shuffled current queue')] });
	    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
    }
};