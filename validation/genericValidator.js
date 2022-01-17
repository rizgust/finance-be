function makeValidator (schema) {
  return function validator (payload) {
    const { error } = schema.validate(payload, {
      abortEarly: false,
      convert: false 
    });
    if (error) {
      const message = error.details.map((el) => el.message).join('\n');
      return { error: message };
    }
    return { error: false };
  };
}
function validateFilterWithJoi (schema, filterKeys) {
  return function findValidator (payload, modelSchema) {
    let message = 'invalid attributes in options.select';
    let keys = [], isValid = true;
    if (modelSchema) {
      keys.push(...Object.keys(modelSchema), ...Object.values(filterKeys));
      if (payload.options && payload.options.select) {
        if (Array.isArray(payload.options.select)) {
          isValid = keys.some(ai => payload.options.select.includes(ai));
        } else if (typeof payload.options.select === 'string') {
          payload.options.select = payload.options.select.split(' ');
          isValid = keys.some(ai => payload.options.select.includes(ai));
        } else {
          isValid = keys.some(ai => Object.keys(payload.options.select).includes(ai));
        }
      } else if (payload && payload.select) {
        if (Array.isArray(payload.select)) {
          isValid = keys.some(ai => payload.select.includes(ai));
        } else if (typeof payload.select === 'string') {
          payload.select = payload.select.split(' ');
          isValid = keys.some(ai => payload.select.includes(ai));
        } else {
          isValid = keys.some(ai => Object.keys(payload.select).includes(ai));
        }
      }
      if (!isValid) {
        return { error: message };
      }

    }
    const { error } = schema.validate(payload, {
      abortEarly: false,
      convert: false 
    });
    if (error) {
      const message = error.details.map((el) => el.message).join('\n');
      return { error: message };
    }
    return { error: false };
  };
};

module.exports = {
  makeValidator,
  validateFilterWithJoi 
};
