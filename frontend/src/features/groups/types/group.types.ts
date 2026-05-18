export enum GroupRole {
    Owner = 'owner',
    Member = 'member',
};

export type UserGroup = {
    id: string;
    name: string;
    description: string;
    role: GroupRole;
    inviteCode: string;
};

export type GroupMember = {
    role: string;
    username: string;
    id: string;
};

export type CreateGroupSubmitData = {
    owner: string;
    name: string;
    description: string;
};

export type UpdateGroupFormData = {
    name: string;
    description: string;
};


