# [swipy]
<a href="https://img.shields.io/badge/Release-v1.0-blue.svg"><img src="https://img.shields.io/badge/Release-v1.0-blue.svg" alt="Release"></a>

<img src="/icon/swipy.svg" alt="swipy" width="150">

## Installation 🔧

[Download](https://github.com/SchneePingu/swipy/releases/download/v1.0/swipy-v1.0.xpi) the `.xpi` file from the latest release. On downloading the extension, Firefox will ask you about installing it.
That's it!

## Description 📜
`swipy` is an extension for Firefox to automate swiping profiles on the dating web app [bumble](https://bumble.com/app).
It rates profiles according to configurable matching criteria and marks a profile as either matching or not matching.

**Notice that a profile, which "likes" you, is always considered a matching profile.**

### Profile Rating

A profile matching the criteria has a profile header of the form
```
[+] Name, Age
```
while a profile **not** matching the criteria has a profile header of the form
```
[-] Name, Age
```

### Configuration

To configure `swipy`, navigate to the browser menu for managing add-ons, which can be accessed by typing ``about:addons` in the URL bar,
and open the settings of `swipy`. The settings provide you with the following form,
where the entries in the lists of matching values correspond to the text displayed on profile badges:

<form>
    <table>
        <colgroup>
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 65%;">
            <col span="1" style="width: 20%;">
        </colgroup>
        <tbody>
        <tr>
            <th>Property</th>
            <th>List of MATCHING values (comma-separated, e.g. "A", "B"): </th>
            <th>Do NOT match if NOT specified?</th>
        </tr>
        <tr>
            <td>
                Children
            </td>
            <td>
                "Don't want"
            </td>
            <td>
                ☑
            </td>
        </tr>
        <tr>
            <td>
                Smoking
            </td>
            <td>
                "Never"
            </td>
            <td>
               ☐
            </td>
        </tr>
        </tbody>
    </table>
</form>

(This example configuration will match only profiles with a required `family badge` displaying `Don't want` and an optional `smoking badge` displaying `Never`, where the `family badge` must be present, while the `smoking badge` is allowed to be absent for matching the profile.)

**Make sure to configure the matching criteria before using the extension and reload the dating app web page whenever changing the configuration, such that the new matching criteria applied.**

### Automated Swiping

`swipy` provides the functionality to automatically "like" and "dislike" profiles according to the rating described above,
that is a profile matching the criteria is "liked", while a profile **not** matching the criteria is "disliked".

To start automatically "liking" and "disliking" profiles, navigate to the view, where profiles are shown to you, and click the
![Test](src/icon/autoplay.svg)
icon in the browser's URL bar.
This continuously swipes profiles until the maximal number of daily "likes" is reached, you leave the profiles view, the web page is reloaded or an error occurs with the routine.

(If you experience that the automated swiping does not start on clicking the icon, please reload the web page and try again.)

## Why have I written swipy? ❤️
`swipy` is NOT meant to do any harm to anyone or anything. It is NOT meant to support you on treating people superficially and finding hook-ups. Neither is it meant to harm the dating web app and the company behind it in any way.
**It is meant for those who have a very tough time finding love, much like me, and could use a helping hand, such like me.** Hopefully `swipy` can be this for you. If at least one finds a beloved person by means of it, all the effort and time it took me to create this was worth it.

## Disclaimer ⚠️
Please be aware that you are using `swipy` on your own risk!
Keep in mind: where is code there is bugs, and where is money there is company interests.
Maybe all of a sudden profiles are rated wrongly, because the code of the dating web app has changed.
Maybe all of a sudden the dating web app blocks you, because you are swiping profiles at machine-like speed.
Imagine what this would mean to you and weigh the risks.

I AM NOT RESPONSIBLE FOR ANYTHING ANYONE DOES WITH THE SOURCE CODE OF `swipy`.

## Developer Zone 🧬

`swipy` is an extension for Firefox written in `JavaScript` and build with [npm](https://www.npmjs.com/) and [web-ext](https://github.com/mozilla/web-ext).
To set up the development environment, download this repository, install `npm` and run `npm install` within the root directory of the repository.
Developing a new release of the extension consists of `building`, `linting` and `signing` the `JavaScript` code.

#### Build extension
```
npm run build
```

#### Lint extension
```
npm run lint
```

#### Sign extension
```
npm run sign
```
