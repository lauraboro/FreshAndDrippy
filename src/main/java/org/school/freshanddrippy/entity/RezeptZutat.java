package org.school.freshanddrippy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "rezept_zutat")
public class RezeptZutat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rezept_id")
    @JsonIgnore
    private Rezept rezept;

    @ManyToOne
    @JoinColumn(name = "zutat_id")
    private Zutat zutat;

    @Column(name = "menge")
    private int menge;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Zutat getZutat() {
        return zutat;
    }

    public void setZutat(Zutat zutat) {
        this.zutat = zutat;
    }

    public int getMenge() {
        return menge;
    }

    public void setMenge(int menge) {
        this.menge = menge;
    }

    public Rezept getRezept() {
        return rezept;
    }

    public void setRezept(Rezept rezept) {
        this.rezept = rezept;
    }
}
