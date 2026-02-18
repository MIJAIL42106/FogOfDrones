package grupo2.fod.fogofdrones;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;/* 
import org.springframework.context.annotation.Bean;	//para abajo todo persistencia
import org.springframework.boot.CommandLineRunner;

import grupo2.fod.fogofdrones.service.Persistencia;
import grupo2.fod.fogofdrones.service.PersistenciaRepositorio;*/

@SpringBootApplication
public class FogofdronesApplication {
	
	//private static final Logger logger = LoggerFactory.getLogger(FogofdronesApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(FogofdronesApplication.class, args);
			
	}
	/* 
	@Bean
    public CommandLineRunner demo(PersistenciaRepositorio repo) {
		return (args) -> {
			Persistencia p = new Persistencia(null,"juan", "hermano de juan");	
			repo.save(p);
			/* 
			repo.findAll().forEach(persistencia -> {
				logger.info(persistencia.toString());
			});
			logger.info(""); 
		};
	}*/
	

	
}
