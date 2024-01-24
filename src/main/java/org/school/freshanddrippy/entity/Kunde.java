package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table (name = "kunde")
public class Kunde {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "geburtstag")
    private LocalDate geburtsdatum;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "vorname", nullable = false, length = 50)
    private String vorname;

    @Column(name = "email", nullable = false, length = 300)
    // TODO: Email Validator
    private String email;

    @Column(name = "telefonnummer", nullable = false, length = 20)
    // TODO: Nummer Validator
    private String telefonnummer;

    @ManyToMany
    @JoinTable(
            name = "kunde_adresse",
            joinColumns = @JoinColumn(name = "kunde_id"),
            inverseJoinColumns = @JoinColumn(name = "adresse_id")
    )
    private Set<Adresse> adresses;
}

