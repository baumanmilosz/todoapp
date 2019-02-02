function lock(orientation) {
  fullScreen();
  screen.orientation.lock(orientation);
}

lock('landscape-primary');