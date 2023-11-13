package com.oopsproject.tcs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jdk.jfr.MemoryAddress;

import java.util.Date;

@Entity
@Table(name = "slot")
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int slot;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "dailySchedule_id")
    private DailySchedule dailySchedule;
    private Boolean status;
    private String date;
    private String note;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public DailySchedule getDailySchedule() {
        return dailySchedule;
    }

    public void setDailySchedule(DailySchedule dailySchedule) {
        this.dailySchedule = dailySchedule;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getSlot() {
        return slot;
    }

    public void setSlot(int slot) {
        this.slot = slot;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
