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

    @Column(columnDefinition = "INTERVAL")
    private String zubereitungsdauer;

    @Column(name = "bild_url", length = 500)
    private String bildURL;

    @ManyToMany
    @JoinTable(
            name = "rezept_kategorie",
            joinColumns = @JoinColumn(name = "rezept_id"),
            inverseJoinColumns = @JoinColumn(name = "kategorie_id")
    )
    private Set<Kategorie> kategories;

    @ManyToMany
    @JoinTable(
            name = "rezept_zutat",
            joinColumns = @JoinColumn(name = "rezept_id"),
            inverseJoinColumns = @JoinColumn(name = "zutat_id")
    )
    private Set<Zutat> zutats;
}