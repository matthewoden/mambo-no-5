# Parrot Mambo No.5

Just some glue code and monkeypatching around some libraries so I can control my Parrot Mambo drone, via bluetooth, with an xbox 360 controller. Because flying via touchscreen is just terrible.

Uses a forked version of `noble` and `parrot-minidrone` and an alternative [XBox 360 Driver](https://github.com/360Controller/360Controller), to support BLE and extend driver support to OSX High Sierra.

While it's only tested on OSX High Sierra (10.13.1), running on windows _should_ only require following the instructions [here](https://www.npmjs.com/package/noble#windows). That said, I've normalized the xbox 360 controller inputs based on the alternate driver, so YMMV.

The minidrone library wrapper has been extended to also allow for programmable, chainable commands so you can run a sequence like this:

```javascript
drone.on("connect", () => {
  drone
    .takeOff()
    .pauseFor(2000)
    .flipLeft()
    .pauseFor(2000)
    .flipRight()
    .pauseFor(2000)
    .setFlightParams({ roll: 100, yaw: 100 })
    .pauseFor(2000)
    .takePicture();
});
```

(It's untested.)

## Joystick Controls:

### Buttons

* **Start:** Take off
* **Back:** Land
* **X:** Take Picture
* **D-Down:** Emergancy land
* **D-Up:** Trim (sets current position as "flat and level")

### Left Stick

* **X-axis:** Yaw/Rotation/Turn
* **Y-axis:** Ascend/Decend

### Right Stick

* **X-axis:** Move side to side
* **Y-axis:** Move forward/back

### Triggers and shoulders

* **Left Trigger:** Flip Right
* **Left Shoulder:** Flip Left
* **Right Trigger:** Flip Forward
* **Right Shoulder:** Flip Backward

---

Copyright 2017 Matthew Potter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
