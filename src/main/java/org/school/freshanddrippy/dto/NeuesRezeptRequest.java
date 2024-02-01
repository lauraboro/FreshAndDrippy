package org.school.freshanddrippy.dto;

import java.util.List;

public class NeuesRezeptRequest {
    private String name;
    private String description;
    private int duration;
    private List<ZutatMengeDto> zutaten;
    private List<KategorieRequest> kategorien;

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

    public List<ZutatMengeDto> getZutaten() {
        return zutaten;
    }

    public void setZutaten(List<ZutatMengeDto> zutaten) {
        this.zutaten = zutaten;
    }

    public List<KategorieRequest> getKategorien() {
        return kategorien;
    }

    public void setKategorien(List<KategorieRequest> kategorien) {
        this.kategorien = kategorien;
    }
}
