export type Group = {
    id: string;
    name: string;
    description: string | null;
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
};