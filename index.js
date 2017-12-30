const Controller = require("./controller");
const Drone = require("./drone");

const droneOptions = {
  autoconnect: true,
  maxAltitude: 2,
  maxTilt: 40,
  maxVerticalSpeed: 0.5,
  maxRotationSpeed: 150
};

const drone = new Drone(droneOptions);

new Controller({
  onXboxbuttonPress: () => {
    drone.connect();
  },

  onStartPress: () => {
    drone.takeOff();
  },

  onBackPress: () => {
    drone.land();
  },

  onRightAnalogMove: data => {
    drone.setFlightParams({
      roll: data.x,
      pitch: data.y
    });
  },

  onLeftAnalogMove: data => {
    drone.setFlightParams({
      yaw: data.x,
      altitude: data.y
    });
  },

  onLeftTriggerMove: () => {
    drone.flipRight();
  },

  onLeftShoulderPress: () => {
    drone.flipRight();
  },

  onRightShoulderPress: () => {
    drone.flipFront();
  },

  onRightTriggerMove: () => {
    drone.flipBack();
  },

  onXPress: () => {
    drone.takePicture();
  },

  onDdownPress: () => {
    drone.emergencyLanding();
  },

  onDupPress: () => {
    drone.trim();
  }
});
