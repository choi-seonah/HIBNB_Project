package com.example.hibnb_project.data.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "book")
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookid", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "username", nullable = false)
    @JsonBackReference
    private UserEntity username;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "accomid", nullable = false)
    @JsonBackReference
    private AccomEntity accomid;

    @NotNull
    @Column(name = "checkindate", nullable = false)
    private LocalDate checkindate;

    @NotNull
    @Column(name = "checkoutdate", nullable = false)
    private LocalDate checkoutdate;

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name="person")
    private Integer person;

    @Size(max = 10)
    @Column(name = "status", length = 10)
    private String status;

    @Column(name = "yesorno")
    private Boolean yesorno;

    @Size(max = 10)
    @Column(name = "payment", length = 10)
    private String payment;

    @OneToMany(mappedBy = "bookid")
    @JsonIgnore
    private Set<ReportEntity> reports = new LinkedHashSet<>();

    @OneToMany(mappedBy = "bookid")
    @JsonIgnore
    private Set<ReviewEntity> reviews = new LinkedHashSet<>();
}