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
    private char hausnummerzusatz;
}