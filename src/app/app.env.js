const environment = {
  client_name: 'gw2Armory',
  gw2: {
    endpoint: 'https://api.guildwars2.com/',
  },
  previewDomain: window.location.host === 'preview.gw2armory.com',
};

if (__DEV__) {
  environment.api = {
    endpoint: 'http://192.168.59.103/',
    secret: 'bacon',
  };
}

if (__PROD__) {
  environment.api = {
    endpoint: '//api.gw2armory.com/',
    secret: 'sekritsauce',
  };
}

environment.build = {
  date: __DATE__,
  version: __VERSION__,
};

export default environment;
