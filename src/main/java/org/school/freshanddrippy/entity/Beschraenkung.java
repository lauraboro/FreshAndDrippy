package org.school.freshanddrippy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "beschraenkung")
public class Beschraenkung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;
    
}