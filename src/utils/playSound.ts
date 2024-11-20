export const playSound = (check: boolean) => {
  const sound = new Audio(
    check
      ? "/assets/audio/checkout-success-beep.wav"
      : "/assets/audio/checkout-error-beep.wav"
  );
  sound
    .play()
    .then(() => void 0)
    .catch(() => void 0);
};
