import json
import os
from discord.ext import commands

with open("data.json", "r") as jsonTemp:
    jsonData = json.load(jsonTemp)

print(jsonData['prefix'])

yuyuyu_bot = commands.Bot(command_prefix=jsonData['prefix'])

@yuyuyu_bot.event
async def on_ready():
    print(">> Bot is Online <<")

yuyuyu_bot.run(os.environ['DPY_TOKEN'])
