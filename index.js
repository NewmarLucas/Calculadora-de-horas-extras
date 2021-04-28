function calculaHoras() {

    var totalHorasDia = document.getElementById('totalHorasDia').value;
    var horaEntrada = document.getElementById('horaEntrada').value;
    var horaIdaAlmoco = document.getElementById('horaIdaAlmoco').value;
    var horaVoltaAlmoco = document.getElementById('horaVoltaAlmoco').value;
    var horaSaida = document.getElementById('horaSaida').value;

    // Limpa os campos calculados
    document.getElementById('diferencaPrimeiroTurno').innerHTML = '';
    document.getElementById('tempoRestante').innerHTML = '';
    document.getElementById('saldoHoras').innerHTML = '';


    // Calcula o intervalo entre a entrada e o almoco
    var diffEntradaAlmoco = diferencaHoras(horaEntrada, horaIdaAlmoco);
    document.getElementById('diferencaPrimeiroTurno').innerHTML = diffEntradaAlmoco;


    var tempoRestante = diferencaHoras(diffEntradaAlmoco, totalHorasDia);
    document.getElementById('tempoRestante').innerHTML = tempoRestante;

    var horaSaidaCerta = somaHora(horaVoltaAlmoco, tempoRestante);
		document.getElementById('horaSaidaMinima').innerHTML = horaSaidaCerta;

    // Caso a pessoa vá embora antes ou depois do horário ideal, calcula
    // o tempo q mais ou a menos que ela trabalhou do total que ela devia
    // trabalhar
    var saldoHoras = diferencaHoras(horaSaidaCerta, horaSaida);
    document.getElementById('saldoHoras').innerHTML = saldoHoras;

    // Se ela ficou tempo a mais, o saldo é positivo; se a pessoa
    // saiu mais cedo do que devia, o saldo é negativo
    if (isHoraInicialMenorHoraFinal(horaSaida, horaSaidaCerta)) {
        document.getElementById('saldoHoras').innerHTML = "-" + document.getElementById('saldoHoras');
    }
}


/**
* Retona a diferença entre duas horas.
* Exemplo: 14:35 a 17:21 = 02:46
*/
function diferencaHoras(horaInicial, horaFinal) {

    // Tratamento se a hora inicial é menor que a final	
    if (!isHoraInicialMenorHoraFinal(horaInicial, horaFinal)) {
        aux = horaFinal;
        horaFinal = horaInicial;
        horaInicial = aux;
    }

    var hIni = horaInicial.split(':');
    var hFim = horaFinal.split(':');

    horasTotal = parseInt(hFim[0], 10) - parseInt(hIni[0], 10);
    minutosTotal = parseInt(hFim[1], 10) - parseInt(hIni[1], 10);

    if (minutosTotal < 0) {
        minutosTotal += 60;
        horasTotal -= 1;
    }

    horaFinal = completaZeroEsquerda(horasTotal) + ":" + completaZeroEsquerda(minutosTotal);
    return horaFinal;
}

/**
* Soma duas horas.
* Exemplo:  12:35 + 07:20 = 19:55.
*/
function somaHora(horaInicio, horaSomada) {

    horaIni = horaInicio.split(':');
    horaSom = horaSomada.split(':');

    horasTotal = parseInt(horaIni[0], 10) + parseInt(horaSom[0], 10);
    minutosTotal = parseInt(horaIni[1], 10) + parseInt(horaSom[1], 10);

    if (minutosTotal >= 60) {
        minutosTotal -= 60;
        horasTotal += 1;
    }

    horaFinal = completaZeroEsquerda(horasTotal) + ":" + completaZeroEsquerda(minutosTotal);
    return horaFinal;
}

/**
 * Verifica se a hora inicial é menor que a final.
 */
function isHoraInicialMenorHoraFinal(horaInicial, horaFinal) {
    horaIni = horaInicial.split(':');
    horaFim = horaFinal.split(':');

    // Verifica as horas. Se forem diferentes, é só ver se a inicial 
    // é menor que a final.
    hIni = parseInt(horaIni[0], 10);
    hFim = parseInt(horaFim[0], 10);
    if (hIni != hFim)
        return hIni < hFim;

    // Se as horas são iguais, verifica os minutos então.
    mIni = parseInt(horaIni[1], 10);
    mFim = parseInt(horaFim[1], 10);
    if (mIni != mFim)
        return mIni < mFim;
}

/**
 * Completa um número menor que dez com um zero à esquerda.
 * Usado aqui para formatar as horas... Exemplo: 3:10 -> 03:10 , 10:5 -> 10:05
 */
function completaZeroEsquerda(numero) {
    return (numero < 10 ? "0" + numero : numero);
}