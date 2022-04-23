import discord
from discord.ext import commands

yuyuyu_bot = commands.Bot(command_prefix='/')
token = open("./token.txt", "r").readline()

@yuyuyu_bot.event
async def on_ready():
    print(">> Bot is Online <<")

yuyuyu_bot.run(token)