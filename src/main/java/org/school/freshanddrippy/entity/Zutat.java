package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "zutat")
public class Zutat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "einheit", nullable = false, length = 10)
    private String einheit;

    @Column(name = "nettopreis", nullable = false)
    private BigDecimal gesamtpreis;

    @Column(name = "bestand", nullable = false)
    private int bestand;

    @ManyToOne
    @JoinColumn(name = "lieferant_id", nullable = true)
    private Lieferant lieferant;

    @ManyToMany
    @JoinTable(name = "zutat_beschraenkung", joinColumns = @JoinColumn(name = "zutat_id"), inverseJoinColumns = @JoinColumn(name = "beschraenkung_id"))
    private Set<Beschraenkung> beschraenkungs;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public BigDecimal getGesamtpreis() {
        return gesamtpreis;
    }

    public void setGesamtpreis(BigDecimal gesamtpreis) {
        this.gesamtpreis = gesamtpreis;
    }

    public int getBestand() {
        return bestand;
    }

    public void setBestand(int bestand) {
        this.bestand = bestand;
    }

    public Lieferant getLieferant() {
        return lieferant;
    }

    public void setLieferant(Lieferant lieferant) {
        this.lieferant = lieferant;
    }

    public Set<Beschraenkung> getBeschraenkungs() {
        return beschraenkungs;
    }

    public void setBeschraenkungs(Set<Beschraenkung> beschraenkungs) {
        this.beschraenkungs = beschraenkungs;
    }
}