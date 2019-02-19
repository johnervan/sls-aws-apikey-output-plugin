const BbPromise = require("bluebird");
const _ = require("lodash");
const fs = require("fs");

class AWSApiKeyOutputPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider("aws");
    this.apikeyoutput = this.serverless.service.custom.apikeyoutput;

    this.commands = {};

    this.hooks = {
      "aws:info:displayStackOutputs": () =>
        BbPromise.bind(this).then(this.getApiKey)
    };
  }

  saveApiKeys(apiKeys) {
    const outputFile = this.apikeyoutput.file || "./apikeys.json";
    if (apiKeys.length > 0) {
      return new Promise((resolve, reject) => {
        fs.writeFile(
          outputFile,
          JSON.stringify({ keys: apiKeys }, null, 4),
          err => {
            if (err) {
              this.serverless.cli.log("Error writing keys to JSON");
              reject();
            }
            resolve();
          }
        );
      });
    }
    this.serverless.cli.log("No API Keys in this project!");
    return;
  }

  getApiKey() {
    return new Promise(resolve => {
      const apiKeyNames = this.serverless.service.provider.apiKeys || [];
      this.provider
        .request("APIGateway", "getApiKeys", { includeValues: true })
        .then(allApiKeys => {
          const { items } = allApiKeys;
          const filteredItems = items.filter(item =>
            _.includes(apiKeyNames, item.name)
          );
          // console.log(filteredItems);
          this.saveApiKeys(filteredItems).then(() => {
            resolve();
          });
        });
    });
  }
}

module.exports = AWSApiKeyOutputPlugin;