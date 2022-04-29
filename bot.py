import json
import os
from discord.ext import commands

with open("data.json", "r") as jsonTemp:
    jsonData = json.load(jsonTemp)

yuyuyu = commands.Bot(command_prefix=jsonData['prefix'])

@yuyuyu.event
async def on_ready():
    print(">> Bot is Online <<")

@yuyuyu.event
async def on_member_join(member):
    # channel = yuyuyu.get_channel(jsonData["welcome-channel"])
    # await channel.send(f"{member}加入了频道，我们鼓掌。")
    print(f"{member} joined server!")

yuyuyu.run(os.environ['DPY_TOKEN'])
