package com.oopsproject.tcs.repository;

import com.oopsproject.tcs.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    public Member findByEmail(String email);

}
