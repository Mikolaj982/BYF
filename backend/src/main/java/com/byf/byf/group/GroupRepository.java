package com.byf.byf.group;

import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Transactional
@Repository
public interface GroupRepository extends CrudRepository<GroupEntity, Integer> {
}


