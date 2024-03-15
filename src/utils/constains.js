export const TYPE_FILE = [
    'image/jpg',
    'image/JPG',
    'image/jpeg',
    'image/JPEG',
    'image/png',
    'image/PNG',
    'image/svg+xml',
    'image/webp'
];

export const MAX_STRING_SIZE = 255;
export const MAX_SIZE_NAME = 50;
export const MAX_SIZE_IP = 15;

export const ACTIVE_STATUS = {
    LOCK: 0,
    UNLOCK: 1
};

export const TYPE_SUBMIT = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD'
};

export const PERMISSIONS = {
    LIST: {
        // List permission
        USERS: 'list-users',
        ADMIN: 'list-admins'
    },
    ADD: {
        // Add permission
        ADMIN: 'create-admin',
        USERS: 'create-user'
    },
    EDIT: {
        // Edit permission
        ADMIN: 'edit-admin',
        USERS: 'edit-user'
    },
    DELETE: {
        // Delete permission
        ADMIN: 'delete-admin',
        USERS: 'delete-user'
    },
    DETAIL: {
        // Detail permission
    },
    SUPER:{
        SUPER_ADMIN: 'super_admin'
    }
};

export const MAX_NAME_PROJECT_STRING_SIZE = 50;

export const VALIDATE_NAME_PROJECT_REGEX = /^[\p{L} ]*\d*$/u;
