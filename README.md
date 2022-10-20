# YouLoop

YouLoop is a firefox extension that allows you to **Loop** a section of a
youtube video, **Transpose** the audio and manage the playback **Speed** in
order to practice a song

# How To Install

I haven't looked into publishing the extension yet so at the moment the only
way to use it as far as I'm concerned is by manually testing it out with the
`about:debugging` page

1. Clone/Download the repo whichever way you want
2. Open firefox and go to `about:debugging`
3. Click on `This Firefox`
4. Click on `Load Temporary Add-on`
5. In the prompt go to the youloop folder and click on `manifest.json`
6. Go to a youtube video and you should see the loop icon on your address bar

# How To Use

Whenever you are watching a youtube video you should see the red loop icon
popup in your address bar. If you click on it you are presented with two
options

## Enable By Default

If this checked then that means you'll see the YouLoop UI popup automatically
whenever you go to a youtube video, otherwise you have to manually toggle it

## Toggle

Toggles youloop on and off

# How To Work With It Locally

1. Clone the repo whichever way you want
2. `cd youloop && npm i`
3. Code away!

I have some scripts that you can run in the `package.json` for convenience

## Browserify

-   `npm run browserify`
    -   Executes a shell script that runs browserify tool in order to bundle up javascript

## Format & Lint

-   `npm run format_check`
    -   Checks if files are formatted by prettier
-   `npm run format`
    -   Formats any unformatted files
-   `npm run lint`
    -   Checks if eslint is happy

## Watch

-   `npm run watch`
    -   Watches for any changes to files and runs browserify again to update the bundles

## Dev

-   `npm run dev`
    -   Runs `web-ext run` which gets you an instance of firefox with the extension already loaded

# Credits

## Npm Packages

-   [Tone.js](https://www.npmjs.com/package/tone)
    -   Audio framework (I only used their pitch shifting feature)
-   [browserify](https://www.npmjs.com/package/browserify)
    -   Allows the use of `require` for browser by bundling up your code
-   [esmify](https://www.npmjs.com/package/esmify)
    -   Handles import vs require node shenanigans when using browserify
-   [hh-mm-ss](https://www.npmjs.com/package/hh-mm-ss)
    -   Formats time
-   [prettier](https://www.npmjs.com/package/prettier)
    -   Formatter
-   [prettierd](https://www.npmjs.com/package/@fsouza/prettierd)
    -   Blazingly fast prettier
-   [eslint_d](https://www.npmjs.com/package/eslint_d)
    -   Blazingly fast linting
-   [chokidar-cli](https://www.npmjs.com/package/chokidar-cli)
    -   Watches for changes in files
-   [web-ext](https://www.npmjs.com/package/web-ext)
    -   Run, build, and execute browser extensions

## Youtube Navigation

The way Youtube navigation works as far as I understood is that youtube
doesn't really 'reload' the page every time you go to a new youtube video, it
just changes the view

Because of this it was a bit tricky to figure out how to determine when the
user has navigated to a new youtube video or just back to the main page for
example

Not only the navigation but making sure that I was able to get the correct
data from the new video

Luckily this [stackoverflow post](https://stackoverflow.com/questions/34077641/how-to-detect-page-navigation-on-youtube-and-modify-its-appearance-seamlessly/34100952#34100952)
came to the rescue

Shout out to my boy 'wOxxOm' which taught me that youtube has their own events
that fire on navigation. Using those I was able to detect when users are
navigating to a new video and updating YouLoop as needed

## Pitch Shifting

The WebAudio API doesn't have a native 'Pitch Shifting' Node so in order to
implement this feature I either had to implement this myself (Who got time for
that?) or look elsewhere to see if someone else had implemented this

To my luck there's a great library called [Tone.js](https://tonejs.github.io/)
which includes [Pitch Shifting](https://tonejs.github.io/docs/14.7.77/PitchShift) ability.

## Icon

[Loop](https://icons8.com/icon/103673/replace)
