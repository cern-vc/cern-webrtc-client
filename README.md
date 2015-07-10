# CERN WebRTC Vidyo Client

This application is a Vidyo WebRTC Client. It is connected to the Vidyo infraestructure and allows people to make multi user videoconference calls.
It is written using Javascript (some things are using ES6), Ember-cli and Vidyo technologies .

To read the project documentation go to the [Project Wiki](https://gitlab.cern.ch/vidyo-webrtc/webrtc-vidyo-client/wikis/home)

If you don't have experience using Ember-cli, go to the ["Tutorials"](https://gitlab.cern.ch/fernanre/webrtc-vidyo-client/wikis/tutorials) section.

## Quick guide

### Prerequisites
- node >= 4.2.4
- npm >= 3.10.5
- bower >= 1.8.0
- phantomjs >= 2.1.1

### Build the application

```
npm install && bower install
```

### Generate Self-signed certificates

1. `openssl genrsa -des3 -out server.key 2048`
2. `openssl rsa -in server.key -out server.key.insecure`
3. `mv server.key server.key.secure`
4. `mv server.key.insecure server.key`
5. `openssl req -new -key server.key -out server.csr`
6. `openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt`

Move the generated files to the `ssl` folder.

### Setup your configuration

Create a `config/.env` file using `config/.env.sample` as template.

### Set up your Vidyo WebRTC plugin files

Copy your Vidyo plugin files to `vendor/vidyo`.

### Run the application

```
ember s -ssl=true
```

### Test the application

```
ember test --server
```

### Build for production and qa
#### QA
```
npm run build_qa
```
#### Production
```
npm run build_production
```

The generated files will be available in `dist/qa` and `dist/production`.