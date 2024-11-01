[![Main-LTBD](https://github.com/Shavius/test_site/actions/workflows/Main-LTBD.yml/badge.svg)](https://github.com/Shavius/test_site/actions/workflows/Main-LTBD.yml)

# Test site

## This is test project

### packages

```json
"@babel/core": "^7.25.2",
"@babel/preset-env": "^7.25.4",
"@babel/preset-typescript": "^7.24.7",
"@eslint/js": "^9.11.0",
"@types/eslint__js": "^8.42.3",
"@types/jest": "^29.5.13",
"babel-loader": "^9.2.1",
"cross-env": "^7.0.3",
"css-loader": "^7.1.2",
"dotenv-webpack": "^8.1.0",
"eslint": "^8.57.1",
"eslint-config-airbnb": "^19.0.4",
"eslint-config-prettier": "^9.1.0",
"eslint-plugin-import": "^2.30.0",
"eslint-plugin-prettier": "^5.2.1",
"eslint-plugin-promise": "^7.1.0",
"firebase-tools": "^13.23.0",
"html-loader": "^5.1.0",
"html-webpack-plugin": "^5.6.0",
"jest": "^29.7.0",
"jest-environment-jsdom": "^29.7.0",
"mini-css-extract-plugin": "^2.9.1",
"postcss": "^8.4.47",
"postcss-loader": "^8.1.1",
"postcss-preset-env": "^10.0.3",
"prettier": "^3.3.3",
"sass": "^1.79.3",
"sass-loader": "^16.0.2",
"ts-loader": "^9.5.1",
"typescript": "^5.5.4",
"typescript-eslint": "^8.6.0",
"webpack": "^5.94.0",
"webpack-cli": "^5.1.4",
"webpack-dev-server": "^5.1.0"
```

### Comands

```json
"start": "cross-env NODE_ENV=development webpack server",
"build": "cross-env NODE_ENV=production webpack",
"dev": "cross-env NODE_ENV=development webpack",
"clear": "rd /s /q dist",
"test": "jest",
"test-w": "jest --watchAll",
"test-c": "jest --coverage",
"lint": "eslint --ext ts ./",
"lint:fix": "eslint --ext ts --fix ./",
"pre:fix": "prettier --write ./",
"pre": "prettier --check ./",
"all": "npm run lint & npm run pre",
"firebase": "firebase",
"deploy": "firebase deploy",
"deploy:pre": "firebase hosting:channel:deploy Pre-Deploy --expires 1d",
"fb:dell": "firebase hosting:channel:delete Pre-Deploy",
"fb:list": "firebase hosting:channel:list"
```
