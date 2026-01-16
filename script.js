<script>
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.timerRef = document.querySelector(selector);
    this.refs = {
      days: this.timerRef.querySelector('[data-value="days"]'),
      hours: this.timerRef.querySelector('[data-value="hours"]'),
      mins: this.timerRef.querySelector('[data-value="mins"]'),
      secs: this.timerRef.querySelector('[data-value="secs"]'),
    };
    this.start();
  }
  start() {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const time = this.targetDate - now;
      if (time <= 0) {
        this.stop();
        this.updateClock({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      const timeData = this.getTimeComponents(time);
      this.updateClock(timeData);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
  }
  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor(
      (time % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secs = Math.floor(
      (time % (1000 * 60)) / 1000
    );
    return { days, hours, mins, secs };
  }
  updateClock({ days, hours, mins, secs }) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = this.format(hours);
    this.refs.mins.textContent = this.format(mins);
    this.refs.secs.textContent = this.format(secs);
  }
  format(value) {
    return String(value).padStart(2, '0');
  }
}
new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2026'),
});
</script>
