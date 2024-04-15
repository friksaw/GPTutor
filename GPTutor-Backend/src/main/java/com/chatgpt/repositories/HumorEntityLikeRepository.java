package com.chatgpt.repositories;

import com.chatgpt.entity.HumorEntityLike;
import com.chatgpt.entity.ImageComplaint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface HumorEntityLikeRepository extends CrudRepository<HumorEntityLike, UUID> {
    @Query("SELECT h FROM HumorEntityLike h WHERE h.vkUser.id = :userId AND h.humorEntity.id = :humorEntityId")
    Optional<ImageComplaint> findByUserIdAndHumorEntityId(@Param("userId") UUID userId, @Param("humorEntityId") UUID humorEntityId);
}
