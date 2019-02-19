# Serverless AWS Apikey Output Plugin

This plugin outputs AWS API Gateway Keys into a JSON file. Remember to keep your API Keys secure!

NOTE: This Plugin is still Work In Progress (WIP)

## Installation

Install with **npm**:

```sh
npm install --save-dev sls-aws-apikey-output-plugin
```

And then add the plugin to your `serverless.yml` file:

```yaml
plugins:
  - sls-aws-apikey-output-plugin
```

### Configuration

```yaml
custom:
  apikeyoutput:
    file: apikey.json
```

Only JSON is supported for now

### JSON Output

```json
{
  "keys": [
    {
      "id": "API_KEY_ID",
      "value": "API_KEY",
      "name": "API_KEY_NAME",
      "enabled": true,
      "createdDate": "CREATED_DATE",
      "lastUpdatedDate": "LAST_UPDATED_DATE",
      "stageKeys": ["STAGEKEY1", "STATEKEY2"]
    }
  ]
}
```

### Contribute
All PRs and Feedback are welcome
