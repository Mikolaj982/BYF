export type Group = {
    id: string;
    name: string;
    description: string | null;
    invite_code: string;
};

export type GroupMembersRow = {
    groups: Group;
    role: string;
};

export type UserGroup = {
    id: string;
    name: string;
    description: string | null;
    role: string;
    invite_code: string;
};