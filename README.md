<img src="readme.png" alt="Kide.rat logo">
<br />
<br />

<div align="center">
  
## Kide.app bot which helps you to get tickets without stress

Annoyed by getting tickets to student parties? Kide.rat is your solution.

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-black.svg?style=flat&colorA=5e35b1&colorB=5e35b1)](https://opensource.org/licenses/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kasperip/kiderat-desktop/build.yml?branch=master&style=flat&colorA=5e35b1&colorB=5e35b1)](https://github.com/KasperiP/kiderat-desktop/actions?query=workflow=build)

</div>
  
Kide.rat is a worry-free ticket reservation system that will almost certainly get you tickets for the event you want. The bot works on all platforms and is completely free and open source. **This project is NOT affiliated with Kide.app in any way and should be used only for study purposes**.

## Motivation
The main purpose of this project is to be my "hello world" project for Tauri. There are multiple Kide.app bots, but most of them are not fully open source. Botting tickets is fairly common in Kide.app, and I thought that making an easy and open source bot could force Kide to address this problem. I do not recommend using any bots for reserving tickets, and using any Kide.app is solely your responsibility.

## Download & install
Download latest version from [releases page](https://github.com/KasperiP/kiderat-desktop/releases/latest). App uses automatic updater so if there is update available you will get popup when opening Kiderat. 

[![Kiderat download & install](https://imgur.com/tnf0Qpt.png)](https://www.youtube.com/watch?v=BLe9S5BbjZ8 "How to install Kide.rat")
<div align="left">Download & install tutorial video</div>

## Known weaknesses:
- Bot does everything locally on the client which means bad internet will cause bad results.
- Currently bot supports only one account at the time so you can't get high amount of tickets if there are per user limits. 

## Supporting project:
If you find this project helpful and valuable, you can contribute to its development and maintenance in several ways. One way is to give it a star on GitHub, which helps raise its visibility and attracts more contributors. You can also share it with others who might benefit from it. If you have experience in programming or design, you can contribute to the project by submitting bug reports, feature requests, or even code changes through pull requests. Lastly, you can support the project financially by sponsoring this project. Your donation will help to cover Rainbow lager costs.  

Your support is greatly appreciated and will help make this project even better!

## Development setup:

❗**Follow [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) before trying to install any local dependencies.** ❗

Install pnpm

```
npm i pnpm -g
```

Install dependencies

```
pnpm i
```

Start dev 

```
pnpm tauri dev
```
