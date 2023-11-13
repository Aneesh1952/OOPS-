package com.oopsproject.tcs.repository;

import com.oopsproject.tcs.entity.DailySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyScheduleRepository extends JpaRepository<DailySchedule,Integer> {
}
