package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lieferant")
public class Lieferant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "email", nullable = false, length = 300)
    // TODO: Email Validator
    private String email;

    @Column(name = "telefonnummer", nullable = false, length = 20)
    // TODO: Nummer Validator
    private String telefonnummer;

    @ManyToOne
    @JoinColumn(name = "adresse_id", nullable = false)
    private Adresse adresse;
}