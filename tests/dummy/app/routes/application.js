import Ember from 'ember';

export default Ember.Route.extend({
  translationMap: Ember.inject.service('translation-map')
});
