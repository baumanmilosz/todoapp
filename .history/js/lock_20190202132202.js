console.log('Działa');

screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

if (screen.lockOrientationUniversal("portrait-primary")) {
  // Orientation was locked
  unlockOrientation();
} else {
  // Orientation lock failed
  lockOrientation();

}