package com.oopsproject.tcs.repository;

import com.oopsproject.tcs.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlotRepository extends JpaRepository<Slot,Integer> {
}
