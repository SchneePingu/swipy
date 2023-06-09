# [swipy]
<a href="https://img.shields.io/badge/Release-v2.0.0-blue.svg"><img src="https://img.shields.io/badge/Release-v2.0.0-blue.svg" alt="Release"></a>

<img src="/icon/swipy.svg" alt="swipy" width="150">

## Installation 🔧

[Download](https://github.com/SchneePingu/swipy/releases/download/v2.0.0/swipy-v2.0.0.xpi) the `.xpi` file from the latest release. On downloading the extension, Firefox will ask you about installing it.
That's it!

_Notice, that if you have set Firefox to never remember the browsing history, then you have to allow using `swipy` in privacy mode._

## Description 📜
`swipy` is an extension for Firefox to filter profiles on the dating web app [bumble](https://bumble.com/app).
It rates profiles according to configurable matching criteria and marks a profile as either matching or not matching.
Based on this, whenever possible, it will only show matching profiles to you!

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

To configure `swipy`, navigate to the extension settings, which can be accessed by the shortcut `Ctrl+Alt+c`.
Alternatively open the settings in the browser menu for managing add-ons by typing `about:addons` in the URL bar.
The settings provide you with the following form,
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
        <tr>
            <td>
                Relationship
            </td>
            <td>
            </td>
            <td>
               ☐
            </td>
        </tr>
        <tr>
            <td>
                Education
            </td>
            <td>
            </td>
            <td>
               ☐
            </td>
        </tr>
        <tr>
            <td>
                Drinking
            </td>
            <td>
            </td>
            <td>
               ☐
            </td>
        </tr>
        </tbody>
    </table>
</form>

(This example configuration will match only profiles with a required `family badge` displaying `Don't want` and an optional `smoking badge` displaying `Never`, where the `family badge` must be present, while the `smoking badge` is allowed to be absent for matching the profile.)

**Make sure to configure the matching criteria before using the extension and reload the dating app web page whenever changing the configuration, such that the new matching criteria are applied.**

## Why have I written swipy? ❤️
`swipy` is NOT meant to do any harm to anyone or anything. It is NOT meant to support you on treating people superficially and finding hook-ups. Neither is it meant to harm the dating web app and the company behind it in any way.
**It is meant for those who have a very tough time finding love, much like me, and could use a helping hand, such like me.** Hopefully `swipy` can be this for you. If at least one finds a beloved person by means of it, all the effort and time it took me to create this was worth it.

## Disclaimer ⚠️
Please be aware that you are using `swipy` on your own risk!
Keep in mind: where is code there is bugs, and where is money there is company interests.
Maybe all of a sudden profiles are rated wrongly, because the code of the dating web app has changed.
Maybe all of a sudden the dating web app blocks you, because of using this browser extension.
Imagine what this would mean to you and weigh the risks.

I AM NOT RESPONSIBLE FOR ANYTHING ANYONE DOES BY MEANS OF `swipy`.

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

#### Versioning

`swipy` uses semantic versioning.
To upgrade the version number, use the `upgradeVersion.sh` script with one of the following parameters:
`-M` to increase the major version, `-m` to increase the minor version and `-p` to increase the patch version.

```
./upgradeVersion.sh -M
./upgradeVersion.sh -m
./upgradeVersion.sh -p
```

## Swipy's Past ⌛️

Originally `swipy` was intended to automate swiping profiles based on matching criteria.
After spending an exhausting month of leisure time on learning, reverse engineering and developing, the first major version, `v1`, was released.
It provided a page action, which triggered "liking" and "disliking" profiles one after another until the daily limit of votes was reached.
This way, dependent on how strict the matching criteria were, users - including me - were able to "vote" a vast amount of profiles every day effortlessly, thus increasing the chances of a match.

And it worked! I was happy and proud of what I had achieved. All the effort seemed to pay off.
However, only about two weeks after the first release, the dating web app had noticed `swipy` and took countermeasures making the automated swiping of profiles no longer work.
After one week of spending my evenings on figuring out how to lever out the countermeasures, I finally had to admit defeat.
I was not smart enough to solve the issue. Yet.

What was left of `swipy` at this point, is the profile rating.
No longer being able to discard non-matching profiles automatically, I came up with the idea of not showing them to the user in the first place, thus a filter.
This is what `swipy` is now, a profile filter based on matching criteria.
Whenever possible - yes, there is restrictions - it will only show matching profiles to you!

## Future Outlook 🔮

Maybe one day `swipy` will provide the ability to swipe profiles automatically again.