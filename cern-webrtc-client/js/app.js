/**
 * Created by fernanre on 7/20/2015.
 */
/**
 * Created by fernanre on 7/17/2015.
 */
define([
        'ember',
        'ember_data'
    ],
    function (Ember, DS) {
        console.debug('Entering Ember...');

        var App = Ember.Application.create({
            // Basic logging, e.g. "Transitioned into 'post'"
            LOG_TRANSITIONS: true
            , MODEL_FACTORY_INJECTIONS: true
            , logger: null
            // Extremely detailed logging, highlighting every internal
            // step made while transitioning into a route, including
            // `beforeModel`, `model`, and `afterModel` hooks, and
            // information about redirects and aborted transitions
            //LOG_TRANSITIONS_INTERNAL: true
        });



//App.Store = DS.Store.extend({
//            adapter: DS.FixtureAdapter.extend({
//                revision: 22,
//                queryFixtures: function (fixtures, query, type) {
//                    console.debug('queryFixtures');
//                    var x = fixtures.filter(function (item) {
//                        for (var prop in query) {
//                            if (item[prop] != query[prop]) {
//                                return false;
//                            }
//                        }
//                        console.debug('queryFixtures item');
//                        console.debug(item);
//                        return true;
//                    });
//                    console.debug(x)
//                    return x;
//                }
//            })
//        });

        App.ApplicationAdapter = DS.FixtureAdapter;

        return App;
    });
//
//window.WebrtcClient = Ember.Application.create();
//
//WebrtcClient.ApplicationAdapter = DS.FixtureAdapter.extend();