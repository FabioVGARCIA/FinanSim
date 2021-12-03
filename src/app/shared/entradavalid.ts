import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

// export class entradaValidator implements ErrorStateMatcher {
//     isErrorState(
//         control: FormControl | null,
//         imovelForm: FormGroupDirective | NgForm | null
//         ): boolean {
//             const valorImovel = control?.get('valorImovel');
//             const valorEntrada = control?.get('valorEntrada');
//             return valorEntrada == valorImovel
//             // return control?.dirty && control.errors?.["required"];
//     }
// }


// export const entradaValidator : ValidatorFn = (control: AbstractControl):
// ValidationErrors | null =>  {
// const valorImovel = control.get('valorImovel');
// const valorEntrada = control.get('valorEntrada');
// const valorImovelAltMin = valorImovel?.toString().value.slice(2).split('.').join("").replace(/,/g,".");
// const valorEntradaAlt = valorEntrada?.value;
// return valorImovel && valorEntrada && (valorEntradaAlt > valorImovelAltMin) ?
// { 'valoresIguais': true } :
// null





export const entradaValidator : ValidatorFn = (control: AbstractControl):
ValidationErrors | null =>  {
    const valorImovel = control.get('valorImovel')?.value; 
    const valorEntrada = control.get('valorEntrada')?.value;
    if(valorImovel && valorEntrada)
    {
        const parseValorImovel = parseInt(valorImovel.slice(2))
        const parseValorEntrada = parseInt(valorEntrada.slice(2))
        const porcentagem = parseValorImovel*0.2
        console.log(porcentagem);

        return parseValorEntrada < porcentagem ?
        { 'valoresIguais': true } :
        null
    }
    
    return valorImovel && valorEntrada ? { 'valoresIguais': true } :
    null

}