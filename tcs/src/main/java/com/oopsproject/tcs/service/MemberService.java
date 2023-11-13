package com.oopsproject.tcs.service;

import com.oopsproject.tcs.entity.DailySchedule;
import com.oopsproject.tcs.entity.Member;
import com.oopsproject.tcs.entity.Slot;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public interface MemberService {

    public Member registerMember(Member member) throws Exception;
    public Member signin(Member member) throws Exception;

    ArrayList<DailySchedule> dailySchedules(String member, ArrayList<String> dates);

    String updateslot(Slot slot, int member, int a) throws Exception;

    Member reset(Member member) throws Exception;

    String delete(Member member) throws Exception;

    List<Member> members();

    Map<Integer,DailySchedule> memberds(List<Member> members, String date);
}
