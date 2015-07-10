import config from '../config/environment';

export default function () {

  // These comments are here to help you get started. Feel free to delete them.

  /*
   Config (with defaults).

   Note: these only affect routes defined *after* them!
   */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  //this.timing = 2000;      // delay for each request, automatically set to 0 during testing

  /*
   Route shorthand cheatsheet
   */
  /*
   GET shorthands

   // Collections
   this.get('/contacts');
   this.get('/contacts', 'users');
   this.get('/contacts', ['contacts', 'addresses']);

   // Single objects
   this.get('/contacts/:id');
   this.get('/contacts/:id', 'user');
   this.get('/contacts/:id', ['contact', 'addresses']);
   */

  /*
   POST shorthands

   this.post('/contacts');
   this.post('/contacts', 'user'); // specify the type of resource to be created
   */

  /*
   PUT shorthands

   this.put('/contacts/:id');
   this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
   */

  /*
   DELETE shorthands

   this.del('/contacts/:id');
   this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

   // Single object + related resources. Make sure parent resource is first.
   this.del('/contacts/:id', ['contact', 'addresses']);
   */

  /*
   Function fallback. Manipulate data in the db via

   - db.{collection}
   - db.{collection}.find(id)
   - db.{collection}.where(query)
   - db.{collection}.update(target, attrs)
   - db.{collection}.remove(target)

   // Example: return a single object with related models
   this.get('/contacts/:id', function(db, request) {
   var contactId = +request.params.id;

   return {
   contact: db.contacts.find(contactId),
   addresses: db.addresses.where({contact_id: contactId})
   };
   });

   */

  //this.get('/api/users', function () {
  //  return {
  //    users: [
  //      {id: 1, name: 'Zelda'},
  //      {id: 2, name: 'Link'},
  //      {id: 3, name: 'Epona'},
  //    ]
  //  };
  //});

  this.post(config.backend_server_url + '/api/v1.0/auth/token/', function () {
    var Base64 = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
          n = e.charCodeAt(f++);
          r = e.charCodeAt(f++);
          i = e.charCodeAt(f++);
          s = n >> 2;
          o = (n & 3) << 4 | r >> 4;
          u = (r & 15) << 2 | i >> 6;
          a = i & 63;
          if (isNaN(r)) {
            u = a = 64;
          } else if (isNaN(i)) {
            a = 64;
          }
          t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }
        return t;
      }, decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
          s = this._keyStr.indexOf(e.charAt(f++));
          o = this._keyStr.indexOf(e.charAt(f++));
          u = this._keyStr.indexOf(e.charAt(f++));
          a = this._keyStr.indexOf(e.charAt(f++));
          n = s << 2 | o >> 4;
          r = (o & 15) << 4 | u >> 2;
          i = (u & 3) << 6 | a;
          t = t + String.fromCharCode(n);
          if (u !== 64) {
            t = t + String.fromCharCode(r);
          }
          if (a !== 64) {
            t = t + String.fromCharCode(i);
          }
        }
        t = Base64._utf8_decode(t);
        return t;
      }, _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
          var r = e.charCodeAt(n);
          if (r < 128) {
            t += String.fromCharCode(r);
          } else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(r & 63 | 128);
          } else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(r & 63 | 128);
          }
        }
        return t;
      }, _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = 0;
        var c1 = 0;
        var c2 = 0;
        while (n < e.length) {
          r = e.charCodeAt(n);
          if (r < 128) {
            t += String.fromCharCode(r);
            n++;
          } else if (r > 191 && r < 224) {
            c2 = e.charCodeAt(n + 1);
            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
            n += 2;
          } else {
            c2 = e.charCodeAt(n + 1);
            var c3 = e.charCodeAt(n + 2);
            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            n += 3;
          }
        }
        return t;
      }
    };
    var encodedString = Base64.encode("1234");

    return {
      success: true,
      token: encodedString
    };
  });
  this.get('https://oauthresource.web.cern.ch/api/Me', function () {

    return [{
      "Type": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "Value": "email.address@cern.ch"
    }, {
      "Type": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn",
      "Value": "email.address@cern.ch"
    }, {
      "Type": "http://schemas.xmlsoap.org/claims/UPN",
      "Value": "email.address@cern.ch"
    }, {
      "Type": "http://schemas.xmlsoap.org/claims/EmailAddress",
      "Value": "email.address@cern.ch"
    }, {
      "Type": "http://schemas.xmlsoap.org/claims/CommonName",
      "Value": "username1"
    },
      {"Type": "http://schemas.xmlsoap.org/claims/DisplayName", "Value": "Name Lastname1 Lastname2"}
    ];
  });
  this.post(config.backend_server_url + '/api/v1.0/browser/', function () {
    return {
      should_redirect: false, system_info: {
        browser: {
          name: "Chrome",
          version: "46"
        },
        os: {
          name: "Mac OS",
          version: "X 10.11.2"
        }
      }
    };
  });

  if (config.environment === 'development') {
    this.passthrough("https://vidyowebrtc01.cern.ch/**");
  }

}


export function testConfig() {
  this.get(config.SESSION_MANAGER + '/zincadmin/service/getinstance.htm', function () {
    return {"type": "", "ip": "vidyowebrtc01.cern.ch", "errorCode": "0", "errorMessage": "success"};
  });

  this.post(config.SESSION_MANAGER + "/connect", function () {
    return {
      "session": "6dc23be62270",
      "callId": 44,
      "maxResolution": "720p",
      "maxShareResolution": "720p",
      "maxSubscriptions": 6,
      "stunServer": "stun.l.google.com:19302"
    };
  });

  this.get(config.SESSION_MANAGER + "/events", function () {
    return {session: "4d4a3c7fd4cb", callId: 70};
  });

}
