package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "adresse")
public class Adresse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "strasse", nullable = false, length = 50)
    private String strasse;

    @Column(name = "hausnummer", nullable = false)
    private int hausnummer;

    @Column(name = "postleitzahl", nullable = false, length = 99999)
    private int postleitzahl;

    @Column(name = "stadt", nullable = false, length = 50)
    private String stadt;

    @Column(name = "land", nullable = false, length = 50)
    private String land;

    @Column(name = "hausnummerzusatz", nullable = true, length = 1)
    private Character hausnummerzusatz;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStrasse() {
        return strasse;
    }

    public void setStrasse(String strasse) {
        this.strasse = strasse;
    }

    public int getHausnummer() {
        return hausnummer;
    }

    public void setHausnummer(int hausnummer) {
        this.hausnummer = hausnummer;
    }

    public int getPostleitzahl() {
        return postleitzahl;
    }

    public void setPostleitzahl(int postleitzahl) {
        this.postleitzahl = postleitzahl;
    }

    public String getStadt() {
        return stadt;
    }

    public void setStadt(String stadt) {
        this.stadt = stadt;
    }

    public String getLand() {
        return land;
    }

    public void setLand(String land) {
        this.land = land;
    }

    public char getHausnummerzusatz() {
        return hausnummerzusatz;
    }

    public void setHausnummerzusatz(Character hausnummerzusatz) {
        this.hausnummerzusatz = hausnummerzusatz;
    }
}