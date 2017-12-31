const Controller = require("./controller");
const Drone = require("./drone");
let controller, drone;

function delegate(object, property, args) {
  if (object && object[property]) {
    object[property].apply(object, args);
  }
}

const droneOptions = {
  autoconnect: false,
  maxAltitude: 2,
  maxTilt: 40,
  maxVerticalSpeed: 0.5,
  maxRotationSpeed: 150,
  onBatteryChange: value => {
    console.log("Battery", value);
    if (value > 10) {
      setInterval(() => {
        delegate(controller, "setBlinking", []);
      }, 1000);
    }
  },
  onRssiChange: value => {
    val = Math.abs(value);
    if (val > 80) {
      delegate(controller, "setOneLight", []);
    } else if (val > 70) {
      delegate(controller, "setTwoLights", []);
    } else if (val > 60) {
      delegate(controller, "setThreeLights", []);
    } else {
      delegate(controller, "setFourLights", []);
    }
  }
};

drone = new Drone(droneOptions);

controller = new Controller({
  onXboxbuttonPress: () => drone.connect(),
  onStartPress: () => drone.takeOff(),
  onBackPress: () => drone.land(),
  onLeftTriggerMove: () => drone.flipRight(),
  onLeftshoulderPress: () => drone.flipRight(),
  onRightshoulderPress: () => drone.flipFront(),
  onRightTriggerMove: () => drone.flipBack(),
  onXPress: () => drone.takePicture(),
  onDdownPress: () => drone.emergencyLanding(),
  onDupPress: () => drone.trim(),
  onRightAnalogMove: data => {
    drone.setFlightParams({ roll: data.x, pitch: data.y });
  },

  onLeftAnalogMove: data => {
    drone.setFlightParams({ yaw: data.x, altitude: data.y });
  }
});
