# [swipy]

## Installation

[Download](https://github.com/SchneePingu/swipy/releases/download/v1.0/swipy-v1.0.xpi) the `.xpi` file from the latest release. On downloading the extension, Firefox will ask you about installing it.
That's it!

## Description
`swipy` is an extension for Firefox to automate swiping profiles on the dating web app `Bumble`.
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

To configure `swipy`, navigate to the browser menu for managing add-ons, which can be accessed by typing `about:addons` in the URL bar,
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
                <label for="familyText"></label>
                <input type="text" id="familyText" name="familyText" size="50" placeholder="&quot;Don't want&quot;"/>
            </td>
            <td>
                <label for="familyCheckbox"></label>
                <input type="checkbox" id="familyCheckbox" name="familyCheckbox" checked>
            </td>
        </tr>
        <tr>
            <td>
                Smoking
            </td>
            <td>
                <label for="smokingText"></label>
                <input type="text" id="smokingText" name="smokingText" size="50" placeholder="&quot;Never&quot;"/>
            </td>
            <td>
                <label for="smokingCheckbox"></label>
                <input type="checkbox" id="smokingCheckbox" name="smokingCheckbox">
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

To start automatically "liking" and "disliking" profiles, click the
![Test](src/icon/autoplay.svg)
icon in the browser's URL bar.
This continuously swipes profiles until the maximal number of daily "likes" is reached, the web page is reloaded or an error occurs with the routine.


## Developer Zone

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