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

export type GroupMember = {
    role: string;
    username: string;
    id: string;
}

export type GroupMemberBarProps = {
    role: string;
    username: string;
}
