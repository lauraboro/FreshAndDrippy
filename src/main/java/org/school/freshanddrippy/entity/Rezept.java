package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "rezept")
public class Rezept {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String beschreibung;

    @Column(columnDefinition = "BIGINT")
    private int zubereitungsdauer;

    @Column(name = "bild", length = 300)
    private String bild;

    @ManyToMany
    @JoinTable(name = "rezept_kategorie", joinColumns = @JoinColumn(name = "rezept_id"), inverseJoinColumns = @JoinColumn(name = "kategorie_id"))
    private Set<Kategorie> kategories;

    @OneToMany(mappedBy = "rezept", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RezeptZutat> zutats;

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

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }

    public int getZubereitungsdauer() {
        return zubereitungsdauer;
    }

    public void setZubereitungsdauer(int zubereitungsdauer) {
        this.zubereitungsdauer = zubereitungsdauer;
    }

    public String getBild() {
        return bild;
    }

    public void setBildURL(String bildURL) {
        this.bild = bildURL;
    }

    public Set<Kategorie> getKategories() {
        return kategories;
    }

    public void setKategories(Set<Kategorie> kategories) {
        this.kategories = kategories;
    }

    public Set<RezeptZutat> getZutats() {
        return zutats;
    }

    public void setZutats(Set<RezeptZutat> zutats) {
        this.zutats = zutats;
    }
}