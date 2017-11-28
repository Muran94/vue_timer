var vm = new Vue({
  el: "#app",
  data: {
    startStopButtonLabel: 'START',
    timeToCountDown: 0,
    timeLeft: null,
    timeDisp: '00:00.000',
    startTime: null,
    timerID: null,
    running: false
  },
  computed: {
    lightLength: function() {
      if (this.timeToCountDown === 0) {
        return '0%';
      } else {
        return ((this.timeLeft / this.timeToCountDown) * 100) + '%';
      }
    }
  },
  methods: {
    start: function() {
      if (this.running) {
        this.running = false;
        this.startStopButtonLabel = 'START';
        this.timeToCountDown = this.timeLeft;
        clearTimeout(this.timerID);
      } else {
        this.running = true;
        this.startStopButtonLabel = 'STOP';
        this.startTime = Date.now();
        this.countDown();
      }
    },
    reset: function() {
      this.startStopButtonLabel = 'START';
      this.timeToCountDown = 0;
      this.updateTimer(this.timeToCountDown);
    },
    addMin: function() {
      if (this.running) {return}
      this.addTime(60 * 1000);
      this.updateTimer(this.timeToCountDown);
    },
    addSec: function() {
      if (this.running) {return}
      this.addTime(1000);
      this.updateTimer(this.timeToCountDown);
    },
    countDown: function() {
      this.timerID = setTimeout(function() {
        this.timeLeft = this.timeToCountDown - (Date.now() - this.startTime);
        if (this.timeLeft < 0) {
          this.timeLeft = 0;
          this.timeToCountDown = 0;
          this.startStopButtonLabel = 'START';
          this.updateTimer(this.timeLeft);
          clearTimeout(this.timerID);
          return;
        }
        this.updateTimer(this.timeLeft);
        this.countDown();
      }.bind(this), 10);
    },
    updateTimer: function(t) {
      var d = new Date(t);
      var m = d.getMinutes();
      var s = d.getSeconds();
      var ms = d.getMilliseconds();
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      ms = ('00' + ms).slice(-3);

      this.timeDisp = m + ':' + s + '.' + ms;
    },
    addTime(time) {
      this.timeToCountDown += time;
      this.timeLeft += time;
      if (this.timeToCountDown > 60 * 60 * 1000) {
        this.timeToCountDown = 0;
        this.timeLeft = 0;
      }
    }
  }
})
