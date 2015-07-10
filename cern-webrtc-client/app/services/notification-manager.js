import Ember from 'ember';

export default Ember.Service.extend({

  notificationsStatus: Notification.permission,

  /**
   * Will display a notification.
   * @param body Body of the notification
   * @param title
   * @param icon
   */
  sendDesktopNotification: function(body, title) {
    var icon_ = 'images/cern_small_notification.png';
    var options = {
      body: body,
      icon: icon_
    };

    var n = new Notification(title, options);
    Ember.run.later((function() {
      n.close();
    }), 2500);
  }
});
