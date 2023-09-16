const validAddListBooksSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    books: {
      type: "array",
      items: {
        type: "object",
        properties: {
          isbn: {
            type: "string",
          },
        },
        required: ["isbn"],
      },
    },
  },
  required: ["books"],
}

const invalidAddListBooksSchema = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  $ref: '#/definitions/Welcome4',
  definitions: {
    Welcome4: {
      type: 'object',
      additionalProperties: false,
      properties: {
        code: {
            type: ["string", "integer"],
            pattern: "^[0-9]{4}$"
        },
        message: {
          type: 'string',
        },
      },
      required: [
        'code',
        'message',
      ],
      title: 'Welcome4',
    },
  },
}


module.exports = {
    validAddListBooksSchema,
    invalidAddListBooksSchema
};