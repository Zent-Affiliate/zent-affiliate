export const TYPE_FILE = [
  'image/jpg',
  'image/JPG',
  'image/jpeg',
  'image/JPEG',
  'image/png',
  'image/PNG',
  'image/svg+xml',
  'image/webp',
]

export const MAX_STRING_SIZE = 255
export const MAX_SIZE_NAME = 50
export const MAX_SIZE_IP = 15

export const ACTIVE_STATUS = {
  LOCK: 0,
  UNLOCK: 1,
}

export const TYPE_SUBMIT = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
}

export const SERVER_STATUS = {
  STOPPING: 0,
  RUNNING: 1,
}

export const PERMISSIONS = {
  LIST: {
    // List permission
    USERS: 'list-users',
  },
  ADD: {
    // Add permission
    USERS: 'create-user',
  },
  EDIT: {
    // Edit permission
    USERS: 'edit-user',
  },
  DELETE: {
    // Delete permission
    USERS: 'delete-user',
  },
  DETAIL: {
    // Detail permission
  }
}

export const MAX_NAME_PROJECT_STRING_SIZE = 50;

export const MAX_DOMAIN_STRING_SIZE = 255;

export const VALIDATE_NAME_PROJECT_REGEX = /^[\p{L} ]*\d*$/u;

export const VALIDATE_DOMAIN_REGEX = new RegExp('^(https?:\\/\\/)' +
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
  '((\\d{1,3}\\.){3}\\d{1,3}))' +
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
  '(\\?[;&a-z\\d%_.~+=-]*)?' +
  '(\\#[-a-z\\d_]*)?$');

export const PROJECT_STATUS = {
  STOPPING: 0,
  RUNNING: 1,
};

export const CONFIG_TYPE = {
  LARK_INFO: 0,
  NOTIFICATION: 1,
};

export const STATUS_NOTIFICATION = {
  NON_NOTIFICATION: 0,
  NOTIFICATION: 1
};

export const TIME_TYPE = {
  DAY: 0,
  HOUR: 1,
  MINUTE: 2,
};
