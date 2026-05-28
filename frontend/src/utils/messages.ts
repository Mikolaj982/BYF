export const MESSAGES = {
    SUCCESS: {
        USER_REGISTERED: 'Registration successful!',
        USER_LOGGED: 'Logged in successfully!',
        USER_LOGGED_OUT: 'Logged out.',
        CREATED_GROUP: 'Group created!',
        DELETED_GROUP: 'Group deleted.',
        UPDATED_GROUP: 'Group updated.',
        CREATED_LOBBY: 'Lobby created!',
        JOINED_LOBBY: 'You joined the lobby!',
        JOINED_GROUP: 'You joined the group!',
        LEFT_GROUP: 'You left the group.',
        CREATED_MATCH: 'Match created!',
        LEFT_LOBBY: 'You left the lobby.',
        DELETED_LOBBY: 'Lobby deleted.',
        DELETED_MATCH: 'Match deleted.'
    },
    ERROR: {
        REQUIRED: 'This field is required.',
        INVALID_EMAIL: 'Invalid email address.',
        INVALID_PASSWORD: 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
        INVALID_USERNAME_EMAIL: 'The field must contain an existing email address or username.',
        NOT_MATCHES_PASSWORD: 'Passwords must match.',
        LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',
        REGISTER_FAILED: 'Registration failed. Please check your details and try again.',
        UNKNOWN: 'Something went wrong. Please try again.',
        ALREADY_EXISTS: 'Already exists.',
        LOAD_GROUPS: 'Failed to load groups. Please try again.',
        EMPTY_INVITE_CODE: 'Invite code is required.',
    }
}