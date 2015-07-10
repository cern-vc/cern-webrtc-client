import Ember from 'ember';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import canUseDOM from 'ember-metrics/utils/can-use-dom';
import objectTransforms from 'ember-metrics/utils/object-transforms';
import config from '../config/environment';

const {
  isPresent,
  copy,
  assert,
  merge,
  get,
  $,
  String: { capitalize },
  } = Ember;
const { compact } = objectTransforms;

/**
 * Adapter class for Ember Metrics to make it compatible with Piwik Analytics.
 */
export default BaseAdapter.extend({
  environment: config.environment,
  /**
   * Needed to know what piwik id should be used (production or qa)
   */
  toStringExtension() {
    return 'Piwik';
  },
  /**
   * Generates the script for the main Piwik tracker object.
   * This one should be on the page befor loading the Piwik script file.
   */
  generateScript(isDefer, isAsync, text, charset, position){
    var d = document, newScript = d.createElement('script'), s = d.getElementsByTagName('script')[position];
    newScript.type = 'text/javascript';
    newScript.charset = charset;
    newScript.defer = isDefer;
    newScript.async = isAsync;
    newScript.text = 'var _paq = _paq || [];';
    s.parentNode.insertBefore(newScript, s);
  },
  /**
   * This method will get the select URL based javascript file.
   */
  generateSrcScript(isDefer, isAsync, source, position){
    var d = document, newScript = d.createElement('script'), s = d.getElementsByTagName('script')[position];
    newScript.type = 'text/javascript';
    newScript.src = source;
    newScript.defer = isDefer;
    newScript.async = isAsync;

    s.parentNode.insertBefore(newScript, s);
  },
  init() {
    const config = copy(get(this, 'config'));

    if (this.get('environment') !== 'test') {
      const id = config.piwik_id;
      const { url } = config;

      assert(`[ember-metrics] You must pass a valid \`id\` to the ${this.toString()} adapter`, id);

      if (canUseDOM) {
        var self = this;
        (function () {

          self.generateScript(false, false, 'var _paq = _paq || [];', 'utf-8', 0);

          if (_paq !== undefined) {
            _paq.push(['setTrackerUrl', url.slice(0, -8) + 'piwik.php']); // Slice piwik.js
            _paq.push(['setSiteId', id]);
            _paq.push(["setCookieDomain", "*.vidyo-webrtc.web.cern.ch"]);
            _paq.push(['enableLinkTracking']);
          }
          self.generateSrcScript(true, true, url, 1);

        })();
      }
    }
  },

  identify(){

  },
  /**
   * This method will be called when an event ocurs. This mean, for example when a user performs and action like
   * clicking a button.
   * @zone: The zone of the event (For example: Top menu, footer, sidebar...)
   * @element: The single element that performs the action (for example: home_link, disconnect button...)
   */
  trackEvent(options = {}) {


    if (_paq !== undefined) {
      _paq.push(['trackEvent', options.zone, options.element]);
    }
  },
  /**
   * This method will be called when the user wants to track a page. It will track page views and page unique views.
   */
  trackPage(options = {}){

    if (_paq !== undefined) {
      _paq.push(['setDocumentTitle', options.title]);
      _paq.push(['trackPageView', options.page]);
    }
  },

  alias(){

  }
});
