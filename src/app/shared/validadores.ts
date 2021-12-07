import { AbstractControl, FormControl } from "@angular/forms";

export class Validadores {

    static MaiorQue18Anos(controle: AbstractControl) {
        if(controle.value==null || controle.value==undefined)
        {
            console.log('primeiroIf')

        return null;
        }
        const nascimento: string = controle.value;
        const [ano, mes, dia] = nascimento.split('-');
        const hoje = new Date()
        const dataNascimento = new Date(parseInt(ano,10), parseInt(mes,10)-1, parseInt(dia,10), 0, 0, 0);
        const anoMenos18 = hoje.setFullYear(hoje.getFullYear()-18, hoje.getMonth(), hoje.getDate())
        const anoMaisQue110 = hoje.setFullYear(hoje.getFullYear()-92, hoje.getMonth(), hoje.getDate())
        const nascimentoParseado: number = Date.parse(dataNascimento.toString())

        if (nascimentoParseado < anoMenos18 && nascimentoParseado > anoMaisQue110)
        
        // const dezoitoAnosAtras = hoje.getFullYear()-18;
        // const muitoVelho = hoje.getFullYear()-100;

        // if ((dataNascimento.getFullYear() <= dezoitoAnosAtras && dataNascimento.getMonth()
        // <= hoje.getMonth() && dataNascimento.getDate() <= hoje.getDate()) && (dataNascimento.getFullYear()>=muitoVelho))
            
        {

            console.log(anoMaisQue110)

            return null;
        }

        return { menorDeIdade: true};

    }

}
