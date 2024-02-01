package org.school.freshanddrippy.dto;

public class ZutatMengeDto {

    private Long zutatId;
    private int menge;

    private String name;

    private String einheit;

    public Long getZutatId() {
        return zutatId;
    }

    public void setZutatId(Long zutatId) {
        this.zutatId = zutatId;
    }

    public int getMenge() {
        return menge;
    }

    public void setMenge(int menge) {
        this.menge = menge;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEinheit() {
        return einheit;
    }

    public void setEinheit(String einheit) {
        this.einheit = einheit;
    }
}
