package teamchmod.backend.model;

import jakarta.persistence.*;

/*Patrick*/
@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String categorie;
    private String type;
    private String date;
    private double montant;

    @ManyToOne
    @JoinColumn(name="user_id")
    Users utilisateurs;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    public Users getUtilisateurs() {
        return utilisateurs;
    }

    public void setUtilisateurs(Users utilisateurs) {
        this.utilisateurs = utilisateurs;
    }
}
