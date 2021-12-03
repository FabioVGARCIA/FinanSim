import { Injectable } from '@angular/core';
import { BehaviorSubject  } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransfereService {

private proponenteSource = new BehaviorSubject({})
private imovelSource = new BehaviorSubject({})
private passarParcela = new BehaviorSubject('')
private passarValorTotal = new BehaviorSubject('')

proponente = this.proponenteSource.asObservable();
imovel = this.imovelSource.asObservable();
parcela = this.passarParcela.asObservable();
valorTotal = this.passarValorTotal.asObservable();


  constructor() { }


pegarProponente(proponente: Object) {
  this.proponenteSource.next(proponente)
  // console.log(this.proponente)
}

pegarImovel(imovel: Object) {
  this.imovelSource.next(imovel)
  console.log(this.imovel)
}

pegarParcela(parcela: string) {
  this.passarParcela.next(parcela)
  // console.log(this.proponente)
}

pegarValorTotal(valorTotal: string) {
  this.passarValorTotal.next(valorTotal)
  // console.log(this.proponente)
}


}
