package grupo2.fod.fogofdrones.service.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface PersistenciaRepositorio extends CrudRepository<Persistencia, JugadoresId > {

    @Query("SELECT p FROM Persistencia p WHERE p.jugadores.jugadorNaval = :nombre OR p.jugadores.jugadorAereo = :nombre")
    Optional<Persistencia> findByJugador(@Param("nombre") String nombre);
}
