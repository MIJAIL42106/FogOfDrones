package grupo2.fod.fogofdrones;

import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;

import grupo2.fod.fogofdrones.service.logica.Servicios;

public class pruebaJPA {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(FogofdronesApplication.class, args);
        Servicios service = context.getBean(Servicios.class);

        String nombreJug1 = "Jorge";
        String nombreJug2 = "Juan";

        service.crearPartida(nombreJug1, nombreJug2);
        service.guardarPartida(nombreJug1, nombreJug2);
        service.cargarPartida(nombreJug1);
    }
}