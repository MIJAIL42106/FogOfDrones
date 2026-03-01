package grupo2.fod.fogofdrones.service.logica;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class Unidad implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int vida;
    private int vision;
    private Equipo equipo;
    private Posicion posicion;

    public Unidad() {}

    public Unidad(int idParam, int vidaParam, int visionParam, Equipo equipoParam, Posicion posParam) {
        id = idParam;
        vida = vidaParam;
        vision = visionParam;
        equipo = equipoParam;
        posicion = posParam;
    }

    public void recibirDanio() {
        vida--;
    }

    public boolean estaMuerto() {
        boolean esta = false;
        if(vida == 0)
            esta = true;
        return esta;
    }

}