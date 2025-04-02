import {  NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { PersonasService } from '../../services/personas.service';
@Component({
  selector: 'app-ver',
  imports: [NgFor,ReactiveFormsModule,MatDialogModule],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.css'
})
export class VerComponent implements OnInit {
  TipoDoc : any[] = [];
  estadoCivil : any[] = [];
  formPersona! : UntypedFormGroup;
 
  constructor(private service : PersonasService, @Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<VerComponent>,){
    
  }
  ngOnInit(): void {
    this.estadoCivil = this.data.estadoCivil;
    this.TipoDoc = this.data.TipoDoc;
    console.log(this.data)
    this.InitFormPersona();
  }
  seleccionarOpcion(value : number ){
    this.formPersona.controls['estadoCivil'].setValue(value);
  }
  onSubmit(){
    console.log(this.formPersona.value);
    if(this.formPersona.controls['tipoDocumento'].value == 0 )
      alert("campo tipo documento requerido");
    else if(this.formPersona.controls['name'].value == "" || this.formPersona.controls['name'].value == null)
      alert("campo nombre requerido");
    else if(this.formPersona.controls['lastName'].value == "" || this.formPersona.controls['lastName'].value == null)
      alert("campo apellido requerido");
    else if(this.formPersona.controls['birthDate'].value == "" || this.formPersona.controls['birthDate'].value == null)
      alert("campo fecha nacimiento requerido");
    else if(this.formPersona.controls['valueGain'].value == "" || this.formPersona.controls['valueGain'].value == null )
      alert("campo valor ganado requerido");
    else if(this.formPersona.controls['valueGain'].value <= 0 )
      alert("campo valor ganado no puede ser menor que cero");
    this.formPersona.controls['tipoDocumento'].setValue(Number(this.formPersona.controls['tipoDocumento'].value))
    this.service.Actualizar(this.formPersona.value).subscribe(x => {
      if(x){
        this.dialogRef.close();
      }
      else{
        alert("Algo a sucedido");
      }
    })
  }
  InitFormPersona() {
    this.formPersona = new UntypedFormGroup({
      id : new UntypedFormControl(this.data.element.id),
      name : new UntypedFormControl(this.data.element.name),
      lastName : new UntypedFormControl(this.data.element.lastName),
      birthDate : new UntypedFormControl(this.data.element.birthDate),
      valueGain : new UntypedFormControl(this.data.element.valueGain),
      tipoDocumento : new UntypedFormControl(this.data.element.tipoDocumento),
      estadoCivil : new UntypedFormControl(this.data.element.estadoCivil), 
    });
  }
}
