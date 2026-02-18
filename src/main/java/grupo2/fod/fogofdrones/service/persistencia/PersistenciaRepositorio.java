package grupo2.fod.fogofdrones.service.persistencia;

//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PersistenciaRepositorio extends CrudRepository<Persistencia, JugadoresId > {
}

