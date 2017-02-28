module.exports = {
    'extends': ['eslint:recommended', 'angular'],
    'parserOptions': {
        'sourceType': 'module'
    },
    /* TODO Have to replace with "env": {
     "browser": false,
     "node": true
     }*/
    'globals': {
        'document': true
    }
};