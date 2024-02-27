import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'

const token = '6737870336:AAGgj6xzOxqTCzrGSbHYqI7hSzw_upaWuU4'
const webAppUrl = 'https://fec6-178-71-171-111.ngrok-free.app'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
        Markup.inlineKeyboard([
            Markup.button.webApp('Открыть GPT Бота', `${webAppUrl}`),
        ])
    )
})


bot.launch()