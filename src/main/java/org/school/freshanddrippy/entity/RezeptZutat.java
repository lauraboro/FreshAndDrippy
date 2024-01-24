package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rezept_zutat")
public class RezeptZutat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rezept_id")
    private Rezept rezept;

    @ManyToOne
    @JoinColumn(name = "zutat_id")
    private Zutat zutat;

    @Column(name = "menge")
    private int menge;
}
