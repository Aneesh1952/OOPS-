package com.oopsproject.tcs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oopsproject.tcs.enums.MemberType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "dailyschedule")
public class DailySchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String date;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="member_id", nullable=false)
    private Member member;

    public DailySchedule() {
    }

    @OneToMany(mappedBy = "dailySchedule")
    private List<Slot> slots = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Slot> getSlots() {
        return slots;
    }

    public void setSlots(List<Slot> slots) {
        this.slots = slots;
    }
}
