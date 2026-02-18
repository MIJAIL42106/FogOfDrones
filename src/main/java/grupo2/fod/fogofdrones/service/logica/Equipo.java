package grupo2.fod.fogofdrones.service.logica;


public enum Equipo {

    AEREO, NAVAL, NINGUNO;

    public Equipo siguienteEquipo() {
        Equipo equipo;
        if(this == Equipo.NAVAL)
            equipo = Equipo.AEREO;
        else
            equipo = Equipo.NAVAL;
        return equipo;
    }

}