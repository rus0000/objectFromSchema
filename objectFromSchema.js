/**
 * Traverses JSON schema tree and creates empt Javascript object
 * http://json-schema.org/
 * http://spacetelescope.github.io/understanding-json-schema/index.html
 *
 * @param schemaObj {Object} You need to load schema from json file and parse it before
 * @return {Object} Empty Javascript object with only required properties
 * */
objectFromSchema = function (schemaObj) {
    var newObj = {data: undefined};

    function traverse(schema, prop) {
        var required;
        if (schema.hasOwnProperty('required')) {
            if (_.isArray(schema.required)) {
                required = schema.required;
            } else {
                if (!schema.required) {
                    return;
                }
            }
        }
        switch (schema.type) {
            case 'object':
                this[prop] = {};
                if (!_.isPlainObject(schema.properties)) {
                    throw new TypeError();
                }
                if (_.size(schema.properties) > 0) {
                    _.forEach(schema.properties, function (value, key) {
                        if (!required || (required && _.contains(required, key))) {
                            traverse.apply(this, [value, key]);
                        }
                    }, this[prop]);
                }
                break;
            case 'array':
                this[prop] = [];
                if (_.isPlainObject(schema.items)) {
                    if (!required || (required && _.contains(required, '0'))) {
                        traverse.apply(this[prop], [schema.items, 0]);
                    }
                } else if (_.isArray(schema.items)) {
                    if (_.size(schema.items) > 0) {
                        _.forEach(schema.items, function (value, index) {
                            if (!required || (required && _.contains(required, index.toString()))) {
                                traverse.apply(this, [value, index]);
                            }
                        }, this[prop]);
                    }
                } else {
                    throw new TypeError();
                }
                break;
            case 'string':
                this[prop] = '';
                break;
            case 'integer':
            case 'number':
                this[prop] = schema.minimum ? schema.minimum : 0;
                this[prop] = schema.multipleOf ? schema.multipleOf : 0;
                break;
            case 'boolean':
                this[prop] = false;
                break;
            case 'null':
                this[prop] = null;
                break;
        }
    }

    traverse.apply(newObj, [schemaObj, 'data']);
    return newObj.data;
};
