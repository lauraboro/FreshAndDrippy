package org.school.freshanddrippy.dto;

import org.school.freshanddrippy.entity.Beschraenkung;

import java.util.Set;

public class ZutatRequest {

    public int id;
    public String name;
    public String einheit;
    public Set<Beschraenkung> beschraenkungs;

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

    public Set<Beschraenkung> getBeschraenkungs() {
        return beschraenkungs;
    }

    public void setBeschraenkungs(Set<Beschraenkung> beschraenkungs) {
        this.beschraenkungs = beschraenkungs;
    }

    public String getEinheit() {
        return einheit;
    }

    public void setEinheit(String einheit) {
        this.einheit = einheit;
    }
}
