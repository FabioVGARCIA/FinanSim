import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransfereService } from 'src/app/shared/transfere.service';
import { Validadores } from '../../shared/validadores';





@Component({
  selector: 'app-proponente',
  templateUrl: './proponente.component.html',
  styleUrls: ['./proponente.component.css']
})
export class ProponenteComponent {

  proponenteForm: FormGroup;
  date = new Date();
  pessoa: any;

  constructor(
    private fb: FormBuilder,
    private transfereService : TransfereService,
    private router: Router
    ) {

    this.transfereService.proponente.subscribe(retorno => this.pessoa = retorno)

    this.proponenteForm = this.fb.group({
      nomeCompleto: new FormControl (this.pessoa==={} ? null : this.pessoa.nomeCompleto, [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z a-zÀ-ú]*$')]),
      profissao: new FormControl (this.pessoa==={} ? null : this.pessoa.profissao,  [Validators.required]),
      cpf: new FormControl (this.pessoa==={} ? null : this.pessoa.cpf, [Validators.required, Validators.minLength(11)]),
      email: new FormControl (this.pessoa==={} ? null : this.pessoa.email, [Validators.required, Validators.email]),
      nascimento: new FormControl (this.pessoa==={} ? null : this.pessoa.nascimento, [Validators.required, Validadores.MaiorQue18Anos]), 
      cep: new FormControl (this.pessoa==={} ? null : this.pessoa.cep, [Validators.required, Validators.minLength(8)]),
      celular: new FormControl (this.pessoa==={} ? null : this.pessoa.celular, [Validators.required, Validators.minLength(11)]),
    });    
  
  }


  onSubmit() {
    this.transfereService.pegarProponente(this.proponenteForm.value)
    this.router.navigateByUrl('/imovel')
    // console.log(this.proponenteForm)
  }


  @ViewChild("nomeCompletoInput")
  myInputField!: ElementRef;
  ngAfterViewInit() {
    setTimeout(() => {
      this.myInputField.nativeElement.focus();
    }, 0)    
  }
  
}