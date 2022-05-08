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
    await channel.send(f"{member.mention}加入了频道，我们鼓掌。")

@yuyuyu.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send(f"{ctx.author.mention}恁权限不够111")

@yuyuyu.command()
async def ping(ctx):
    await ctx.send(f"咱延迟是{round(yuyuyu.latency*1000)}(ms)")

@yuyuyu.command()
async def yuyuyumeme(ctx):
    random_img = random.choice(jsonData["meme.yuyuyu"])
    await ctx.send(random_img)

@yuyuyu.command()
async def fky(ctx):
    random_cussing = random.choice(jsonData["cussing"])
    await ctx.send(f"{ctx.author.mention}{random_cussing}")

@yuyuyu.command()
@commands.has_permissions(administrator=True)
async def clear(ctx, amount=1):
    amount += 1
    await ctx.channel.purge(limit=amount)
    await ctx.send(f"{amount - 1}条消息被{ctx.author.mention}删除")

yuyuyu.run(os.environ['DPY_TOKEN'])
