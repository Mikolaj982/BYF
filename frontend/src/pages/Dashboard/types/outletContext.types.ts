import { UserGroup } from "../../../features/groups/types/group.types";
import { Lobby } from "../../../features/lobbies/types/lobby.types";

export type DashboardOutletContext = {
    groups: UserGroup[];
    loadingGroups: boolean;
    groupsError: unknown;
    refetchGroups: () => Promise<void>;
};

export type DashboardLayoutOutletContext = DashboardOutletContext & {
    lobbies: Lobby[];
    loadingLobbies: boolean;
    refetchLobbies: () => Promise<void>;
    lobbiesError: unknown;
};