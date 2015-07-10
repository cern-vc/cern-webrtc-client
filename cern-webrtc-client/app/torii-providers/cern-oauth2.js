/**
 * Created by renefernandez on 23/05/16.
 */
import Oauth2 from 'torii/providers/oauth2-code';

export default Oauth2.extend({
  name: 'cern-oauth2',
  baseUrl: 'https://oauth.web.cern.ch/OAuth/Authorize',
  responseParams: ['code', 'state'],
  scope: 'bio',
});
