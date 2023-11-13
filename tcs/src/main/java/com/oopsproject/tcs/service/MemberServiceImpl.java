package com.oopsproject.tcs.service;

import com.oopsproject.tcs.entity.DailySchedule;
import com.oopsproject.tcs.entity.Member;
import com.oopsproject.tcs.entity.Slot;
import com.oopsproject.tcs.repository.DailyScheduleRepository;
import com.oopsproject.tcs.repository.MemberRepository;
import com.oopsproject.tcs.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DailyScheduleRepository dailyScheduleRepository;

    @Autowired
    private SlotRepository slotRepository;

    public MemberServiceImpl(MemberRepository memberRepository, DailyScheduleRepository dailyScheduleRepository, SlotRepository slotRepository) {
        this.memberRepository = memberRepository;
        this.dailyScheduleRepository = dailyScheduleRepository;
        this.slotRepository = slotRepository;
    }

    @Override
    public Member registerMember(Member member) throws Exception {

        if(memberRepository.findByEmail(member.getEmail())!=null){
            throw new Exception("User with your email already exists");
        }

        return memberRepository.save(member);
    }

    @Override
    public Member signin(Member member) throws Exception {

        Member dbmember = memberRepository.findByEmail((member.getEmail()));

        if(dbmember==null){
            throw new Exception("user empt");
        }

        if(!dbmember.getPassword().equals(member.getPassword())){
            throw new Exception("user fake");
        }

        return dbmember;
    }

    @Override
    public ArrayList<DailySchedule> dailySchedules(String member, ArrayList<String> dates) {

        ArrayList<DailySchedule> dailySchedules = new ArrayList<>();

        Member savedMember = memberRepository.findByEmail(member);

        for(int i=0;i<dates.size();i++){

            if(savedMember.getDailySchedules().containsKey(dates.get(i))){
                dailySchedules.add(savedMember.getDailySchedules().get(dates.get(i)));
            }else{
                dailySchedules.add(new DailySchedule());
            }

        }

        return dailySchedules;
    }

    @Override
    public List<Member> members() {
        return memberRepository.findAll();
    }

    @Override
    public Map<Integer,DailySchedule> memberds(List<Member> members, String date) {
        Map<Integer,DailySchedule> re = new HashMap<>();

        for(int i=0;i<members.size();i++){

            Member savedMember = memberRepository.findById(members.get(i).getId()).get();

            if(savedMember.getDailySchedules().containsKey(date)){
                re.put(savedMember.getId(),savedMember.getDailySchedules().get(date));
            }else{
                re.put(savedMember.getId(),new DailySchedule());
            }

        }

        return re;

    }

    @Override
    public String delete(Member member) throws Exception {

        Member k = memberRepository.findByEmail(member.getEmail());

        if(k==null){
            throw new Exception("fake user");
        }

        this.memberRepository.deleteById(k.getId());

        return "yes";

    }

    @Override
    public String updateslot(Slot slot, int member, int a) throws Exception {

        Member k = this.memberRepository.findById(member).get();

        if(k==null){
            throw new Exception("fake id");
        }

        if(!k.getDailySchedules().containsKey(slot.getDate())){

            DailySchedule kx = new DailySchedule();

            kx.setMember(k);

            kx.setDate(slot.getDate());

            DailySchedule dailySchedule = this.dailyScheduleRepository.save(kx);

            k.getDailySchedules().put(slot.getDate(),dailySchedule);
        }

        memberRepository.save(k);

        DailySchedule dailySchedule = k.getDailySchedules().get(slot.getDate());

        Slot s=null;

        if(a<dailySchedule.getSlots().size()){
            s = k.getDailySchedules().get(slot.getDate()).getSlots().get(a);
        }

        if(s==null){
            s = new Slot();
        }

        s.setNote(slot.getNote());
        s.setDailySchedule(dailySchedule);
        s.setSlot(a);
        s.setStatus(slot.getStatus());

        Slot savedSlot = slotRepository.save(s);

        dailySchedule.getSlots().add(savedSlot);

        DailySchedule savedDailySchedule = dailyScheduleRepository.save(dailySchedule);

        memberRepository.save(k);

        return "yes";
    }

    @Override
    public Member reset(Member member) throws Exception {

        Member savedMember = memberRepository.findByEmail(member.getEmail());

        if(savedMember==null){
            throw new Exception("fake user");
        }

        savedMember.setPassword(member.getPassword());

        savedMember = memberRepository.save(savedMember);

        return savedMember;
    }

}
