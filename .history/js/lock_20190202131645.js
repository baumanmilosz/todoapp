console.log('Działa');

screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

if (screen.lockOrientationUniversal(["landscape-primary", "landscape-secondary"])) {
  // Orientation was locked
  console.log('as')
} else {
  // Orientation lock failed
}