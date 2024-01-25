package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bestellung_rezept")
public class BestellungRezept {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bestellung_id")
    private Bestellung bestellung;

    @ManyToOne
    @JoinColumn(name = "rezept_id")
    private Rezept rezept;

    @Column(name = "menge")
    private int menge;
}
