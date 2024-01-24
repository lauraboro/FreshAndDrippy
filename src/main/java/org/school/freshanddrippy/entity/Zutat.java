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
    @JoinTable(
            name = "zutat_beschraenkung",
            joinColumns = @JoinColumn(name = "zutat_id"),
            inverseJoinColumns = @JoinColumn(name = "beschraenkung_id")
    )
    private Set<Beschraenkung> beschraenkungs;

}