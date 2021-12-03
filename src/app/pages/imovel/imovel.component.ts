import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { entradaValidator } from 'src/app/shared/entradavalid';
import { TransfereService } from 'src/app/shared/transfere.service';


@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent {

  imovelForm: FormGroup;
  subscription!: Subscription;
  imovel: any;
  passarParcela: string = "";
  passarValorTotal: string = "";
  
  constructor(
    private fb: FormBuilder,
    private transfereService : TransfereService,
    private router : Router
    ) {

    this.transfereService.imovel.subscribe(retorno => this.imovel = retorno);
    this.transfereService.parcela.subscribe(retorno => this.passarParcela = retorno);
    this.transfereService.valorTotal.subscribe(retorno => this.passarValorTotal = retorno)
    
    this.imovelForm = this.fb.group({
      tipoImovel: new FormControl (null, [Validators.required]),
      rendaMensal: new FormControl (null, [Validators.required]),
      valorImovel: new FormControl (0, [Validators.required]),
      valorEntrada: new FormControl(null, entradaValidator),
      parcelas: new FormControl (null, [Validators.required, Validators.max(360)])
    },
     { validators: entradaValidator }
     );
  }

  

  voltar() {
    this.router.navigateByUrl('/proponente')
  }


  onSubmit() {

    // console.log(this.transfereService.imovel);
    let valorEntradaNum = this.imovelForm.controls['valorEntrada'].value.slice(2).split('.').join("").replace(/,/g,".");
    let valorImovelNum = this.imovelForm.controls['valorImovel'].value.slice(2).split('.').join("").replace(/,/g,".");
    let rendaMensalMin = (this.imovelForm.controls['rendaMensal'].value.slice(2).split('.').join("").replace(/,/g,"."))*0.3;
    let totalAprovado = valorImovelNum - valorEntradaNum;
    let taxaAoAno: number = 0.08;
    let parcelasNum: number = this.imovelForm.controls['parcelas'].value;
    let parcelaInicial = (totalAprovado * ((100 + (taxaAoAno * (parcelasNum / 12)))/100)) / parcelasNum;
    this.passarParcela = parcelaInicial.toString();
    this.passarValorTotal = totalAprovado.toString()
    this.transfereService.pegarParcela(this.passarParcela);
    this.transfereService.pegarValorTotal(this.passarValorTotal)

    if (rendaMensalMin > parcelaInicial)
      this.router.navigateByUrl('/aprovado')
      else this.router.navigateByUrl('/reprovado')
    
    // console.log(valorEntradaNum);
    // console.log(valorImovelNum);
    // console.log(totalAprovado);
    // console.log(taxaAoAno);
    // console.log(parcelasNum);
    // console.log(parcelaInicial);
    // console.log(rendaMensalMin);
  }

  @ViewChild("tipoImovelInput")
  myInputField!: ElementRef;
  ngAfterViewInit() {
    setTimeout(() => {
      this.myInputField.nativeElement.focus();
    }, 0) 
  }

}







// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-imovel',
//   templateUrl: './imovel.component.html',
//   styleUrls: ['./imovel.component.css']
// })
// export class ImovelComponent {
//   imovelForm = this.fb.group({
//     tipoImovel: [null, Validators.required], // VALIDAR CAMPO CORRETAMENTE
//     rendaMensal: [null, Validators.required], // VALIDAR CAMPO CORRETAMENTE
//     valorImovel: [null, Validators.required], // VALIDAR CAMPO CORRETAMENTE
//     valorEntrada: [null, Validators.required], // VALIDAR CAMPO CORRETAMENTE
//     parcelas: [null, Validators.required], // VALIDAR CAMPO CORRETAMENTE
//   });


//   constructor(private fb: FormBuilder) {}

// }
