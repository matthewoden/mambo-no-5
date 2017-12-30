const Drone = require("parrot-minidrone");

// A wrapper around the parror minidrone library,
// updated for use on High Sierra, and so commands are
// chainable.

class MiniDrone {
  constructor(options = {}) {
    const defaults = {
      updateMS: 100,
      autoconnect: false,
      maxAltitude: 2,
      maxTilt: 40,
      maxVerticalSpeed: 0.5,
      maxRotationSpeed: 150
    };

    Object.assign({}, defaults, options);
    this.drone = new Drone(options);

    this.flightParams = {
      roll: 0,
      pitch: 0,
      yaw: 0,
      altitude: 0
    };

    // Event Listeners
    this.drone.on("connected", () => {
      this.connected = true;
    });

    this.drone.on("maxAltitudeChange", value => {
      this.maxAltitude = value;
    });

    this.drone.on("maxRotationSpeedChange", value => {
      this.maxRotationSpeed = value;
    });

    this.drone.on("maxTiltChange", value => {
      this.maxTilt = value;
    });

    this.drone.on("maxVerticalSpeedChange", value => {
      this.maxVerticalSpeed = value;
    });

    // this.drone.connect();
  }

  // State

  getBatteryLevel() {
    return this.drone.getBatteryLevel();
  }

  getRssi() {
    return this.drone.getRssi();
  }

  isFlying() {
    return this.drone.isFlying();
  }

  isConnected() {
    return this.connected;
  }

  getFlightParams() {
    return this.flightParams;
  }

  getMaxTilt() {
    return this.maxTilt;
  }

  getMaxVerticalSpeed() {
    return this.maxVerticalSpeed;
  }

  getMaxAltitude() {
    return this.setMaxAltitude;
  }

  setFlightParams({ roll, pitch, yaw, altitude }) {
    this.drone.setFlightParams({ roll, pitch, yaw, altitude });
    return this;
  }

  setMaxAltitude(altitude) {
    this.drone.setMaxAltitude(altitude);
    return this;
  }

  setMaxTilt(tilt) {
    this.drone.setMaxTilt(tilt);
    return this;
  }

  setMaxRotationSpeed(speed) {
    this.drone.setMaxRotationSpeed(speed);
    return this;
  }

  setMaxVerticalSpeed(speed) {
    this.drone.setMaxVerticalSpeed(speed);
    return this;
  }
  // Controls
  connect() {
    this.drone.connect();
  }

  land() {
    this.drone.land();
    return this;
  }

  pauseFor(time) {
    const waitTill = new Date(new Date().getTime() + time);
    while (waitTill > new Date()) {}
  }

  pauseUntil(property, value) {
    while (this[property] != value) {}
  }

  emergencyLanding() {
    this.drone.emergancyLanding();
    return this;
  }

  flipFront() {
    this.drone.animate("flipFront");
    return this;
  }

  flipBack() {
    this.drone.animate("flipBack");
    return this;
  }

  flipRight() {
    this.drone.animate("flipRight");
    return this;
  }

  flipLeft() {
    this.drone.animate("flipLeft");
    return this;
  }

  land() {
    this.drone.land();
    return this;
  }

  takeOff() {
    this.drone.takeOff();
    return this;
  }

  takeOfOrLand() {
    this.drone.takeoffOrLand();
    return this;
  }

  trim() {
    this.drone.trim();
    return this;
  }

  takePicture() {
    this.drone.takePicture();
    return this;
  }
}

module.exports = MiniDrone;
