package com.byf.byf.group.groupaccountmapping;

import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface GroupUserMappingRepository extends CrudRepository<GroupUserMapping, Integer> {
}