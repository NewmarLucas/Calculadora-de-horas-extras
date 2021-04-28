function calculaHoras() {

    var totalHorasDia = document.getElementById('totalHorasDia').value;
    var horaEntrada = document.getElementById('horaEntrada').value;
    var horaIdaAlmoco = document.getElementById('horaIdaAlmoco').value;
    var horaVoltaAlmoco = document.getElementById('horaVoltaAlmoco').value;
    var horaSaida = document.getElementById('horaSaida').value;

    document.getElementById('diferencaPrimeiroTurno').innerHTML = '';
    document.getElementById('diferencaSegundoTurno').innerHTML = '';
    document.getElementById('saldoHoras').innerHTML = '';

    var primeiroTurno = diferencaHoras(horaEntrada, horaIdaAlmoco);
    document.getElementById('diferencaPrimeiroTurno').innerHTML = primeiroTurno;

    var segundoTurno = diferencaHoras(horaVoltaAlmoco, horaSaida);
    document.getElementById('diferencaSegundoTurno').innerHTML = segundoTurno;

    var somaTurnos = somaHora(primeiroTurno, segundoTurno);

    var saldoHoras = diferencaHoras(totalHorasDia, somaTurnos);
    document.getElementById('saldoHoras').innerHTML = saldoHoras;

    if (totalHorasDia < somaTurnos) {
        document.getElementById('saldoHoras').innerHTML = "-" + saldoHoras;
    }

}

function diferencaHoras(horaInicial, horaFinal) {

    var hIni = horaInicial.split(':');
    var hFim = horaFinal.split(':');

    var horasTotal = parseInt(hFim[0], 10) - parseInt(hIni[0], 10);
    var minutosTotal = parseInt(hFim[1], 10) - parseInt(hIni[1], 10);

    if (minutosTotal < 0) {
        minutosTotal += 60;
        horasTotal -= 1;
    }

    horaFinal = completaZeroEsquerda(horasTotal) + ":" + completaZeroEsquerda(minutosTotal);
    return horaFinal;
}

function somaHora(horaInicio, horaSomada) {

    var horaIni = horaInicio.split(':');
    var horaSom = horaSomada.split(':');

    var horasTotal = parseInt(horaIni[0], 10) + parseInt(horaSom[0], 10);
    var minutosTotal = parseInt(horaIni[1], 10) + parseInt(horaSom[1], 10);

    if (minutosTotal >= 60) {
        minutosTotal -= 60;
        horasTotal += 1;
    }

    var horaFinal = completaZeroEsquerda(horasTotal) + ":" + completaZeroEsquerda(minutosTotal);
    return horaFinal;
}

function completaZeroEsquerda(numero) {
    return (numero < 10 ? "0" + numero : numero);
}