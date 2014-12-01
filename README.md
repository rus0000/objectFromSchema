objectFromSchema
================

Creates empty Javascript object from JSON schema

Traverses JSON schema tree and creates empty Javascript object

Node module. To install just copy to your project.

Use case
--------
JSON schema validation can be used during AJAX communication on a server to sanitize incoming JSON data.
Having wrong request object structure can easily crush your server. To prevent this you need to check every property in the request object if it is present and of valid type.

For JSON schema validation I'm using https://github.com/geraintluff/tv4
For schema creation http://www.jsonschema.net, but it is not perfect. Better create schema manually.

In case when request doesn’t pass validation you may need to create empty but valid request object, initialize it and continue to process the request. This is what this module for.

Usage
-----
```
var ajaxSchema = JSON.parse(fs.readFileSync(ajaxSchemaPath)),
  ajaxReqEmpty = objectFromSchema(ajaxSchema);

```

The MIT License (MIT)
