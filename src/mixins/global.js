export default {
  methods: {
    closeApp: function(playNow) {

      window.myUtilities.log('Olympics 2022', 'Close');

      if (playNow && window.dataLayer) {
        dataLayer.push({
          'event': 'olympics-2022-event',
          'olympics-2022-action': 'play-now'
        });
      }

      const closeBtn = document.getElementById("olympics2022-close");

      if (closeBtn) {
        closeBtn.click();
      }
    }
  }
};
