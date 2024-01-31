package org.school.freshanddrippy.dto;

public class NeuesRezeptRequest {
    private String name;
    private String description;
    private int duration;
    private String zutaten;
    private String kategorien;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getZutaten() {
        return zutaten;
    }

    public void setZutaten(String zutaten) {
        this.zutaten = zutaten;
    }

    public String getKategorien() {
        return kategorien;
    }

    public void setKategorien(String kategorien) {
        this.kategorien = kategorien;
    }
}
