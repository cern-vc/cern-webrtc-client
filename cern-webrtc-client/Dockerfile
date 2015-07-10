FROM node:4.2.6
MAINTAINER Rene Fernandez <hola@renefernandez.com>

ENV EMBER_CLI_VERSION=2.8.0 \
    BOWER_VERSION=1.7.9 \
    PHANTOMJS_NPM_VERSION=2.1.7

# Note: npm is v2.14.7
RUN \
	npm install -g ember-cli@${EMBER_CLI_VERSION} &&\
	npm install -g bower@${BOWER_VERSION} &&\
	npm install -g phantomjs@${PHANTOMJS_NPM_VERSION}

# install watchman
# Note: See the README.md to find out how to increase the
# fs.inotify.max_user_watches value so that watchman will
# work better with ember projects.
RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v3.5.0 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install

EXPOSE 4200 35729
WORKDIR /web/ember-app

# run ember server on container start
ENTRYPOINT ["/usr/local/bin/ember"]
