export default {
  generateUploadUrl: {
    name: "generate upload url",
    success: "generating upload url",
    error: "could not generate upload url"
  },
  authorizer: {
    name: "authorize user",
    success: "successfully authorized user",
    error: "failed to authorize user"
  },
  decodeToken: {
    error: {
      noKid: "No kid provided in token!"
    }
  },
  getToken: {
    error: {
      noheader: 'No authentication header',
      invalidHeader: 'Invalid authentication header'
    }
  },
  getSigningKey: {
    error: {
      noAssocKey: "Key was not signed by application"
    }
  },
  delete: {
    name: "delete note",
    success: "deleting note",
    error: "could not delete note"
  },
  create: {
    name: "create note",
    success: "creating note",
    error: "could not create note"
  },
  update: {
    name: "update note",
    success: "updating note",
    error: "could not update note"
  },
  findAll: {
    name: "find all notes",
    success: "fetching list of notes",
    error: "could not return list of notes"
  },
  findOne: {
    name: "find note",
    success: "fetching note",
    error: "could not locate note"
  }
}