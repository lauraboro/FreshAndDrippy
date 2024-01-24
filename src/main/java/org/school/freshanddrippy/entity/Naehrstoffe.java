package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "naehrstoffe")
@PrimaryKeyJoinColumn(name = "zutat_id")
public class Naehrstoffe {

    @Id
    @OneToOne
    @JoinColumn(name = "zutat_id")
    private Zutat zutat;

    @Column(name = "natrium") //pro 100g
    private float natrium;

    @Column(name = "proteine") //pro 100g
    private float proteine;

    @Column(name = "fett") //pro 100g
    private float fett;

    @Column(name = "gesaettigte_fettsaeuren") //pro 100g
    private float gesaettigte_fettsaeuren;

    @Column(name = "kohlenhydrate") //pro 100g
    private float kohlenhydrate;

    @Column(name = "zucker") //pro 100g
    private float zucker;

    @Column(name = "kalorien") //pro 100g
    private float kalorien;

    @Column(name = "ballaststoffe") //pro 100g
    private float ballaststoffe;

}