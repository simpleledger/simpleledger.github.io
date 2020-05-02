<template></template>

<script>
export default {
  data: function() {
    return {
      searchBox: false,
      queryVal: null
    }
  },
  mounted: function() {
    // track outbound clicks
    document.addEventListener('click', this.trackOutbound)

    const searchBox = document.querySelector('.navbar .links input')
    if (searchBox) {
      searchBox.addEventListener('keyup', this.captureSearch)
      // default algolia search does not clear the input query val
      // this patch ensures it is reset upon losing focus
      searchBox.addEventListener('focusout', evt => (evt.target.value = ''))
      this.searchBox = searchBox
    }
  },
  beforeDestroy() {
    // remove on unmount
    document.removeEventListener('click', this.trackOutbound)

    if (this.searchBox) {
      this.searchBox.removeEventListener('keyup', this.captureSearch)
    }
  },
  watch: {
    '$route.path': function(path) {
      if (this.queryVal) {
        this.trackQuery(path)
      }
    },
    $route: function() {
      if (this.searchBox) {
        // remove focus from the searchBox upon router action
        this.searchBox.blur()
      }
    }
  },
  methods: {
    captureSearch(q) {
      this.queryVal = this.searchBox.value
    },
    trackQuery(path) {
      if (!window._paq) return
      _paq.push(['trackSiteSearch', this.queryVal, false, 0]);
      this.queryVal = null
    }
  }
}
</script>
