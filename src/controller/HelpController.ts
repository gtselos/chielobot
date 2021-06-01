const Discord = require('discord.js');

export class HelpController {

    static HELP_COMMAND_REGEX = /^$chielobot help/
    
    static sendMessage(channel: any): void {
        const usageMessage = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Chielobot commands')
        .addField('\u200b', '\u200b')
        .addFields(
          { name: 'Get binance ticker price', value: '$t {Ticker symbol 1} {Ticker 2}'},
          { name: 'example', value: '$binance BTC USDT'},
        )
        channel.send(usageMessage);
    }
}