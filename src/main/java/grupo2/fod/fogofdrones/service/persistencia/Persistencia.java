package grupo2.fod.fogofdrones.service.persistencia;

import java.io.Serializable;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tablaprueba")
public class Persistencia implements Serializable{
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private JugadoresId jugadores;

    @Column(name = "partida")
    @JdbcTypeCode(SqlTypes.JSON)
    private String partida;

    public Persistencia(){

    }

    public Persistencia(String partida, String jugadorA, String jugadorN ) {
        this.jugadores = new JugadoresId(jugadorA,jugadorN);
        this.partida = partida;
    }

    public String getJugadorAereo() {
        return jugadores.getJugadorAereo();
    }

    public String getJugadorNaval() {
        return jugadores.getJugadorNaval();
    }

    /**
     * @return String return the partida
     */
    public String getPartida() {
        return partida;
    }

}
