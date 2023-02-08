// google analytics
tarteaucitron.services.analytics = {
  "key": "analytics",
  "type": "analytic",
  "name": "Google Analytics (universal)",
  "uri": "https://policies.google.com/privacy",
  "needConsent": true,
  "cookies": (function() {
    var googleIdentifier = tarteaucitron.user.analyticsUa,
      tagUaCookie = '_gat_gtag_' + googleIdentifier,
      tagGCookie = '_ga_' + googleIdentifier;

    tagUaCookie = tagUaCookie.replace(/-/g, '_');
    tagGCookie = tagGCookie.replace(/G-/g, '');

    return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
  })(),
  "js": function() {
    "use strict";
    window.GoogleAnalyticsObject = 'ga';
    window.ga = window.ga || function() {
      window.ga.q = window.ga.q || [];
      window.ga.q.push(arguments);
    };
    window.ga.l = new Date();
    tarteaucitron.addScript('https://www.google-analytics.com/analytics.js', '', function() {
      var uaCreate = { 'cookieExpires': (timeExpire !== undefined) ? timeExpire : 34128000 };
      tarteaucitron.extend(uaCreate, tarteaucitron.user.analyticsUaCreate || {});
      ga('create', tarteaucitron.user.analyticsUa, uaCreate);

      if (tarteaucitron.user.analyticsAnonymizeIp) {
        ga('set', 'anonymizeIp', true);
      }

      if (typeof tarteaucitron.user.analyticsPrepare === 'function') {
        tarteaucitron.user.analyticsPrepare();
      }

      if (tarteaucitron.user.analyticsPageView) {
        ga('send', 'pageview', tarteaucitron.user.analyticsPageView);
      } else {
        ga('send', 'pageview');
      }

      if (typeof tarteaucitron.user.analyticsMore === 'function') {
        tarteaucitron.user.analyticsMore();
      }
    });
  }
};
