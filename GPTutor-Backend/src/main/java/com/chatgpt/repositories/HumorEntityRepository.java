package com.chatgpt.repositories;

import com.chatgpt.entity.HumorEntity;
import com.chatgpt.entity.HumorType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface HumorEntityRepository extends CrudRepository<HumorEntity, UUID> {

    Page<HumorEntity> findByTypeIn(List<HumorType> types, PageRequest pageable);
}
