import json
import os
import discord
import random
from discord.ext import commands

with open("data.json", "r", encoding="utf-8") as jsonTemp:
    jsonData = json.load(jsonTemp)

yuyuyu = commands.Bot(command_prefix=jsonData['prefix'], intents=discord.Intents.all())

@yuyuyu.event
async def on_ready():
    print(">> Bot is Online <<")

@yuyuyu.event
async def on_member_join(member):
    channel = yuyuyu.get_channel(jsonData["welcome_channel"])
    await channel.send(f"{member} 加入了频道，我们鼓掌。")

@yuyuyu.command(name="ping", brief="Retrieve the latency of bot in millisecond")
async def ping(ctx):
    await ctx.send(f"{round(yuyuyu.latency*1000)}(ms)")

@yuyuyu.command(name="YuYuYu meme", brief="Randomly post a meme of YuYuYu anime in channel")
async def yuyuyumeme(ctx):
    random_img = random.choice(jsonData["meme.yuyuyu"])
    await ctx.send(random_img)

@yuyuyu.command(name="Delete Multiple Message", brief="Delete multiple messages of a give number")
async def clear(ctx, amount=1):
    if ctx.message.author.id == ctx.guild.owner_id:
        amount += 1
        await ctx.channel.purge(limit=amount)

yuyuyu.run(os.environ['DPY_TOKEN'])
