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
        const hoje = new Date();
        const dataNascimento = new Date(parseInt(ano,10), parseInt(mes,10)-1, parseInt(dia,10), 0, 0, 0);
        const dezoitoAnosAtras = hoje.getFullYear()-18;

        if (dataNascimento.getFullYear() <= dezoitoAnosAtras && dataNascimento.getMonth()
        <= hoje.getMonth() && dataNascimento.getDate() <= hoje.getDate())
        {

            return null;
        }


        return { menorDeIdade: true};

    }

}
