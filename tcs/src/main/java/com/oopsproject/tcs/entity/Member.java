package com.oopsproject.tcs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oopsproject.tcs.enums.MemberType;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private MemberType memberType;
    private String email;
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "dailySchedule_member_mapping",
            joinColumns = {@JoinColumn(name = "member_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "dailySchedule_id", referencedColumnName = "id")})
    @MapKey(name = "date")
    private Map<String,DailySchedule> dailySchedules = new HashMap<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MemberType getMemberType() {
        return memberType;
    }

    public void setMemberType(MemberType memberType) {
        this.memberType = memberType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Map<String, DailySchedule> getDailySchedules() {
        return dailySchedules;
    }

    public void setDailySchedules(Map<String, DailySchedule> dailySchedules) {
        this.dailySchedules = dailySchedules;
    }
}
