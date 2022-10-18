const { Components } = require('./components/main');
const { Listeners } = require('./listeners');

Listeners.OnNavigation.Finish();
Components.Container.Listeners.OnMessage.Toggle();
