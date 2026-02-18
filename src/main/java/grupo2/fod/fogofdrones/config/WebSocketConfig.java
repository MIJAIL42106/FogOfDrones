package grupo2.fod.fogofdrones.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import grupo2.fod.fogofdrones.service.GameHandler;

// aqui se define el servidor socket o simplemente socket

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
	
	@Autowired
	private GameHandler gameHandler;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(gameHandler,"/game").setAllowedOrigins("*"); //(objeto chathandler,url a la que se conectan)
	}

}