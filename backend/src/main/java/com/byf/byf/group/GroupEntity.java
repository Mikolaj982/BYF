package com.byf.byf.group;


import com.byf.byf.group.groupaccountmapping.GroupUserMapping;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GroupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;

    private String name;

    private String description;

    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE)
    private List<GroupUserMapping> groupUserMappings;
}
