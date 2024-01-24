package org.school.freshanddrippy.entity;
import java.math.BigDecimal;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "bestellung")
public class Bestellung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "gesamtpreis", nullable = false)
    private BigDecimal gesamtpreis;

    @Column(name = "datum")
    private Instant datum;

    @PrePersist
    private void onCreate() {
        datum = Instant.now();
    }

    @ManyToOne
    @JoinColumn(name = "kunde_id", nullable = false)
    private Kunde kunde;

    @ManyToMany
    @JoinTable(
            name = "bestellung_rezept",
            joinColumns = @JoinColumn(name = "bestellung_id"),
            inverseJoinColumns = @JoinColumn(name = "rezept_id")
    )
    private Set<Rezept> rezepts;
}