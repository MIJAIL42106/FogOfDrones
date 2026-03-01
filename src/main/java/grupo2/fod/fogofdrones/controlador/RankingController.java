package grupo2.fod.fogofdrones.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import grupo2.fod.fogofdrones.service.logica.Jugador;
import grupo2.fod.fogofdrones.service.persistencia.JugadoresRepositorio;

@RestController
@RequestMapping("/api")
public class RankingController {

    @Autowired
    private JugadoresRepositorio jugadoresRepositorio;

    @GetMapping("/ranking")
    public List<Jugador> getRanking() {
        return jugadoresRepositorio.findAllByOrderByPuntosDescVictoriasDesc();
    }
}
