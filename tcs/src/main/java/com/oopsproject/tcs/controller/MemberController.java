package com.oopsproject.tcs.controller;

import com.oopsproject.tcs.entity.DailySchedule;
import com.oopsproject.tcs.entity.Member;
import com.oopsproject.tcs.entity.Slot;
import com.oopsproject.tcs.service.MemberService;
import com.oopsproject.tcs.service.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member")
@CrossOrigin("*")
public class MemberController {

    @Autowired
    private MemberServiceImpl memberService;

    public MemberController(MemberServiceImpl memberService) {
        this.memberService = memberService;
    }

    @PostMapping ("ds/{member}")
    public ArrayList<DailySchedule> dailySchedules(@PathVariable String member, @RequestBody ArrayList<String> dates) throws Exception{
        return this.memberService.dailySchedules(member,dates);
    }

    @PostMapping ("login")
    public Member signin(@RequestBody Member member) throws Exception{
        return this.memberService.signin(member);
    }

    @PostMapping("register")
    public Member registerMember(@RequestBody Member member) throws Exception{
        return this.memberService.registerMember(member);
    }

    @PostMapping ("memberds/{date}")
    public Map<Integer,DailySchedule> memberds(@RequestBody List<Member> members, @PathVariable String date) throws Exception{
        return this.memberService.memberds(members,date);
    }

    @PostMapping ("reset")
    public Member reset(@RequestBody Member member) throws Exception{
        return this.memberService.reset(member);
    }

    @GetMapping ("members")
    public List<Member> members() throws Exception{
        return this.memberService.members();
    }

    @PostMapping ("delete")
    public String delete(@RequestBody Member member) throws Exception{
        return this.memberService.delete(member);
    }

    @PostMapping ("slot/{memberId}/{noob}")
    public String slot(@PathVariable int memberId, @RequestBody Slot slot, @PathVariable int noob) throws Exception{
        return this.memberService.updateslot(slot,memberId,noob);
    }

}
